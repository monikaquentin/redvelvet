import i18next from 'i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import { initReactI18next } from 'react-i18next'

import de from '@/i18n/locale/de.json'
import en from '@/i18n/locale/en.json'
import fr from '@/i18n/locale/fr.json'
import id from '@/i18n/locale/id.json'
import jp from '@/i18n/locale/jp.json'
import ru from '@/i18n/locale/ru.json'

export default i18next
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // i18next-http-backend
  .use(HttpBackend)
  // init i18next
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    // backend: 'http://localhost:5173/locales/{{lng}}/{{ns}}.json',
    resources: {
      ...en,
      ...de,
      ...fr,
      ...id,
      ...jp,
      ...ru
    }
  })
