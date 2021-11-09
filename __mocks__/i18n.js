import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const initI18n = (json = {}) => {
  i18n.use(initReactI18next).init({
    lng: "es",
    fallbackLng: "es",

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    debug: false,
    resources: {
      es: json,
    },
  });

  return i18n;
};

export default initI18n;
