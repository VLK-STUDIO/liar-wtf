const URL = "https://www.liar.wtf";

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
    name: "Liar.wtf",
  },
  routeRules: {
    "/rules": {
      prerender: true,
    },
  },
  content: {
    contentHead: false,
  },
});
