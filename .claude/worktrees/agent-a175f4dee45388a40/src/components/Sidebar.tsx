import { NavLink } from 'react-router-dom'
import { Shield, LayoutDashboard, Search, FileText, Database, Building2, ScrollText, TrendingUp, Map } from 'lucide-react'

const navItems = [
  { to: '/', icon: Shield, label: 'Главная' },
  { to: '/dashboard', icon: LayoutDashboard, label: 'Дашборд' },
  { to: '/scan', icon: Search, label: 'Legal Scan' },
  { to: '/ip', icon: FileText, label: 'IP Реестр' },
  { to: '/data', icon: Database, label: 'Data & AI' },
  { to: '/hub', icon: Building2, label: 'Astana Hub' },
  { to: '/contracts', icon: ScrollText, label: 'Договоры' },
  { to: '/investor', icon: TrendingUp, label: 'Investor Room' },
  { to: '/journey', icon: Map, label: 'Client Journey' },
]

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-700 flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-slate-700">
        <Shield className="text-indigo-400 w-8 h-8" />
        <span className="text-white font-bold text-xl">LegalOS</span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <div className="text-xs text-slate-500">
          <div className="font-medium text-slate-400">Sarsembaev Kanat</div>
          <div>AI Legal Counsel, PhD</div>
        </div>
      </div>
    </div>
  )
}
