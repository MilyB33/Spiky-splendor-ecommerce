import "@mdi/font/css/materialdesignicons.css";
import colors from "vuetify/util/colors";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: false,
    components,
    directives,
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: colors.shades.black,
            green_primary: colors.green.darken3,
            orange_primary: colors.deepOrange.lighten1,
          },
        },
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
