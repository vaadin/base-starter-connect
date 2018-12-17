(async() => {
  if (typeof URLSearchParams === 'undefined') {
    window.URLSearchParams = (
      await import(/* webpackChunkName: "polyfills" */ 'url-search-params')
    ).default;
  }

  if (typeof fetch === 'undefined') {
    await import(/* webpackChunkName: "polyfills" */ 'unfetch/polyfill/index.js');
  }

  if (typeof AbortController === 'undefined') {
    await import(/* webpackChunkName: "polyfills" */ 'abortcontroller-polyfill/dist/polyfill-patch-fetch');
  }
})();
