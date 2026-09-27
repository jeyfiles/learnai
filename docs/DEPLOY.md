# Deploying Learn AI to jeyinsights.com/learnai

Learn AI deploys the same way as TNEA Compass. You push to GitHub and Cloudflare builds and publishes it. You never build or copy files by hand.

```
GitHub jeyfiles/learnai ──push──> Cloudflare Pages project "learnai" (builds the site)
                                            │  <project>.pages.dev/learnai/...
jeyinsights.com/learnai/...  ──>  Worker "jeyinsights-proxy"  ──┘  (same path, passed through)
jeyinsights.com/tnea/...     ──>  Worker "jeyinsights-proxy"  ──>  tneacompasslite.pages.dev
jeyinsights.com/ (the rest)  ──>  Pages project "jeyinsights" (unchanged)
```

Steps 1 to 4 are done once. After that, every update is a `git push`.

This setup was tested with Wrangler 4.141: the Learn AI Pages output served with `wrangler pages dev`, behind a copy of the proxy code running in `wrangler dev`. Redirects, the 404 page and cache headers all worked through the proxy, and 75 Learn AI browser tests passed.

## 1. Put Learn AI on GitHub

1. On https://github.com, click **New repository**. Name it `learnai`, owner `jeyfiles`. Choose Public or Private (both work with Cloudflare). Do **not** add a README, .gitignore or licence, so the repository starts empty.
2. In PowerShell:

```powershell
cd C:\Ramya\Personal\code-repo\learnai
npm install              # makes sure package-lock.json is up to date; Cloudflare uses it
git init
git add .
git commit -m "JeyInsights Learn AI"
git branch -M main
git remote add origin https://github.com/jeyfiles/learnai.git
git push -u origin main
```

If `git init` says the folder is already a repository, that is fine. If `git remote add` says `origin` already exists, skip that line.

`.gitignore` already keeps `node_modules`, `dist`, `dist-pages` and the large Lighthouse HTML reports out of GitHub.

## 2. Create the Learn AI Pages project

1. In the Cloudflare dashboard, open **Workers & Pages** and click **Create** (or **Create application**).
2. Choose **Pages**, then **Import an existing Git repository** (or **Connect to Git**).
3. Pick the `jeyfiles/learnai` repository and click **Begin setup**.
4. Fill in:

| Setting | Value |
|---|---|
| Project name | `learnai` |
| Production branch | `main` |
| Framework preset | None |
| Build command | `npm run build:pages` |
| Build output directory | `dist-pages` |

5. Click **Save and Deploy**. The first build takes a few minutes. It installs the packages, builds the site, runs the writing check, the site audit and the size budget, and publishes. If any check fails, the build stops and the live site is not changed.
6. When it finishes, note the address Cloudflare gives the project, for example `https://learnai.pages.dev` (it may have extra letters if the name was taken). Open `https://<that address>/learnai/`. You should see Learn AI.

Node.js: the `.nvmrc` file in the repository asks for Node 22, which Astro needs.

The pages.dev copy is marked "do not index" for search engines, and its home address redirects to https://jeyinsights.com/learnai/. So only jeyinsights.com appears in Google.

## 3. Connect jeyinsights.com/learnai in the jeyinsights-proxy Worker

The Worker **jeyinsights-proxy** already sends `/tnea` to TNEA Compass. It needs a few lines so it sends `/learnai` to the Learn AI project too.

**Before you change it, copy the Worker's current code and send it to me.** I will give you the complete new version, so nothing it does today is lost. To see the code: **Workers & Pages**, then **jeyinsights-proxy**, then **Edit code** (top right). Also send the list of routes: **Settings**, then **Domains & Routes**.

What the change looks like (for reference):

- A line at the top: `const LEARNAI_ORIGIN = 'https://learnai.pages.dev';` with your project's address from step 2.
- The block in `deploy/proxy-worker/learnai-block.js`, placed next to the `/tnea` block. It passes `/learnai/...` to the same path on the Learn AI project, and keeps visitors on jeyinsights.com.
- `deploy/proxy-worker/example-worker.js` shows a whole Worker with both parts.

To save it: in **Edit code**, paste the new code and click **Deploy**.

Then check the routes (**Settings**, then **Domains & Routes**). If no route covers `/learnai` (for example `jeyinsights.com/*`), click **Add**, then **Route**, choose the zone `jeyinsights.com`, and enter `jeyinsights.com/learnai*`.

## 4. Small fixes on the main site (jeyinsights repository)

These three files are in `deploy/jeyinsights/`. Copy them into the root of the jeyinsights repository and push:

```powershell
cd C:\Ramya\Personal\code-repo\jeyinsights
$src = "C:\Ramya\Personal\code-repo\learnai\deploy\jeyinsights"
Copy-Item "$src\robots.txt", "$src\sitemap.xml", "$src\_redirects" . -Force
git add robots.txt sitemap.xml _redirects
git commit -m "Add robots.txt, update sitemap, switch off placeholder redirects"
git push
```

| File | Why |
|---|---|
| `robots.txt` (new) | The site has none. Right now `/robots.txt` returns the home page. The new file points search engines to both sitemaps. |
| `sitemap.xml` (updated) | Uses `https://jeyinsights.com/` (the same as your home page's canonical) and adds `/resources`. |
| `_redirects` (updated) | The three example lines currently send `/blog/`, `/projects/` and `/swimming/` to placeholder sites that do not exist. They are switched off. |

## 5. Check the live site

```powershell
cd C:\Ramya\Personal\code-repo\learnai
npm run check:live
```

It checks the main pages, `robots.txt`, both sitemaps, the Learn AI pages, the 404 page, the cache headers, and that `/blog/` no longer goes to a placeholder site. Then:

1. In **Google Search Console**, add `https://jeyinsights.com/learnai/sitemap-index.xml` under Sitemaps.
2. Run Lighthouse once on the live Learn AI home page and one lesson (Chrome DevTools, Lighthouse tab).

## Every update after that

```powershell
cd C:\Ramya\Personal\code-repo\learnai
git add .
git commit -m "Describe the change"
git push
```

Cloudflare builds and publishes it. **Workers & Pages**, then **learnai**, then **Deployments** shows the progress and the build log.

Optional, before pushing: `npm run build` runs the same checks on your computer, and `npm test` runs all the tests.

## If something goes wrong

- **The build fails:** open the failed deployment in the learnai project and read the log. The writing check, site audit and size budget print exactly which page or line is wrong. The live site stays on the last good version.
- **Roll back:** in the learnai project, open **Deployments**, find the last good one, and choose **Rollback to this deployment**.
- **jeyinsights.com/learnai/ shows the main home page:** the Worker is not handling `/learnai` yet. Check step 3 (the code and the route).
- **jeyinsights.com/learnai/ shows an error, but the pages.dev address works:** check that `LEARNAI_ORIGIN` in the Worker is exactly the pages.dev address from step 2, with `https://` and no slash at the end.

## Sources

- Pages build settings and Node versions: https://developers.cloudflare.com/pages/configuration/build-image/
- How Pages serves files and 404 pages: https://developers.cloudflare.com/pages/configuration/serving-pages/
- Pages `_headers` (including rules for the pages.dev address): https://developers.cloudflare.com/pages/configuration/headers/
- Pages `_redirects`: https://developers.cloudflare.com/pages/configuration/redirects/
- Worker routes: https://developers.cloudflare.com/workers/configuration/routing/routes/
