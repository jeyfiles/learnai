// Checks the live site after a deploy. Usage: npm run check:live
// Or against another server: set BASE_URL first, for example BASE_URL=https://learnai.pages.dev (Learn AI checks only pass there)
const BASE = (process.env.BASE_URL ?? 'https://jeyinsights.com').replace(/\/$/, '');
const CANON = 'https://jeyinsights.com';

const checks = [
  { path: '/', status: 200, contains: '<title>' },
  { path: '/resources', status: 200 },
  { path: '/robots.txt', status: 200, type: 'text/plain', contains: 'Sitemap: https://jeyinsights.com/learnai/sitemap-index.xml' },
  { path: '/sitemap.xml', status: 200, type: 'xml', contains: '<urlset' },
  { path: '/learnai', status: [301, 302, 307, 308], location: '/learnai/' },
  { path: '/learnai/', status: 200, type: 'text/html', contains: `<link rel="canonical" href="${CANON}/learnai/"` },
  { path: '/learnai/learn/level-1/', status: 200, contains: 'Level 1' },
  { path: '/learnai/learn/perplexity-sources-you-can-check/', status: 200 },
  { path: '/learnai/roadmap/', status: 200 },
  { path: '/learnai/projects/', status: 200 },
  { path: '/learnai/certificate/', status: 200 },
  { path: '/learnai/search-index.json', status: 200, type: 'json', contains: '"items"' },
  { path: '/learnai/sitemap-index.xml', status: 200, type: 'xml', contains: `${CANON}/learnai/sitemap-0.xml` },
  { path: '/learnai/og-learnai.png', status: 200, type: 'image/png' },
  { path: '/learnai/fonts/oswald-latin-var.woff2', status: 200, cache: 'immutable' },
  { path: '/learnai/this-page-does-not-exist/', status: 404, contains: 'Page not found' },
  // The old example lines in _redirects sent /blog/ to a placeholder site. They must be switched off.
  { path: '/blog/', status: 200 },
];

let failed = 0;
for (const c of checks) {
  const problems = [];
  let res;
  try {
    res = await fetch(BASE + c.path, { redirect: 'manual', headers: { 'accept-encoding': 'gzip, br' } });
  } catch (e) {
    console.log(`FAIL ${c.path}  could not connect (${e.message})`); failed++; continue;
  }
  const ok = Array.isArray(c.status) ? c.status.includes(res.status) : res.status === c.status;
  if (!ok) problems.push(`status ${res.status}, expected ${c.status}`);
  const type = res.headers.get('content-type') ?? '';
  if (c.type && !type.includes(c.type)) problems.push(`content-type "${type}"`);
  if (c.location && !(res.headers.get('location') ?? '').endsWith(c.location)) problems.push(`redirects to "${res.headers.get('location')}"`);
  if (c.cache && !(res.headers.get('cache-control') ?? '').includes(c.cache)) problems.push(`cache-control "${res.headers.get('cache-control')}"`);
  if (c.contains) {
    const body = await res.text();
    if (!body.includes(c.contains)) problems.push(`does not contain ${c.contains}`);
  }
  if (problems.length) { failed++; console.log(`FAIL ${c.path}  ${problems.join('; ')}`); }
  else console.log(`ok   ${c.path}  ${res.status}`);
}

// The first Learn AI script file should be cached for a year
try {
  const html = await (await fetch(`${BASE}/learnai/`)).text();
  const asset = html.match(/\/learnai\/_assets\/[^"']+\.(?:js|css)/)?.[0];
  if (asset) {
    const r = await fetch(BASE + asset);
    const cc = r.headers.get('cache-control') ?? '';
    if (r.status === 200 && cc.includes('immutable')) console.log(`ok   ${asset}  cached for a year`);
    else { failed++; console.log(`FAIL ${asset}  status ${r.status}, cache-control "${cc}"`); }
  }
} catch { /* reported above */ }

console.log(failed ? `\n${failed} check(s) failed on ${BASE}` : `\nAll checks passed on ${BASE}`);
process.exit(failed ? 1 : 0);
