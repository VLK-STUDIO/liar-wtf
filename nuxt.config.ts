// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxtjs/i18n"],
  colorMode: {
    preference: "light",
  },
  i18n: {
    baseUrl: "https://truthless.vercel.app",
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
    ],
  },
});
