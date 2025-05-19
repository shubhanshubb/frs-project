import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import { en } from '../languages';

i18n.use(initReactI18next).init({
  lng: getLocales()[0].languageCode,
  fallbackLng: 'en',
  debug: true,
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    en: en,
    es: en,
    de: en
  }
});

export default i18n;
