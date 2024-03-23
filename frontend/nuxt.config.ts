import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["vuetify/lib/styles/main.css", "@mdi/font/css/materialdesignicons.min.css"],
  pages: true,
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@pinia/nuxt",
    "nuxt-medusa",
    "@vee-validate/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  medusa: {
    server: true,
  },
  vite: {
    define: { "process.env.DEBUG": false },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
