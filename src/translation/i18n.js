import i18next from "i18next"
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next"
import enTranslate from './en/translation.json'
import vnTranslate from './vn/translation.json'
// import sync from './generate'

export const fallbackLng = 'en'
export const supportedLngs = ['en', 'vn']

// sync.syncLocale({ defaultLanguage: fallbackLng, supportLanguages: supportedLngs })

const option = {
    lng: 'vn',
    fallbackLng,
    supportedLngs,
    ns: 'translation',
    debug: true,
    saveMissing: true,
    partialBundledLanguages: true,
    updateMissing: true,
    resources: {
        en: {
            translation: enTranslate
        },
        vn: {
            translation: vnTranslate
        }
    },
    interpolation: {
        escapeValue: false, // not needed for react!!
    },

    // react i18next special options (optional)
    // override if needed - omit if ok with defaults
    react: {
        bindI18n: 'languageChanged',
        bindI18nStore: '',
        transEmptyNodeValue: '',
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
        useSuspense: true,
    }
}

i18next
    // .use(Backend)
    .use(I18nextBrowserLanguageDetector).use(initReactI18next).init({ ...option })

export default i18next