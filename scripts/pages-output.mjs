// Prepares the folder that Cloudflare Pages publishes for the Learn AI project.
// Runs after `astro build` in `npm run build:pages` (the build command in Cloudflare).
//
// The site's addresses all start with /learnai/, so the files go into dist-pages/learnai/.
// jeyinsights.com/learnai/... is then passed through, unchanged, to <project>.pages.dev/learnai/...
import { existsSync, rmSync, mkdirSync, cpSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');
const OUT = join(ROOT, 'dist-pages');

if (!existsSync(join(DIST, 'index.html')) || !existsSync(join(DIST, '404.html'))) {
  console.error('dist/ is missing or incomplete. Run "npm run build" first.');
  process.exit(1);
}
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(DIST, join(OUT, 'learnai'), { recursive: true });

// The pages.dev address on its own sends visitors to the real site.
writeFileSync(join(OUT, '_redirects'), '/  https://jeyinsights.com/learnai/  301\n');

writeFileSync(join(OUT, '_headers'), `# Learn AI build files have a content hash in their names, so they can be cached for a year.
/learnai/_assets/*
  Cache-Control: public, max-age=31536000, immutable

/learnai/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/learnai/*
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

# Keep the pages.dev copy out of search results. The jeyinsights.com Worker removes this header,
# so the real pages at jeyinsights.com/learnai/ are indexed as normal.
https://:project.pages.dev/*
  X-Robots-Tag: noindex
`);

console.log('Pages output ready in dist-pages/ (site in dist-pages/learnai/).');
