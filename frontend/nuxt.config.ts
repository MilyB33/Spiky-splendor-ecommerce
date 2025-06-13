import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["vuetify/lib/styles/main.css", "@mdi/font/css/materialdesignicons.min.css"],
  pages: true,
  ssr: false,
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  runtimeConfig: {
    public: {
      PUBLIC_STRIPE_KEY: process.env.PUBLIC_STRIPE_KEY,
      PAYMENT_RETURN_URL: process.env.PAYMENT_RETURN_URL,
      ENVIRONMENT: process.env.NODE_ENV,
    },
  },
  modules: [
    "@vueuse/nuxt",
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
    server: false,
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
  experimental: {
    clientNodeCompat: true,
  },
});
