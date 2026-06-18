import { TrendingUp, FileText, Users } from 'lucide-react'
import SaveBar from '../components/SaveBar'
import Checklist from '../components/Checklist'
import { useWorkspace } from '../lib/useWorkspace'

const capTable = [
  { name: 'Алибек Джаксыбеков', role: 'CEO / Co-founder', equity: 45, type: 'Common' },
  { name: 'Диана Сейткали', role: 'CTO / Co-founder', equity: 35, type: 'Common' },
  { name: 'SAFE — Angel Round', role: 'Investor', equity: 10, type: 'SAFE' },
  { name: 'Option Pool', role: 'Employees', equity: 10, type: 'Options' },
]

const statusCycle = ['draft', 'ready', 'signed'] as const

function DocStatus({ status }: { status: string }) {
  if (status === 'signed') return <span className="text-green-700 text-xs border border-green-200 bg-green-50 px-2 py-0.5 rounded-full">Подписан</span>
  if (status === 'ready') return <span className="text-blue-700 text-xs border border-blue-200 bg-blue-50 px-2 py-0.5 rounded-full">Готов</span>
  return <span className="text-muted text-xs border border-line bg-brand-surface px-2 py-0.5 rounded-full">Черновик</span>
}

export default function InvestorRoom() {
  const { data, update, save, loading, dirty, saving, isAdmin } = useWorkspace()

  if (loading) return <div className="text-muted text-sm">Загрузка данных…</div>

  const { ddCategories, investorDocs: documents } = data
  const totalItems = ddCategories.reduce((s, c) => s + c.items.length, 0)
  const doneItems = ddCategories.reduce((s, c) => s + c.items.filter(i => i.done).length, 0)
  const readinessScore = Math.round((doneItems / totalItems) * 100)

  return (
    <div className="space-y-6">
      <SaveBar isAdmin={isAdmin} dirty={dirty} saving={saving} onSave={save} />

      {/* Score */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`border rounded-xl p-4 shadow-sm hover:shadow-md transition ${readinessScore >= 75 ? 'bg-green-50 border-green-200' : readinessScore >= 50 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
          <div className="text-muted text-xs mb-1">Готовность к DD</div>
          <div className={`text-3xl font-mono font-semibold ${readinessScore >= 75 ? 'text-green-700' : readinessScore >= 50 ? 'text-amber-700' : 'text-red-700'}`}>
            {readinessScore}%
          </div>
          <div className="w-full bg-line rounded-full h-1.5 mt-2">
            <div className={`h-1.5 rounded-full ${readinessScore >= 75 ? 'bg-brand-green' : readinessScore >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${readinessScore}%` }} />
          </div>
        </div>
        <div className="bg-white border border-line rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <div className="text-muted text-xs mb-1">DD Checklist</div>
          <div className="text-2xl font-mono font-semibold text-brand-blue">{doneItems}/{totalItems}</div>
          <div className="text-muted text-xs mt-1">пунктов выполнено</div>
        </div>
        <div className="bg-white border border-line rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <div className="text-muted text-xs mb-1">Документов</div>
          <div className="text-2xl font-mono font-semibold text-brand-blue">{documents.filter(d => d.status !== 'draft').length}/{documents.length}</div>
          <div className="text-muted text-xs mt-1">готово / всего</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cap Table */}
        <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
          <h2 className="text-ink font-semibold mb-4 flex items-center gap-2 tracking-tightest">
            <Users size={16} className="text-brand-blue" /> Cap Table
          </h2>
          <div className="space-y-3">
            {capTable.map(({ name, role, equity, type }) => (
              <div key={name}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <div className="text-ink text-sm font-medium">{name}</div>
                    <div className="text-muted text-xs">{role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-brand-blue font-mono font-semibold">{equity}%</div>
                    <div className="text-muted text-xs">{type}</div>
                  </div>
                </div>
                <div className="w-full bg-line rounded-full h-1.5">
                  <div className="bg-brand-blue h-1.5 rounded-full" style={{ width: `${equity}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-line mt-4 pt-3 flex justify-between text-sm">
            <span className="text-muted">Итого</span>
            <span className="text-brand-blue font-mono font-semibold">100%</span>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
          <h2 className="text-ink font-semibold mb-4 flex items-center gap-2 tracking-tightest">
            <FileText size={16} className="text-brand-blue" /> Data Room
          </h2>
          <div className="space-y-3">
            {documents.map(({ name, status, date }, idx) => (
              <div key={name} className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-ink text-sm">{name}</div>
                  {date && <div className="text-muted text-xs font-mono">{date}</div>}
                </div>
                {isAdmin ? (
                  <button
                    onClick={() => update(d => {
                      const cur = d.investorDocs[idx].status
                      d.investorDocs[idx].status = statusCycle[(statusCycle.indexOf(cur) + 1) % statusCycle.length]
                    })}
                    className="hover:opacity-80 transition"
                  >
                    <DocStatus status={status} />
                  </button>
                ) : <DocStatus status={status} />}
              </div>
            ))}
          </div>
        </div>

        {/* DD Summary */}
        <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
          <h2 className="text-ink font-semibold mb-4 flex items-center gap-2 tracking-tightest">
            <TrendingUp size={16} className="text-brand-blue" /> DD Summary
          </h2>
          <div className="space-y-3">
            {ddCategories.map(({ name, items }) => {
              const dCount = items.filter(i => i.done).length
              const pct = Math.round((dCount / items.length) * 100)
              const color = pct === 100 ? 'bg-brand-green' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'
              const textColor = pct === 100 ? 'text-green-700' : pct >= 50 ? 'text-amber-700' : 'text-red-700'
              return (
                <div key={name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted">{name}</span>
                    <span className={`font-mono ${textColor}`}>{dCount}/{items.length}</span>
                  </div>
                  <div className="w-full bg-line rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* DD Checklist detail */}
      <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
        <h2 className="text-ink font-semibold mb-5 tracking-tightest">Детальный DD Checklist</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ddCategories.map(({ name, items }, catIdx) => (
            <div key={name}>
              <h3 className="text-ink text-sm font-semibold mb-3">{name}</h3>
              <Checklist
                items={items}
                isAdmin={isAdmin}
                onToggle={idx => update(d => {
                  d.ddCategories[catIdx].items[idx].done = !d.ddCategories[catIdx].items[idx].done
                })}
                dense
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
