import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { es } from "./locales";
import en from "./locales/en.json";
import zhTw from "./locales/zh-tw.json";

// match(languages, locales, defaultLocale) // -> 'en-US'
import { DEFAULT_LOCALE, LOCALES } from "./i18n.config";

i18n

  // Enables the i18next backend
  // .use(Backend)

  // Enable automatic language detection
  .use(LanguageDetector)

  // Enables the hook initialization module
  .use(initReactI18next)
  .init({
    lng: DEFAULT_LOCALE,
    // backend: {
    //   /* translation file path */
    //   loadPath: "locales/{{lng}}/common.json",
    // },

    resources: (() => {
      return {
        en: {
          common: en,
        },
        es: {
          common: es,
        },
        "zh-TW": {
          common: zhTw,
        },
      };
    })(),
    fallbackLng: ["zh-TW", "en", "es"],
    debug: false,
    keySeparator: false,
    react: {
      useSuspense: false,
    },
    ns: ["common"],
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
  });

export default i18n;
