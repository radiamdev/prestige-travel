import en from '../../i18n/en.json'
import it from '../../i18n/it.json'
import de from '../../i18n/de.json'

const translations = {
    en,
    it,
    de,
}

export function getTranslations(locale: string) {
    return translations[locale as keyof typeof translations] || translations.en
}
