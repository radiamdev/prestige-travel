import en from './locales/en.json'
import de from './locales/de.json'
import fr from './locales/fr.json'
import it from './locales/it.json'

export const defaultLang = 'en'

export const translations = {
    en,
    de,
    fr,
    it,
}

export const languages = {
    en: 'English',
    de: 'German',
    fr: 'French',
    it: 'Italian',
}

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/')
    if (lang in translations) return lang as keyof typeof translations
    return defaultLang
}

export function useTranslations(lang: keyof typeof translations) {
    return function t(key: string): string {
        const keys = key.split('.')
        let value: any = translations[lang]

        for (const k of keys) {
            value = value?.[k]
            if (value === undefined) break
        }

        // fallback
        if (value === undefined) {
            value = keys.reduce(
                (obj: any, k) => obj?.[k],
                translations[defaultLang]
            )
        }

        return value ?? key
    }
}
