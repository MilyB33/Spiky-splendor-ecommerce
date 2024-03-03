import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "vuetify/lib/styles/main.css",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  pages: true,
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@pinia/nuxt",
    "nuxt-medusa",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  vite: {
    define: { "process.env.DEBUG": false },
    vue: {
      template: {
        transformAssetUrls,
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/_variables.module.scss" as variables;
            @use "~/assets/scss/_mixins.module.scss" as mixins;
            `,
        },
      },
    },
  },
});
