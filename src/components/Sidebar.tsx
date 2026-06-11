import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Search,
  Shield,
  Database,
  Building2,
  FileText,
  TrendingUp,
  Map,
  Scale,
} from 'lucide-react'

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Дашборд' },
  { path: '/scan', icon: Search, label: 'Legal Scan' },
  { path: '/ip', icon: Shield, label: 'IP Реестр' },
  { path: '/data', icon: Database, label: 'Данные & AI' },
  { path: '/hub', icon: Building2, label: 'Astana Hub' },
  { path: '/contracts', icon: FileText, label: 'Договоры' },
  { path: '/investor', icon: TrendingUp, label: 'Инвестиции' },
  { path: '/journey', icon: Map, label: 'Путь клиента' },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-700 flex flex-col min-h-screen">
      <div className="p-6 border-b border-slate-700">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Scale size={16} className="text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">LegalOS</span>
        </Link>
        <p className="text-slate-500 text-xs mt-1 ml-11">AI/IT Legal Platform</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-slate-400 text-xs mb-1">Тариф</p>
          <p className="text-indigo-400 text-sm font-semibold">Monthly LegalOps</p>
          <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
            <div className="bg-indigo-500 h-1 rounded-full w-3/4"></div>
          </div>
          <p className="text-slate-500 text-xs mt-1">18 из 24 задач</p>
        </div>
      </div>
    </aside>
  )
}
