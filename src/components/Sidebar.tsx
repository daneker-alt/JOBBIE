import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Search, Shield, Database, Building2, FileText, TrendingUp, Map } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Sidebar() {
  const { t } = useLanguage()
  const nav = [
    { to: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { to: '/scan', label: t.nav.scan, icon: Search },
    { to: '/ip', label: t.nav.ip, icon: Shield },
    { to: '/data', label: t.nav.data, icon: Database },
    { to: '/hub', label: t.nav.hub, icon: Building2 },
    { to: '/contracts', label: t.nav.contracts, icon: FileText },
    { to: '/investor', label: t.nav.investor, icon: TrendingUp },
    { to: '/journey', label: t.nav.journey, icon: Map },
  ]
  return (
    <aside className="w-60 shrink-0 flex flex-col h-screen bg-[#0B2D6B]">
      <div className="px-5 py-6 border-b border-white/10">
        <div className="text-2xl font-bold leading-none">
          <span className="text-white">Kerege</span><span className="text-[#16A334]">.ON</span>
        </div>
        <div className="text-xs mt-1">
          <span className="text-[#16A334]">You Create.</span>
          <span className="text-white/60"> We Protect.</span>
        </div>
      </div>
      <nav className="flex-1 py-3 overflow-y-auto">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) =>
            `flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${isActive
              ? 'text-white bg-white/10 border-l-2 border-[#16A334]'
              : 'text-white/60 hover:text-white hover:bg-white/5 border-l-2 border-transparent'}`
          }>
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-5 py-4 border-t border-white/10 space-y-3">
        <LanguageSwitcher />
        <div>
          <div className="text-white/50 text-xs font-medium">Sarsembaev Kanat</div>
          <div className="text-white/30 text-xs">AI Legal Counsel · PhD</div>
        </div>
      </div>
    </aside>
  )
}
