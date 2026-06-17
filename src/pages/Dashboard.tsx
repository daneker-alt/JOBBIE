import { AlertTriangle, Clock, FileText, TrendingUp, Shield, Database, Building2 } from 'lucide-react'
import TaskCard from '../components/TaskCard'

const tasks = [
  { title: 'IP Assignment', description: '2 founders · 1 contractor · нет подписанных соглашений', status: 'urgent' as const, deadline: 'Пятница', assignees: ['Алибек', 'Диана'] },
  { title: 'Privacy Notice', description: 'Health-data flow требует обновления consent policy', status: 'in-progress' as const, deadline: '20 июня', assignees: ['Алибек'] },
  { title: 'Pilot Agreement', description: 'POC шаблон готов к согласованию с клиентом', status: 'ready' as const, deadline: '25 июня', assignees: ['Диана', 'Клиент'] },
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
  if (status === 'ready') return 'text-green-700 bg-green-50 border-green-200'
  if (status === 'pending') return 'text-amber-700 bg-amber-50 border-amber-200'
  return 'text-muted bg-brand-surface border-line'
}
function getDocLabel(status: string) {
  if (status === 'ready') return 'Готов'
  if (status === 'pending') return 'В работе'
  return 'Черновик'
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {riskCategories.map(({ label, score, icon: Icon }) => {
          const color = score >= 75 ? 'text-green-700' : score >= 50 ? 'text-amber-700' : 'text-red-700'
          const dot = score >= 75 ? 'bg-green-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'
          const fill = score >= 75 ? 'bg-brand-green' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'
          return (
            <div key={label} className="bg-white border border-line rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted text-xs font-medium flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${dot}`} /> {label}
                </span>
                <Icon size={14} className="text-muted" />
              </div>
              <div className={`text-2xl font-mono font-semibold ${color}`}>{score}</div>
              <div className="w-full bg-line rounded-full h-1 mt-2">
                <div className={`h-1 rounded-full ${fill}`} style={{ width: `${score}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-ink font-semibold tracking-tightest">Legal Backlog</h2>
            <span className="text-muted text-sm"><span className="font-mono">{tasks.length}</span> задачи</span>
          </div>
          {tasks.map((task, i) => <TaskCard key={i} {...task} />)}
        </div>

        <div>
          <h2 className="text-ink font-semibold mb-4 tracking-tightest">Compliance Calendar</h2>
          <div className="space-y-3">
            {calendar.map(({ date, event, urgent }) => (
              <div key={date} className={`bg-white border rounded-xl p-3 shadow-sm hover:shadow-md transition ${urgent ? 'border-red-200' : 'border-line'}`}>
                <div className="flex items-start gap-2">
                  {urgent ? <AlertTriangle size={14} className="text-red-600 mt-0.5 shrink-0" /> : <Clock size={14} className="text-muted mt-0.5 shrink-0" />}
                  <div>
                    <div className="text-muted text-xs mb-0.5 font-mono">{date}</div>
                    <div className="text-ink text-sm">{event}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-ink font-semibold tracking-tightest">Document Map</h2>
          <span className="text-muted text-sm"><span className="font-mono">{documents.filter(d => d.status === 'ready').length}</span> из <span className="font-mono">{documents.length}</span> готовы</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {documents.map(({ name, status, type }) => (
            <div key={name} className="bg-white border border-line rounded-xl p-4 shadow-sm hover:shadow-md transition flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={16} className="text-muted" />
                <div>
                  <div className="text-ink text-sm font-medium">{name}</div>
                  <div className="text-muted text-xs">{type}</div>
                </div>
              </div>
              <span className={`text-xs border px-2 py-0.5 rounded-full ${getDocStatus(status)}`}>{getDocLabel(status)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
