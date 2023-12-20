import { en } from "~/translations/en";
import { it } from "~/translations/it";
import { es } from "~/translations/es";
import { de } from "~/translations/de";
import { fr } from "~/translations/fr";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    de,
    es,
    fr,
    it,
  },
}));
