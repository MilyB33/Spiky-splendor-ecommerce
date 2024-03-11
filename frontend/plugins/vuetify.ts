import "@mdi/font/css/materialdesignicons.css";
import colors from "vuetify/util/colors";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: colors.shades.black,
            green_primary: colors.green.accent3,
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
