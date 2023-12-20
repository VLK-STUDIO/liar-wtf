const URL = "https://liar.wtf";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/content",
    "nuxt-simple-sitemap",
  ],
  colorMode: {
    preference: "light",
  },
  ui: {
    icons: ["tabler"],
  },
  i18n: {
    baseUrl: URL,
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        iso: "en-US",
      },
      {
        code: "it",
        iso: "it-IT",
      },
      {
        code: "es",
        iso: "es-ES",
      },
      {
        code: "de",
        iso: "de-DE",
      },
      {
        code: "fr",
        iso: "fr-FR",
      },
    ],
  },
  site: {
    url: URL,
  },
  routeRules: {
    "/rules": {
      prerender: true,
    },
  },
});
