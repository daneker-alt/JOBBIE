import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Search, Shield, Database, Building2, FileText, TrendingUp, Map } from 'lucide-react'

const nav = [
  { to: '/dashboard', label: 'Дашборд', icon: LayoutDashboard },
  { to: '/scan', label: 'Legal Scan', icon: Search },
  { to: '/ip', label: 'IP Реестр', icon: Shield },
  { to: '/data', label: 'Data & AI', icon: Database },
  { to: '/hub', label: 'Astana Hub', icon: Building2 },
  { to: '/contracts', label: 'Договоры', icon: FileText },
  { to: '/investor', label: 'Инвестиции', icon: TrendingUp },
  { to: '/journey', label: 'Путь клиента', icon: Map },
]

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 flex flex-col h-screen bg-[#0B2D6B]">
      <div className="px-5 py-6 border-b border-white/10">
        <div className="text-2xl font-bold leading-none">
          <span className="text-white">Lex</span><span className="text-[#16A334]">.ON</span>
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
      <div className="px-5 py-4 border-t border-white/10">
        <div className="text-white/50 text-xs font-medium">Sarsembaev Kanat</div>
        <div className="text-white/30 text-xs">AI Legal Counsel · PhD</div>
      </div>
    </aside>
  )
}
