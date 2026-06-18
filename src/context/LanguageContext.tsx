import { createContext, useContext, useEffect, useState } from 'react'
import { dictionaries, type Lang, type Dict } from '../i18n'

interface LanguageState {
  lang: Lang
  t: Dict
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageState | undefined>(undefined)

const LS_KEY = 'kerege.lang'

function detectInitialLang(): Lang {
  const saved = localStorage.getItem(LS_KEY)
  if (saved === 'ru' || saved === 'kk' || saved === 'en') return saved
  const nav = navigator.language.toLowerCase()
  if (nav.startsWith('kk')) return 'kk'
  if (nav.startsWith('ru')) return 'ru'
  return 'en'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang)

  useEffect(() => {
    localStorage.setItem(LS_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  function setLang(next: Lang) {
    setLangState(next)
  }

  return (
    <LanguageContext.Provider value={{ lang, t: dictionaries[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
