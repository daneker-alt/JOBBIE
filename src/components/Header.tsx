import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

interface HeaderProps { title: string; onHelp?: () => void }

export default function Header({ title, onHelp }: HeaderProps) {
  const { user, isAdmin, signOut } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  async function logout() {
    await signOut()
    navigate('/login')
  }

  return (
    <header className="h-14 bg-white border-b border-line flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="text-brand-blue font-semibold text-lg tracking-tightest">{title}</h1>
        <span className="hidden sm:block text-xs text-line">|</span>
        <span className="hidden sm:block text-xs font-semibold text-muted">{t.header.aiAssistant}</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onHelp}
          className="text-xs font-semibold text-brand-blue border border-line hover:bg-brand-surface px-3 py-1.5 rounded-lg transition-colors"
        >
          {t.common.help}
        </button>
        {user && (
          <span className={`hidden sm:inline text-xs font-medium px-2.5 py-1 rounded-full border ${isAdmin ? 'bg-brand-blue/5 text-brand-blue border-brand-blue/20' : 'bg-brand-surface text-muted border-line'}`}>
            {isAdmin ? t.common.employee : t.common.client} · {user.email}
          </span>
        )}
        {user && (
          <button
            onClick={logout}
            title={t.common.logout}
            className="text-muted hover:text-brand-blue border border-line hover:bg-brand-surface p-1.5 rounded-lg transition-colors"
          >
            <LogOut size={14} />
          </button>
        )}
      </div>
    </header>
  )
}
