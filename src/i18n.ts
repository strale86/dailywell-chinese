import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getCurrentMarket } from './config/marketConfig';

// Import translations
import enTranslation from './locales/en/translation.json';
import srTranslation from './locales/sr/translation.json';
import zhTranslation from './locales/zh/translation.json';
import esTranslation from './locales/es/translation.json';
import itTranslation from './locales/it/translation.json';
import frTranslation from './locales/fr/translation.json';
import deTranslation from './locales/de/translation.json';
import hiTranslation from './locales/hi/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  sr: {
    translation: srTranslation
  },
  zh: {
    translation: zhTranslation
  },
  es: {
    translation: esTranslation
  },
  it: {
    translation: itTranslation
  },
  fr: {
    translation: frTranslation
  },
  de: {
    translation: deTranslation
  },
  hi: {
    translation: hiTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18nextLng',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    }
  });

// Set language based on current market
export const setLanguageFromMarket = () => {
  const market = getCurrentMarket();
  const language = market.language;
  
  console.log(`Setting language to: ${language}`);
  i18n.changeLanguage(language);
  
  // Update document lang attribute for better localization
  document.documentElement.lang = language;
  document.body.lang = language;
  
  // Update document title based on market
  const appName = import.meta.env.VITE_APP_NAME || market.appName;
  document.title = appName;
};

// Initialize with current market language
setLanguageFromMarket();

// Listen for language changes and update document lang attribute
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  document.body.lang = lng;
});

export default i18n;
