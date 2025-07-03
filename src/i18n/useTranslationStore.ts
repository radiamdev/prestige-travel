import { create } from 'zustand'
import { translations, defaultLang } from './index'

type Lang = keyof typeof translations

interface TranslationState {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string) => string
}

export const useTranslationStore = create<TranslationState>((set, get) => ({
  lang: defaultLang,

  setLang: (lang) => set({ lang }),

  t: (key: string): string => {
    const { lang } = get()
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
  },
}))
