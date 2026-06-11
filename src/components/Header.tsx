import { Bell, ChevronDown } from 'lucide-react'
import RiskBadge from './RiskBadge'

interface HeaderProps {
  title?: string
  companyName?: string
  riskScore?: number
}

export default function Header({ title, companyName = 'AI Health Assistant', riskScore = 68 }: HeaderProps) {
  return (
    <header className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
      <div>
        {title && <h1 className="text-slate-200 font-semibold text-lg">{title}</h1>}
        <div className="flex items-center gap-3">
          <span className="text-slate-300 font-medium">{companyName}</span>
          <RiskBadge score={riskScore} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative text-slate-400 hover:text-slate-200">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">3</span>
        </button>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-800 px-3 py-2 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">А</div>
          <span className="text-slate-300 text-sm">Алибек</span>
          <ChevronDown size={16} className="text-slate-500" />
        </div>
      </div>
    </header>
  )
}
