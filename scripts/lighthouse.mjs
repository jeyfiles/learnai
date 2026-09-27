// Runs Lighthouse on key Learn AI pages (phone and desktop) and writes a report.
// Usage: npm run build, then `node scripts/serve-dist.mjs` in one terminal and `node scripts/lighthouse.mjs` in another.
// Set CHROME_PATH if Chrome is not found automatically.
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const BASE = process.env.LH_BASE ?? 'http://localhost:4322/learnai/';
const OUT = fileURLToPath(new URL('../reports/lighthouse/', import.meta.url));
const PAGES = [
  ['home', ''], ['roadmap', 'roadmap/'], ['level-1', 'learn/level-1/'], ['lesson', 'learn/perplexity-sources-you-can-check/'],
  ['workbook', 'workbooks/research-brief-with-checked-sources/'], ['practice', 'practice/rewrite-a-vague-prompt/'],
  ['projects', 'projects/'], ['project', 'projects/custom-assistant-with-a-gem/'], ['careers', 'careers/'],
  ['glossary', 'glossary/'], ['help', 'help/'], ['certificate', 'certificate/'],
];
const CATS = ['performance', 'accessibility', 'best-practices', 'seo'];

mkdirSync(OUT, { recursive: true });
const chrome = await chromeLauncher.launch({ chromePath: process.env.CHROME_PATH, chromeFlags: ['--headless=new', '--no-sandbox'] });
const rows = [];
const failures = [];
try {
  for (const formFactor of ['mobile', 'desktop']) {
    for (const [name, path] of PAGES) {
      const config = formFactor === 'desktop'
        ? { extends: 'lighthouse:default', settings: { formFactor: 'desktop', screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false }, throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 } } }
        : undefined;
      const r = await lighthouse(BASE + path, { port: chrome.port, output: 'html', onlyCategories: CATS, logLevel: 'error' }, config);
      const lhr = r.lhr;
      const scores = Object.fromEntries(CATS.map((c) => [c, Math.round((lhr.categories[c].score ?? 0) * 100)]));
      const m = lhr.audits;
      rows.push({ name, path, formFactor, ...scores, lcp: m['largest-contentful-paint'].displayValue, cls: m['cumulative-layout-shift'].displayValue, tbt: m['total-blocking-time'].displayValue });
      writeFileSync(join(OUT, `${name}-${formFactor}.html`), r.report);
      for (const c of CATS) {
        for (const ref of lhr.categories[c].auditRefs) {
          const a = m[ref.id];
          if (ref.weight > 0 && a.score !== null && a.score < 0.9) failures.push(`${formFactor} ${name} [${c}] ${a.id}: ${a.title}${a.displayValue ? ` (${a.displayValue})` : ''}`);
        }
      }
      console.log(formFactor.padEnd(8), name.padEnd(12), CATS.map((c) => `${c.slice(0, 4)} ${scores[c]}`).join('  '));
    }
  }
} finally {
  await chrome.kill();
}

const lines = [
  '# Lighthouse report', '',
  `Run on ${new Date().toISOString().slice(0, 10)} against the built site served with compression (\`scripts/serve-dist.mjs\`). Lighthouse ${'13'}. Phone uses Lighthouse's default mobile throttling (slow 4G, 4x CPU slowdown).`, '',
  '| Page | Device | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |', '|---|---|---|---|---|---|---|---|---|',
  ...rows.map((r) => `| ${r.name} | ${r.formFactor} | ${r.performance} | ${r.accessibility} | ${r['best-practices']} | ${r.seo} | ${r.lcp} | ${r.cls} | ${r.tbt} |`),
  '', '## Audits below 90', '', ...(failures.length ? failures.map((f) => `- ${f}`) : ['None.']), '',
  'Full reports: one HTML file per page and device in this folder.', '',
];
writeFileSync(join(OUT, 'REPORT.md'), lines.join('\n'));
writeFileSync(join(OUT, 'summary.json'), JSON.stringify(rows, null, 2));
const low = rows.filter((r) => CATS.some((c) => r[c] < 95));
console.log(low.length ? `\n${low.length} page runs scored below 95 somewhere. See reports/lighthouse/REPORT.md` : '\nEvery page scored 95 or more in every category.');
