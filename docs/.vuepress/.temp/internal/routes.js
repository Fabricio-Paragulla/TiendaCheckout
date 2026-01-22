export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/guide.html", { loader: () => import(/* webpackChunkName: "guide.html" */"C:/Users/fabri/Desktop/2 DAW/DWEC/ACTIVIDAD/checkoutTiendaOnline/docs/.vuepress/.temp/pages/guide.html.js"), meta: {"title":"Guía de Usuario"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"C:/Users/fabri/Desktop/2 DAW/DWEC/ACTIVIDAD/checkoutTiendaOnline/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/technical.html", { loader: () => import(/* webpackChunkName: "technical.html" */"C:/Users/fabri/Desktop/2 DAW/DWEC/ACTIVIDAD/checkoutTiendaOnline/docs/.vuepress/.temp/pages/technical.html.js"), meta: {"title":"Arquitectura Técnica"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"C:/Users/fabri/Desktop/2 DAW/DWEC/ACTIVIDAD/checkoutTiendaOnline/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
