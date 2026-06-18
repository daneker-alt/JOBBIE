import { useLanguage } from '../context/LanguageContext'
import { langLabels, type Lang } from '../i18n'

const langs: Lang[] = ['ru', 'kk', 'en']

interface Props { className?: string }

export default function LanguageSwitcher({ className = '' }: Props) {
  const { lang, setLang } = useLanguage()
  return (
    <div className={`flex items-center gap-0.5 border border-line rounded-lg p-0.5 bg-white ${className}`}>
      {langs.map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`text-xs font-medium px-2 py-1 rounded-md transition-colors ${
            lang === l ? 'bg-brand-blue text-white' : 'text-muted hover:bg-brand-surface'
          }`}
        >
          {langLabels[l]}
        </button>
      ))}
    </div>
  )
}
