import { useState } from 'react'
import RiskBadge from '../components/RiskBadge'
import { Shield, AlertTriangle, CheckCircle, Plus, X } from 'lucide-react'

type IPAsset = {
  id: number
  name: string
  type: string
  owner: string
  status: 'assigned' | 'pending' | 'risk'
  contractors: string
  notes: string
  riskScore: number
}

const initialAssets: IPAsset[] = [
  { id: 1, name: 'Backend API (Node.js)', type: 'Код', owner: 'AI Health Assistant Ltd', status: 'assigned', contractors: '', notes: 'IP assignment подписан всеми основателями', riskScore: 25 },
  { id: 2, name: 'ML Health Model v2', type: 'AI-модель', owner: 'Алибек (основатель)', status: 'risk', contractors: '', notes: 'Не передано на компанию — нужен IP assignment', riskScore: 85 },
  { id: 3, name: 'UI/UX Design System', type: 'Дизайн', owner: 'AI Health Assistant Ltd', status: 'pending', contractors: 'Freelance Designer', notes: 'Ожидает подписания от подрядчика', riskScore: 55 },
  { id: 4, name: 'Training Dataset v1', type: 'Датасет', owner: 'AI Health Assistant Ltd', status: 'assigned', contractors: '', notes: 'Датасет собственный, лицензия оформлена', riskScore: 25 },
  { id: 5, name: 'Mobile App (React Native)', type: 'Код', owner: 'Диана (основатель)', status: 'risk', contractors: 'Dev Agency KZ', notes: 'Нет IP assignment от подрядчика и основателя', riskScore: 85 },
]

const typeColors: Record<string, string> = {
  'Код': 'text-blue-700 bg-blue-50 border-blue-200',
  'AI-модель': 'text-purple-700 bg-purple-50 border-purple-200',
  'Дизайн': 'text-pink-700 bg-pink-50 border-pink-200',
  'Датасет': 'text-cyan-700 bg-cyan-50 border-cyan-200',
}

function StatusBadge({ status }: { status: IPAsset['status'] }) {
  const conf = {
    assigned: { label: 'Оформлено', cls: 'text-green-700 bg-green-50 border-green-200', icon: <CheckCircle size={12} /> },
    pending: { label: 'В процессе', cls: 'text-amber-700 bg-amber-50 border-amber-200', icon: <AlertTriangle size={12} /> },
    risk: { label: 'Риск', cls: 'text-red-700 bg-red-50 border-red-200', icon: <AlertTriangle size={12} /> },
  }[status]
  return (
    <span className={`flex items-center gap-1 text-xs border px-2 py-0.5 rounded-full ${conf.cls}`}>
      {conf.icon} {conf.label}
    </span>
  )
}

