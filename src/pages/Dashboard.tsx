import { AlertTriangle, Clock, FileText } from 'lucide-react'
import TaskCard from '../components/TaskCard'
import SaveBar from '../components/SaveBar'
import { useWorkspace } from '../lib/useWorkspace'
import type { DocStatus } from '../lib/types'

const docStatusCycle: DocStatus[] = ['draft', 'pending', 'ready']

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
  const { data, update, save, loading, dirty, saving, isAdmin } = useWorkspace()

  if (loading) return <div className="text-muted text-sm">Загрузка данных…</div>

  return (
    <div className="space-y-6">
      <SaveBar isAdmin={isAdmin} dirty={dirty} saving={saving} onSave={save} />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {data.risks.map(({ label, score }, idx) => {
          const color = score >= 75 ? 'text-green-700' : score >= 50 ? 'text-amber-700' : 'text-red-700'
          const dot = score >= 75 ? 'bg-green-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'
          const fill = score >= 75 ? 'bg-brand-green' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'
          return (
            <div key={label} className="bg-white border border-line rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted text-xs font-medium flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${dot}`} /> {label}
                </span>
              </div>
              <div className={`text-2xl font-mono font-semibold ${color}`}>{score}</div>
              {isAdmin ? (
                <input
                  type="range" min={0} max={100} value={score}
                  onChange={e => update(d => { d.risks[idx].score = Number(e.target.value) })}
                  className="w-full mt-2 accent-brand-blue"
                />
              ) : (
                <div className="w-full bg-line rounded-full h-1 mt-2">
                  <div className={`h-1 rounded-full ${fill}`} style={{ width: `${score}%` }} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-ink font-semibold tracking-tightest">Legal Backlog</h2>
            <span className="text-muted text-sm"><span className="font-mono">{data.tasks.length}</span> задачи</span>
          </div>
          {data.tasks.map((task, i) => <TaskCard key={i} {...task} />)}
        </div>

        <div>
          <h2 className="text-ink font-semibold mb-4 tracking-tightest">Compliance Calendar</h2>
          <div className="space-y-3">
            {data.calendar.map(({ date, event, urgent }) => (
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
          <span className="text-muted text-sm"><span className="font-mono">{data.documents.filter(d => d.status === 'ready').length}</span> из <span className="font-mono">{data.documents.length}</span> готовы</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.documents.map(({ name, status, type }, idx) => (
            <div key={name} className="bg-white border border-line rounded-xl p-4 shadow-sm hover:shadow-md transition flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={16} className="text-muted" />
                <div>
                  <div className="text-ink text-sm font-medium">{name}</div>
                  <div className="text-muted text-xs">{type}</div>
                </div>
              </div>
              {isAdmin ? (
                <button
                  onClick={() => update(d => {
                    const cur = d.documents[idx].status
                    const next = docStatusCycle[(docStatusCycle.indexOf(cur) + 1) % docStatusCycle.length]
                    d.documents[idx].status = next
                  })}
                  className={`text-xs border px-2 py-0.5 rounded-full hover:opacity-80 transition ${getDocStatus(status)}`}
                >
                  {getDocLabel(status)}
                </button>
              ) : (
                <span className={`text-xs border px-2 py-0.5 rounded-full ${getDocStatus(status)}`}>{getDocLabel(status)}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
