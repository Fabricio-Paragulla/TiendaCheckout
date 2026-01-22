import { GitContributors } from "C:/Users/fabri/Desktop/2 DAW/DWEC/ACTIVIDAD/checkoutTiendaOnline/node_modules/@vuepress/plugin-git/lib/client/components/GitContributors.js";
import { GitChangelog } from "C:/Users/fabri/Desktop/2 DAW/DWEC/ACTIVIDAD/checkoutTiendaOnline/node_modules/@vuepress/plugin-git/lib/client/components/GitChangelog.js";

export default {
  enhance: ({ app }) => {
    app.component("GitContributors", GitContributors);
    app.component("GitChangelog", GitChangelog);
  },
};
