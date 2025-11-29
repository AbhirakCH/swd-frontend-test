import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      language: "Language",
      layoutPage: "Layout & Style",
      formPage: "Form & Table",
    },
  },
  th: {
    translation: {
      language: "ภาษา",
      layoutPage: "การจัดการหน้าเว็บ",
      formPage: "การจัดการหน้าฟอร์ม",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
