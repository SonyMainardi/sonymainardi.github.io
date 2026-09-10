import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  I18nContext,
  LANG_STORAGE_KEY,
  dictionary,
  initialLang,
  type I18nValue,
  type Lang,
} from './i18n'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang)
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang((current) => (current === 'pt' ? 'en' : 'pt'))
  }, [])

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      toggleLang,
      t: (key) => dictionary[key][lang],
      l: (localized) => localized[lang],
    }),
    [lang, toggleLang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
