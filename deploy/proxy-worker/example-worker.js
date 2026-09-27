// Example of the whole jeyinsights-proxy Worker after adding Learn AI.
// Compare it with the code in your dashboard before you change anything: keep your own /tnea code
// and anything else it does, and add only the Learn AI block (see learnai-block.js).

const TNEA_ORIGIN = 'https://tneacompasslite.pages.dev';
const LEARNAI_ORIGIN = 'https://learnai.pages.dev'; // Change to your Learn AI project's pages.dev address

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // /tnea and /tnea/* -> TNEA Compass (your existing code goes here, unchanged)
    if (url.pathname === '/tnea' || url.pathname.startsWith('/tnea/')) {
      const upstreamPath = url.pathname === '/tnea' ? '/' : url.pathname.slice('/tnea'.length);
      const response = await fetch(new Request(TNEA_ORIGIN + upstreamPath + url.search, request));
      return new Response(response.body, response);
    }

    // ---- JeyInsights Learn AI ----------------------------------------------------------
    // jeyinsights.com/learnai/... is served by the Learn AI Pages project.
    // The path is passed on unchanged: /learnai/learn/ -> <LEARNAI_ORIGIN>/learnai/learn/
    if (url.pathname === '/learnai' || url.pathname.startsWith('/learnai/')) {
      const upstream = new URL(url.pathname + url.search, env.LEARNAI_ORIGIN ?? LEARNAI_ORIGIN);
      const origin = upstream.origin;
      const headers = new Headers(request.headers);
      headers.delete('host');
      const res = await fetch(upstream, { method: request.method, headers, redirect: 'manual' });
      const out = new Headers(res.headers);
      out.delete('x-robots-tag');
      const loc = out.get('location');
      if (loc && loc.startsWith(origin)) out.set('location', loc.slice(origin.length) || '/');
      return new Response(res.body, { status: res.status, statusText: res.statusText, headers: out });
    }
    // ---- end of Learn AI -------------------------------------------------------------------

    // Everything else: the main site (jeyinsights Pages project), unchanged.
    return fetch(request);
  },
};
