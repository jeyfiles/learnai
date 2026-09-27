// Measures what each built page downloads (HTML + CSS + JS + fonts + images it references)
// and fails the build if a page breaks the performance budget in PLAN.md.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');
const BASE = '/learnai/';
const BUDGET = { landingTotalKB: 150, jsPerPageKB: 60, ogImageKB: 300 };

const gz = (buf) => gzipSync(buf, { level: 9 }).length;
const kb = (n) => Math.round((n / 1024) * 10) / 10;

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, out); else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

function assetPath(href) {
  if (!href.startsWith(BASE)) return null;
  const p = join(DIST, href.slice(BASE.length).split(/[?#]/)[0]);
  return existsSync(p) && statSync(p).isFile() ? p : null;
}

// Adds a JS file and every file it imports. Static imports load with the page; dynamic imports
// (for example the search dialog) load only when needed, so they are counted separately as "later".
function addWithImports(p, refs, lazy = false, later = new Set()) {
  if (refs.has(p) || (lazy && later.has(p))) return;
  (lazy ? later : refs).add(p);
  if (!p.endsWith('.js')) return;
  const code = readFileSync(p, 'utf8');
  for (const m of code.matchAll(/(?:from|import)\s*["'`](\.{1,2}\/[^"'`]+)["'`]/g)) {
    const next = join(p, '..', m[1]);
    if (existsSync(next)) addWithImports(next, refs, lazy, later);
  }
  for (const m of code.matchAll(/import\(\s*["'`](\.{1,2}\/[^"'`]+)["'`]\s*\)/g)) {
    const next = join(p, '..', m[1]);
    if (existsSync(next)) addWithImports(next, later, false, new Set());
  }
}

function measure(file) {
  const html = readFileSync(file);
  const text = html.toString();
  const refs = new Set();
  const later = new Set();
  for (const m of text.matchAll(/(?:component-url|renderer-url|before-hydration-url)="([^"]+)"/g)) {
    const p = assetPath(m[1].replace(/&#x2F;/g, '/'));
    if (p) addWithImports(p, refs, false, later);
  }
  for (const m of text.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const tag = text.slice(Math.max(0, m.index - 200), m.index);
    // Skip plain page links; keep stylesheets, scripts, preloads, images and icons.
    const isLink = /<a\s[^>]*$/.test(tag) || /rel="canonical"/.test(tag.slice(tag.lastIndexOf('<')));
    if (isLink) continue;
    const p = assetPath(m[1]);
    if (p) (p.endsWith('.js') ? addWithImports(p, refs, false, later) : refs.add(p));
  }
  let css = 0, js = 0, font = 0, other = 0, jsLater = 0;
  for (const p of later) if (!refs.has(p) && p.endsWith('.js')) jsLater += gz(readFileSync(p));
  for (const p of refs) {
    const buf = readFileSync(p);
    if (p.endsWith('.css')) css += gz(buf);
    else if (p.endsWith('.js') || p.endsWith('.mjs')) js += gz(buf);
    else if (p.endsWith('.woff2')) font += buf.length;
    else if (/\.(svg)$/.test(p)) other += gz(buf);
    else other += buf.length;
  }
  // Inline scripts count toward the JS budget too.
  for (const m of text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
    if (!/application\/ld\+json/.test(m[0])) js += gz(Buffer.from(m[1]));
  }
  const htmlGz = gz(html);
  return { page: relative(DIST, file), html: htmlGz, css, js, jsLater, font, other, total: htmlGz + css + js + font + other };
}

const rows = walk(DIST).map(measure).sort((a, b) => a.page.localeCompare(b.page));
console.log('\nPage sizes (KB, gzipped where the server compresses)');
console.log('"js later" = code that loads only when the learner opens search or help. The JS budget counts both.');
console.log('page'.padEnd(46), 'html'.padStart(6), 'css'.padStart(6), 'js'.padStart(6), 'later'.padStart(6), 'fonts'.padStart(6), 'other'.padStart(6), 'total'.padStart(7));
for (const r of rows) {
  console.log(r.page.padEnd(46), ...[r.html, r.css, r.js, r.jsLater, r.font, r.other].map((n) => String(kb(n)).padStart(6)), String(kb(r.total)).padStart(7));
}

const errors = [];
const landing = rows.find((r) => r.page === 'index.html');
if (landing && kb(landing.total) > BUDGET.landingTotalKB) errors.push(`Landing page is ${kb(landing.total)} KB (budget ${BUDGET.landingTotalKB} KB).`);
for (const r of rows) if (kb(r.js + r.jsLater) > BUDGET.jsPerPageKB) errors.push(`${r.page} ships ${kb(r.js + r.jsLater)} KB of JS (budget ${BUDGET.jsPerPageKB} KB).`);
const idx = join(DIST, 'search-index.json');
if (existsSync(idx)) console.log(`\nSearch index (loaded only when search or help opens): ${kb(gz(readFileSync(idx)))} KB gzipped.`);
const og = join(DIST, 'og-learnai.png');
if (existsSync(og) && kb(statSync(og).size) > BUDGET.ogImageKB) errors.push(`OG image is ${kb(statSync(og).size)} KB (budget ${BUDGET.ogImageKB} KB).`);

if (errors.length) { console.error('\nBudget check failed:\n  ' + errors.join('\n  ')); process.exit(1); }
console.log(`\nBudget check passed. Landing page: ${kb(landing?.total ?? 0)} KB of ${BUDGET.landingTotalKB} KB.`);
