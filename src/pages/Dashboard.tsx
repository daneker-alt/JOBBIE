import { AlertTriangle, Clock, FileText, TrendingUp, Shield, Database, Building2 } from 'lucide-react'
import TaskCard from '../components/TaskCard'
const tasks = [
  {
    title: 'IP Assignment',
    description: '2 founders · 1 contractor · нет подписанных соглашений',
    status: 'urgent' as const,
    deadline: 'Пятница',
    assignees: ['Алибек', 'Диана'],
  },
  {
    title: 'Privacy Notice',
    description: 'Health-data flow требует обновления consent policy',
    status: 'in-progress' as const,
    deadline: '20 июня',
    assignees: ['Алибек'],
  },
  {
    title: 'Pilot Agreement',
    description: 'POC шаблон готов к согласованию с клиентом',
    status: 'ready' as const,
    deadline: '25 июня',
    assignees: ['Диана', 'Клиент'],
  },
]

const documents = [
  { name: 'NDA / Founder Terms', status: 'ready', type: 'Corporate' },
  { name: 'IP Assignment Package', status: 'pending', type: 'IP' },
  { name: 'Privacy Policy + Consent', status: 'pending', type: 'Data' },
  { name: 'SaaS Terms / SLA', status: 'ready', type: 'Sales' },
  { name: 'Astana Hub Memo', status: 'ready', type: 'Hub' },
  { name: 'Investor DD Package', status: 'draft', type: 'Invest' },
]

const calendar = [
  { date: '14 июня', event: 'IP assignment deadline — founders', urgent: true },
  { date: '20 июня', event: 'Astana Hub — квартальный отчёт', urgent: false },
  { date: '25 июня', event: 'Pilot agreement — клиент review', urgent: false },
  { date: '1 июля', event: '90/10 revenue review Q2', urgent: false },
]

const riskCategories = [
  { label: 'IP', score: 40, icon: Shield },
  { label: 'Data', score: 55, icon: Database },
  { label: 'Hub', score: 80, icon: Building2 },
  { label: 'Sales', score: 70, icon: FileText },
  { label: 'Investor', score: 30, icon: TrendingUp },
]

function getDocStatus(status: string) {
  if (status === 'ready') return 'text-green-400 bg-green-500/10 border-green-500/20'
  if (status === 'pending') return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
  return 'text-slate-400 bg-slate-700/30 border-slate-600/30'
}
function getDocLabel(status: string) {
  if (status === 'ready') return 'Готов'
  if (status === 'pending') return 'В работе'
  return 'Черновик'
}

export default function Dashboard() {
  return (
    <div className="space-y-6">

          {/* Risk overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {riskCategories.map(({ label, score, icon: Icon }) => {
              const color = score >= 75 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'
              const bg = score >= 75 ? 'bg-green-500/10' : score >= 50 ? 'bg-yellow-500/10' : 'bg-red-500/10'
              const border = score >= 75 ? 'border-green-500/20' : score >= 50 ? 'border-yellow-500/20' : 'border-red-500/20'
              return (
                <div key={label} className={`${bg} border ${border} rounded-xl p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-xs font-medium">{label}</span>
                    <Icon size={14} className="text-slate-500" />
                  </div>
                  <div className={`text-2xl font-bold ${color}`}>{score}</div>
                  <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                    <div className={`h-1 rounded-full ${score >= 75 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${score}%` }}></div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Tasks */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-slate-200 font-semibold">Legal Backlog</h2>
                <span className="text-slate-500 text-sm">{tasks.length} задачи</span>
              </div>
              {tasks.map((task, i) => (
                <TaskCard key={i} {...task} />
              ))}
            </div>

            {/* Calendar */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-slate-200 font-semibold">Compliance Calendar</h2>
              </div>
              <div className="space-y-3">
                {calendar.map(({ date, event, urgent }) => (
                  <div key={date} className={`bg-slate-800/60 border rounded-xl p-3 ${urgent ? 'border-red-500/30' : 'border-slate-700'}`}>
                    <div className="flex items-start gap-2">
                      {urgent ? <AlertTriangle size={14} className="text-red-400 mt-0.5 shrink-0" /> : <Clock size={14} className="text-slate-500 mt-0.5 shrink-0" />}
                      <div>
                        <div className="text-slate-400 text-xs mb-0.5">{date}</div>
                        <div className="text-slate-300 text-sm">{event}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Documents */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-slate-200 font-semibold">Document Map</h2>
              <span className="text-slate-500 text-sm">{documents.filter(d => d.status === 'ready').length} из {documents.length} готовы</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {documents.map(({ name, status, type }) => (
                <div key={name} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-slate-500" />
                    <div>
                      <div className="text-slate-300 text-sm font-medium">{name}</div>
                      <div className="text-slate-500 text-xs">{type}</div>
                    </div>
                  </div>
                  <span className={`text-xs border px-2 py-0.5 rounded-full ${getDocStatus(status)}`}>
                    {getDocLabel(status)}
                  </span>
                </div>
              ))}
            </div>
          </div>

    </div>
  )
}
