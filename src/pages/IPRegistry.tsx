import { useState } from 'react'
import { Shield, AlertTriangle, CheckCircle, Plus, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

type IPAsset = {
  id: number
  name: string
  type: string
  owner: string
  status: 'assigned' | 'pending' | 'risk'
  contractors: string
  notes: string
}

const initialAssets: IPAsset[] = [
  { id: 1, name: 'Backend API (Node.js)', type: 'Код', owner: 'AI Health Assistant Ltd', status: 'assigned', contractors: '', notes: 'IP assignment подписан всеми основателями' },
  { id: 2, name: 'ML Health Model v2', type: 'AI-модель', owner: 'Алибек (основатель)', status: 'risk', contractors: '', notes: 'Не передано на компанию — нужен IP assignment' },
  { id: 3, name: 'UI/UX Design System', type: 'Дизайн', owner: 'AI Health Assistant Ltd', status: 'pending', contractors: 'Freelance Designer', notes: 'Ожидает подписания от подрядчика' },
  { id: 4, name: 'Training Dataset v1', type: 'Датасет', owner: 'AI Health Assistant Ltd', status: 'assigned', contractors: '', notes: 'Датасет собственный, лицензия оформлена' },
  { id: 5, name: 'Mobile App (React Native)', type: 'Код', owner: 'Диана (основатель)', status: 'risk', contractors: 'Dev Agency KZ', notes: 'Нет IP assignment от подрядчика и основателя' },
]

const typeColors: Record<string, string> = {
  'Код': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  'AI-модель': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  'Дизайн': 'text-pink-400 bg-pink-500/10 border-pink-500/20',
  'Датасет': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
}

function StatusBadge({ status }: { status: IPAsset['status'] }) {
  const conf = {
    assigned: { label: 'Оформлено', cls: 'text-green-400 bg-green-500/10 border-green-500/20', icon: <CheckCircle size={12} /> },
    pending: { label: 'В процессе', cls: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20', icon: <AlertTriangle size={12} /> },
    risk: { label: 'Риск', cls: 'text-red-400 bg-red-500/10 border-red-500/20', icon: <AlertTriangle size={12} /> },
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
  const [newAsset, setNewAsset] = useState({ name: '', type: 'Код', owner: '', contractors: '', notes: '' })

  const addAsset = () => {
    if (!newAsset.name) return
    setAssets(a => [...a, { ...newAsset, id: Date.now(), status: 'pending' }])
    setNewAsset({ name: '', type: 'Код', owner: '', contractors: '', notes: '' })
    setShowAdd(false)
  }

  const riskCount = assets.filter(a => a.status === 'risk').length
  const pendingCount = assets.filter(a => a.status === 'pending').length

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="IP Реестр" />
        <main className="flex-1 p-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-slate-400 text-xs mb-1">Всего активов</div>
              <div className="text-2xl font-bold text-white">{assets.length}</div>
            </div>
            <div className={`border rounded-xl p-4 ${riskCount > 0 ? 'bg-red-500/5 border-red-500/20' : 'bg-slate-900 border-slate-800'}`}>
              <div className="text-slate-400 text-xs mb-1">Риски</div>
              <div className={`text-2xl font-bold ${riskCount > 0 ? 'text-red-400' : 'text-green-400'}`}>{riskCount}</div>
            </div>
            <div className={`border rounded-xl p-4 ${pendingCount > 0 ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-slate-900 border-slate-800'}`}>
              <div className="text-slate-400 text-xs mb-1">В процессе</div>
              <div className={`text-2xl font-bold ${pendingCount > 0 ? 'text-yellow-400' : 'text-green-400'}`}>{pendingCount}</div>
            </div>
          </div>

          {riskCount > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertTriangle size={18} className="text-red-400 mt-0.5 shrink-0" />
              <div>
                <div className="text-red-300 font-semibold text-sm mb-1">Обнаружены IP-риски</div>
                <div className="text-red-400/80 text-xs">
                  {riskCount} актив(ов) с риском. Необходимо подписать IP assignment и передать права на компанию до следующего раунда или привлечения инвесторов.
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h2 className="text-slate-200 font-semibold">Активы IP</h2>
              <button
                onClick={() => setShowAdd(true)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Plus size={16} /> Добавить актив
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left text-slate-500 font-medium px-6 py-3">Актив</th>
                    <th className="text-left text-slate-500 font-medium px-4 py-3">Тип</th>
                    <th className="text-left text-slate-500 font-medium px-4 py-3">Владелец</th>
                    <th className="text-left text-slate-500 font-medium px-4 py-3">Подрядчики</th>
                    <th className="text-left text-slate-500 font-medium px-4 py-3">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map(asset => (
                    <tr key={asset.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Shield size={14} className="text-slate-500 shrink-0" />
                          <div>
                            <div className="text-slate-200 font-medium">{asset.name}</div>
                            {asset.notes && <div className="text-slate-500 text-xs mt-0.5">{asset.notes}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-xs border px-2 py-0.5 rounded-full ${typeColors[asset.type] || 'text-slate-400 bg-slate-700/30 border-slate-600/30'}`}>
                          {asset.type}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-300">{asset.owner}</td>
                      <td className="px-4 py-4 text-slate-400">{asset.contractors || '—'}</td>
                      <td className="px-4 py-4"><StatusBadge status={asset.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add modal */}
          {showAdd && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white font-semibold">Добавить IP актив</h3>
                  <button onClick={() => setShowAdd(false)} className="text-slate-500 hover:text-slate-300"><X size={18} /></button>
                </div>
                <div className="space-y-4">
                  {([
                    { label: 'Название актива', key: 'name', placeholder: 'ML Model v3' },
                    { label: 'Владелец', key: 'owner', placeholder: 'Компания или ФИО' },
                    { label: 'Подрядчики', key: 'contractors', placeholder: 'Если есть — укажите' },
                    { label: 'Примечание', key: 'notes', placeholder: 'Дополнительная информация' },
                  ] as const).map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label className="text-slate-400 text-xs mb-1 block">{label}</label>
                      <input
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                        placeholder={placeholder}
                        value={newAsset[key]}
                        onChange={e => setNewAsset(a => ({ ...a, [key]: e.target.value }))}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-slate-400 text-xs mb-1 block">Тип</label>
                    <select
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                      value={newAsset.type}
                      onChange={e => setNewAsset(a => ({ ...a, type: e.target.value }))}
                    >
                      {['Код', 'AI-модель', 'Дизайн', 'Датасет', 'Торговая марка', 'Патент'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowAdd(false)} className="flex-1 border border-slate-700 text-slate-400 py-2.5 rounded-xl text-sm hover:border-slate-500 transition-colors">Отмена</button>
                  <button onClick={addAsset} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-sm font-medium transition-colors">Добавить</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
