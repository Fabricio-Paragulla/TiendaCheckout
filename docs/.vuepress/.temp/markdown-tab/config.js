import { CodeTabs } from "C:/Users/fabri/Desktop/2 DAW/DWEC/ACTIVIDAD/checkoutTiendaOnline/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "C:/Users/fabri/Desktop/2 DAW/DWEC/ACTIVIDAD/checkoutTiendaOnline/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "C:/Users/fabri/Desktop/2 DAW/DWEC/ACTIVIDAD/checkoutTiendaOnline/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
