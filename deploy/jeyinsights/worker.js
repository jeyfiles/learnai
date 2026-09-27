// worker.js
// jeyinsights.com
// - /tnea and /tnea/*  -> proxied to tneacompasslite.pages.dev (URL stays jeyinsights.com/tnea)
// - /resources         -> resources.html
// - /learnai/*         -> JeyInsights Learn AI (static files in public/learnai). Unknown addresses get
//                         the Learn AI "page not found" page with a real 404 status.
// - everything else    -> static files
//
// Static files that exist are served by Cloudflare before this Worker runs, so this code only
// sees /tnea, /resources and addresses that do not match a file.

const TNEA_ORIGIN = 'https://tneacompasslite.pages.dev';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Only proxy /tnea and /tnea/* paths
    if (url.pathname === '/tnea' || url.pathname.startsWith('/tnea/')) {
      // Strip /tnea prefix when forwarding to tneacompasslite
      const upstreamPath = url.pathname === '/tnea'
        ? '/'
        : url.pathname.slice('/tnea'.length);

      const upstreamURL = TNEA_ORIGIN + upstreamPath + url.search;

      // Forward the request to tneacompasslite.pages.dev
      const proxyRequest = new Request(upstreamURL, {
        method  : request.method,
        headers : request.headers,
        body    : request.method !== 'GET' && request.method !== 'HEAD'
                    ? request.body
                    : undefined,
      });

      const response = await fetch(proxyRequest);

      // Return the response — URL in browser stays as jeyinsights.com/tnea
      return new Response(response.body, {
        status     : response.status,
        statusText : response.statusText,
        headers    : response.headers,
      });
    }

    // /resources → serve resources.html (clean URL without .html extension)
    if (url.pathname === '/resources') {
      const resourceURL = new URL(request.url);
      resourceURL.pathname = '/resources.html';
      return env.ASSETS.fetch(new Request(resourceURL.toString(), request));
    }

    // Learn AI: an address under /learnai/ that is not a file gets the Learn AI 404 page.
    if (url.pathname === '/learnai' || url.pathname.startsWith('/learnai/')) {
      const res = await env.ASSETS.fetch(request);
      if (res.status !== 404) return res;
      // The 404 page is learnai/404.html. Static assets serve it at /learnai/404 (without .html).
      const notFound = await env.ASSETS.fetch(new URL('/learnai/404', url));
      return new Response(notFound.body, {
        status  : 404,
        headers : { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
      });
    }

    // All other paths — serve static assets
    return env.ASSETS.fetch(request);
  },
};
