import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getCurrentMarket } from './config/marketConfig';

// Import translations
import enTranslation from '../public/locales/en/translation.json';
import srTranslation from '../public/locales/sr/translation.json';
import zhTranslation from '../public/locales/zh/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  sr: {
    translation: srTranslation
  },
  zh: {
    translation: zhTranslation
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
  
  // Update document title based on market
  const appName = import.meta.env.VITE_APP_NAME || market.appName;
  document.title = appName;
};

// Initialize with current market language
setLanguageFromMarket();

export default i18n;