export default function IPRegistry() {
  const [assets, setAssets] = useState<IPAsset[]>(initialAssets)
  const [showAdd, setShowAdd] = useState(false)
  const [newAsset, setNewAsset] = useState({ name: '', type: 'Код', owner: '', contractors: '', notes: '', riskScore: 55 })

  const addAsset = () => {
    if (!newAsset.name) return
    setAssets(a => [...a, { ...newAsset, id: Date.now(), status: 'pending', riskScore: newAsset.riskScore }])
    setNewAsset({ name: '', type: 'Код', owner: '', contractors: '', notes: '', riskScore: 55 })
    setShowAdd(false)
  }

  const riskCount = assets.filter(a => a.status === 'risk').length
  const pendingCount = assets.filter(a => a.status === 'pending').length

  return (
    <div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-line rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <div className="text-muted text-xs mb-1">Всего активов</div>
              <div className="text-2xl font-mono font-semibold text-brand-blue">{assets.length}</div>
            </div>
            <div className={`border rounded-xl p-4 shadow-sm hover:shadow-md transition ${riskCount > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-line'}`}>
              <div className="text-muted text-xs mb-1">Риски</div>
              <div className={`text-2xl font-mono font-semibold ${riskCount > 0 ? 'text-red-700' : 'text-green-700'}`}>{riskCount}</div>
            </div>
            <div className={`border rounded-xl p-4 shadow-sm hover:shadow-md transition ${pendingCount > 0 ? 'bg-amber-50 border-amber-200' : 'bg-white border-line'}`}>
              <div className="text-muted text-xs mb-1">В процессе</div>
              <div className={`text-2xl font-mono font-semibold ${pendingCount > 0 ? 'text-amber-700' : 'text-green-700'}`}>{pendingCount}</div>
            </div>
          </div>

          {riskCount > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertTriangle size={18} className="text-red-600 mt-0.5 shrink-0" />
              <div>
                <div className="text-red-700 font-semibold text-sm mb-1">Обнаружены IP-риски</div>
                <div className="text-red-700/80 text-xs">
                  <span className="font-mono">{riskCount}</span> актив(ов) с риском. Необходимо подписать IP assignment и передать права на компанию до следующего раунда или привлечения инвесторов.
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="bg-white border border-line rounded-2xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-line">
              <h2 className="text-ink font-semibold tracking-tightest">Активы IP</h2>
              <button
                onClick={() => setShowAdd(true)}
                className="flex items-center gap-2 bg-brand-blue hover:opacity-85 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Plus size={16} /> Добавить актив
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th className="text-left text-xs font-semibold uppercase tracking-[0.05em] text-muted px-6 py-3">Актив</th>
                    <th className="text-left text-xs font-semibold uppercase tracking-[0.05em] text-muted px-4 py-3">Тип</th>
                    <th className="text-left text-xs font-semibold uppercase tracking-[0.05em] text-muted px-4 py-3">Владелец</th>
                    <th className="text-left text-xs font-semibold uppercase tracking-[0.05em] text-muted px-4 py-3">Подрядчики</th>
                    <th className="text-left text-xs font-semibold uppercase tracking-[0.05em] text-muted px-4 py-3">Статус</th>
                    <th className="text-left text-xs font-semibold uppercase tracking-[0.05em] text-muted px-4 py-3">Риск</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map(asset => (
                    <tr key={asset.id} className="border-b border-line hover:bg-brand-surface transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Shield size={14} className="text-muted shrink-0" />
                          <div>
                            <div className="text-ink font-medium">{asset.name}</div>
                            {asset.notes && <div className="text-muted text-xs mt-0.5">{asset.notes}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-xs border px-2 py-0.5 rounded-full ${typeColors[asset.type] || 'text-muted bg-brand-surface border-line'}`}>
                          {asset.type}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-ink">{asset.owner}</td>
                      <td className="px-4 py-4 text-muted">{asset.contractors || '—'}</td>
                      <td className="px-4 py-4"><StatusBadge status={asset.status} /></td>
                      <td className="px-4 py-4"><RiskBadge score={asset.riskScore} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add modal */}
          {showAdd && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
              <div className="bg-white border border-line rounded-2xl p-6 w-full max-w-md shadow-md">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-ink font-semibold">Добавить IP актив</h3>
                  <button onClick={() => setShowAdd(false)} className="text-muted hover:text-ink"><X size={18} /></button>
                </div>
                <div className="space-y-4">
                  {([
                    { label: 'Название актива', key: 'name', placeholder: 'ML Model v3' },
                    { label: 'Владелец', key: 'owner', placeholder: 'Компания или ФИО' },
                    { label: 'Подрядчики', key: 'contractors', placeholder: 'Если есть — укажите' },
                    { label: 'Примечание', key: 'notes', placeholder: 'Дополнительная информация' },
                  ] as const).map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label className="text-muted text-xs mb-1 block">{label}</label>
                      <input
                        className="w-full bg-white border border-line rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-brand-blue"
                        placeholder={placeholder}
                        value={newAsset[key]}
                        onChange={e => setNewAsset(a => ({ ...a, [key]: e.target.value }))}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-muted text-xs mb-1 block">Тип</label>
                    <select
                      className="w-full bg-white border border-line rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-brand-blue"
                      value={newAsset.type}
                      onChange={e => setNewAsset(a => ({ ...a, type: e.target.value }))}
                    >
                      {['Код', 'AI-модель', 'Дизайн', 'Датасет', 'Торговая марка', 'Патент'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowAdd(false)} className="flex-1 border border-line text-muted py-2.5 rounded-xl text-sm hover:bg-brand-surface transition-colors">Отмена</button>
                  <button onClick={addAsset} className="flex-1 bg-brand-blue hover:opacity-85 text-white py-2.5 rounded-xl text-sm font-medium transition-colors">Добавить</button>
                </div>
              </div>
            </div>
          )}
    </div>
  )
}
