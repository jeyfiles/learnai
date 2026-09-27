// Serves dist/ at http://localhost:4322/learnai/ the way Cloudflare will: gzip or brotli,
// cache headers for hashed assets, and the Learn AI 404 page for unknown addresses.
// Used for the Lighthouse report, because `astro preview` does not compress files.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { gzipSync, brotliCompressSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist', import.meta.url));
const PORT = Number(process.env.PORT ?? 4322);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain',
};
const COMPRESS = new Set(['.html', '.css', '.js', '.json', '.svg', '.xml', '.txt']);

async function resolve(path) {
  let p = normalize(join(DIST, path)).replace(/\\/g, '/');
  if (!p.startsWith(DIST.replace(/\\/g, '/'))) return null;
  try {
    const s = await stat(p);
    if (s.isDirectory()) p = join(p, 'index.html');
    await stat(p);
    return p;
  } catch { return null; }
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://x');
  // jeyinsights.com serves its own robots.txt at the root. deploy/jeyinsights/robots.txt is the suggested version.
  if (url.pathname === '/robots.txt') {
    res.writeHead(200, { 'content-type': 'text/plain' });
    return res.end(await readFile(fileURLToPath(new URL('../deploy/jeyinsights/robots.txt', import.meta.url))));
  }
  if (!url.pathname.startsWith('/learnai')) { res.writeHead(302, { location: '/learnai/' }); return res.end(); }
  if (url.pathname === '/learnai') { res.writeHead(301, { location: '/learnai/' }); return res.end(); }
  const rel = decodeURIComponent(url.pathname.slice('/learnai'.length));
  let file = await resolve(rel);
  let status = 200;
  if (!file) { file = join(DIST, '404.html'); status = 404; }
  let body = await readFile(file);
  const ext = extname(file);
  const headers = {
    'content-type': TYPES[ext] ?? 'application/octet-stream',
    'cache-control': rel.startsWith('/_assets/') || rel.startsWith('/fonts/') ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate',
    'x-content-type-options': 'nosniff',
  };
  const accept = String(req.headers['accept-encoding'] ?? '');
  if (COMPRESS.has(ext)) {
    if (accept.includes('br')) { body = brotliCompressSync(body); headers['content-encoding'] = 'br'; }
    else if (accept.includes('gzip')) { body = gzipSync(body); headers['content-encoding'] = 'gzip'; }
    headers.vary = 'accept-encoding';
  }
  res.writeHead(status, headers);
  res.end(req.method === 'HEAD' ? undefined : body);
}).listen(PORT, () => console.log(`Serving dist at http://localhost:${PORT}/learnai/`));
