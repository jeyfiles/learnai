// Copies the built site (dist/) into the jeyinsights repository as learnai/, ready to commit and deploy.
// jeyinsights is a Cloudflare Pages project that publishes the repository root, so learnai/ becomes /learnai/.
// Usage:  npm run build   then   npm run deploy:copy
// The jeyinsights folder defaults to ../jeyinsights (next to this repository).
// Set JEYINSIGHTS_DIR to use another place, for example:
//   Windows PowerShell:  $env:JEYINSIGHTS_DIR="C:\path\to\jeyinsights"; npm run deploy:copy
import { existsSync, rmSync, cpSync, readdirSync, statSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');
const TARGET_REPO = resolve(process.env.JEYINSIGHTS_DIR ?? join(ROOT, '..', 'jeyinsights'));
const TARGET = join(TARGET_REPO, 'learnai');

function fail(msg) { console.error(`\nCopy stopped: ${msg}\n`); process.exit(1); }

// Safety checks before anything is deleted
if (!existsSync(join(DIST, 'index.html')) || !existsSync(join(DIST, '404.html'))) fail('dist/ is missing or incomplete. Run "npm run build" first.');
if (!existsSync(join(TARGET_REPO, 'index.html')) || !existsSync(join(TARGET_REPO, '.git'))) {
  fail(`${TARGET_REPO} does not look like the jeyinsights repository (no index.html and .git). Set JEYINSIGHTS_DIR.`);
}
const home = readFileSync(join(DIST, 'index.html'), 'utf8');
if (!home.includes('<link rel="canonical" href="https://jeyinsights.com/learnai/"')) fail('dist/index.html does not have the expected canonical address. Rebuild from a clean checkout.');

const count = (dir) => readdirSync(dir).reduce((n, f) => n + (statSync(join(dir, f)).isDirectory() ? count(join(dir, f)) : 1), 0);

// Replace learnai/ completely, so files removed from the site do not linger
if (existsSync(TARGET)) rmSync(TARGET, { recursive: true, force: true });
cpSync(DIST, TARGET, { recursive: true });

console.log(`Copied ${count(TARGET)} files to ${TARGET}`);
console.log('\nNext, in the jeyinsights folder:');
console.log('  1. npx wrangler pages dev .  (optional: test at http://localhost:8788/learnai/)');
console.log('  2. git add learnai && git commit -m "Update Learn AI"');
console.log('  3. git push                  (this deploys)');
