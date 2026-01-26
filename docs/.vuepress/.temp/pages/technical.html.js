import comp from "C:/Users/fabri/Desktop/2 DAW/DWEC/ACTIVIDAD/checkoutTiendaOnline/docs/.vuepress/.temp/pages/technical.html.vue"
const data = JSON.parse("{\"path\":\"/technical.html\",\"title\":\"Arquitectura Técnica\",\"lang\":\"es-ES\",\"frontmatter\":{},\"git\":{\"updatedTime\":1769067955000,\"contributors\":[{\"name\":\"root\",\"username\":\"root\",\"email\":\"prueba@gmail.com\",\"commits\":1,\"url\":\"https://github.com/root\"}],\"changelog\":[{\"hash\":\"09087c32116210e28b0283d023dc31e81a57e8b9\",\"time\":1769067955000,\"email\":\"prueba@gmail.com\",\"author\":\"root\",\"message\":\"Documentación técnica y de usuario con VuePress\"}]},\"filePathRelative\":\"technical.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
