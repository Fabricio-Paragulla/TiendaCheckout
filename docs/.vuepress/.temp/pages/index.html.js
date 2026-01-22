import comp from "C:/Users/fabri/Desktop/2 DAW/DWEC/ACTIVIDAD/checkoutTiendaOnline/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"es-ES\",\"frontmatter\":{\"home\":true,\"heroText\":\"Checkout Vue 3\",\"heroImage\":\"https://vuejs.org/images/logo.png\",\"actions\":[{\"text\":\"Ver Guía de Usuario\",\"link\":\"/guide.md\",\"type\":\"primary\"},{\"text\":\"Ver Informe Técnico\",\"link\":\"/technical.md\",\"type\":\"secondary\"}],\"features\":[{\"title\":\"Multi-paso (Wizard)\",\"details\":\"Proceso guiado en 4 pasos claros para mejorar la UX.\"},{\"title\":\"Validaciones Robustas\",\"details\":\"Uso de VeeValidate + Yup para validación síncrona y asíncrona.\"},{\"title\":\"Persistencia\",\"details\":\"Recupera tu compra donde la dejaste gracias a localStorage.\"}]},\"git\":{},\"filePathRelative\":\"README.md\"}")
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
