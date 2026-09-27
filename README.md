# JeyInsights Learn AI

A free, self-paced AI learning portal for people building a career in AI, served at **https://jeyinsights.com/learnai/**.
Built with Astro as plain static pages. No accounts, no tracking, and progress stays on the learner's device.

- Plan: `PLAN.md`
- Progress log (read this first in a new session): `LEARNAI_PROGRESS.md`
- Brand preview: `design/design-preview.html`
- How to add or edit content: `docs/CONTENT_GUIDE.md`
- Tool facts, age rules and things to re-check: `docs/TOOL_FACTS.md`
- How to deploy to jeyinsights.com/learnai (git push to jeyfiles/learnai): `docs/DEPLOY.md`

## Run it on your computer

You need **Node.js 22.12 or newer** (`node -v` to check).

```bash
npm install
npm run dev          # opens http://localhost:4321/learnai/
```

Other commands:

| Command | What it does |
|---|---|
| `npm run build` | Builds the site into `dist/`, then runs the writing check and the size budget check. The build fails if either check fails |
| `npm run preview` | Serves the built `dist/` at http://localhost:4321/learnai/ |
| `npm run check:copy` | Runs only the writing check on `dist/` and `src/content/` |
| `npm run test:unit` | Unit tests with Vitest (validation, roadmap engine, daily practice picker, writing check) |
| `npm run test:e2e` | Browser tests with Playwright. The first time, run `npx playwright install chromium` |
| `npm run audit` | Only the SEO and link check on `dist/` (also part of `npm run build`) |
| `npm run serve:dist` | Serves `dist/` at http://localhost:4322/learnai/ with compression and cache headers, like Cloudflare |
| `npm run build:pages` | What Cloudflare runs on every push: the full build, then `dist-pages/` with the site in `learnai/` |
| `npm run check:live` | Checks the live site after a deploy (or another server with `BASE_URL`) |
| `npm run lighthouse` | With `serve:dist` running in another terminal: Lighthouse on 12 key pages, phone and desktop. Report in `reports/lighthouse/REPORT.md` |

## Folder guide

| Path | What is in it |
|---|---|
| `src/styles/tokens.css` | JeyInsights brand tokens (`--ji-*`). Reusable on the rest of jeyinsights.com |
| `src/styles/global.css` | Base styles and shared Learn AI classes (`la-*`) |
| `src/layouts/BaseLayout.astro` | Page shell: SEO tags, theme, header, footer, skip link, focus handling |
| `src/components/` | Header, footer, page heading, level card, brand mark |
| `src/lib/site.ts` | Site name, links, nav, the five levels, learner types, the `url()` helper for the `/learnai/` base |
| `src/content/` | All lessons, workbooks, glossary terms, help guides and level overviews, one file each |
| `src/content.config.ts` | The rules every content file must follow |
| `templates/` | One starter file per content type |
| `src/pages/` | One file per URL |
| `public/` | Fonts (self-hosted, with licences), favicon, logo, badge and OG image |
| `scripts/check-copy.mjs` | Writing rules check: no em or en dashes, no contractions, no banned phrases |
| `scripts/report-size.mjs` | Per-page size report and budget check |
| `scripts/audit-site.mjs` | SEO and link check: titles, descriptions, canonicals, one h1, alt text, JSON-LD, internal links and anchors, sitemap |
| `scripts/serve-dist.mjs`, `scripts/lighthouse.mjs` | Local production-like server and the Lighthouse report |
| `deploy/jeyinsights/` | Files for the root of the jeyinsights repository: robots.txt, sitemap.xml, _redirects. See `docs/DEPLOY.md` |
| `deploy/proxy-worker/` | The Learn AI block for the jeyinsights-proxy Worker, and an example of the whole Worker |
| `scripts/pages-output.mjs`, `scripts/check-live.mjs` | Prepare the Cloudflare Pages output, and check the live site after a deploy |
| `scripts/make-og.py`, `scripts/text-to-path.py` | Regenerate the OG image and the logo paths (only needed if the brand changes) |
| `src/lib/roadmap/` | Onboarding questions, answer validation and the roadmap engine |
| `src/components/roadmap/` | The onboarding and roadmap screen (Preact) |
| `src/lib/search/`, `src/components/overlays/` | Search index builder, local keyword ranking, the search dialog and the help drawer |
| `src/lib/today/`, `src/components/today/` | Daily practice picker, streak and the Today screen (Preact) |
| `tests/` | Unit and Playwright tests |

## Writing rules (short version)

No em dashes or en dashes. No contractions ("do not", not "don't"). Plain words and short sentences. No filler words such as "unlock", "journey" or "seamless". The full list is in `PLAN.md` section 4, and `npm run build` enforces it.

## Fonts

Oswald (headings) and Atkinson Hyperlegible Next (body) are self-hosted from `public/fonts/`. Both are under the SIL Open Font License; the licence files sit next to the fonts.
