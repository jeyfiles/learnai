    // ---- JeyInsights Learn AI ----------------------------------------------------------
    // jeyinsights.com/learnai/... is served by the Learn AI Pages project.
    // The path is passed on unchanged: /learnai/learn/ -> <LEARNAI_ORIGIN>/learnai/learn/
    if (url.pathname === '/learnai' || url.pathname.startsWith('/learnai/')) {
      const upstream = new URL(url.pathname + url.search, LEARNAI_ORIGIN);
      const headers = new Headers(request.headers);
      headers.delete('host');
      const res = await fetch(upstream, { method: request.method, headers, redirect: 'manual' });
      const out = new Headers(res.headers);
      // The pages.dev copy is marked noindex; the real address must stay indexable.
      out.delete('x-robots-tag');
      // Keep visitors on jeyinsights.com if Pages answers with a full pages.dev address.
      const loc = out.get('location');
      if (loc && loc.startsWith(LEARNAI_ORIGIN)) out.set('location', loc.slice(LEARNAI_ORIGIN.length) || '/');
      return new Response(res.body, { status: res.status, statusText: res.statusText, headers: out });
    }
    // ---- end of Learn AI -------------------------------------------------------------------
