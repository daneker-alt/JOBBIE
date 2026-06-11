import { CheckCircle, AlertTriangle, TrendingUp, FileText, Users } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const capTable = [
  { name: 'Алибек Джаксыбеков', role: 'CEO / Co-founder', equity: 45, type: 'Common' },
  { name: 'Диана Сейткали', role: 'CTO / Co-founder', equity: 35, type: 'Common' },
  { name: 'SAFE — Angel Round', role: 'Investor', equity: 10, type: 'SAFE' },
  { name: 'Option Pool', role: 'Employees', equity: 10, type: 'Options' },
]

const ddCategories = [
  {
    name: 'Corporate',
    items: [
      { title: 'Устав и учредительные документы', done: true },
      { title: 'Корпоративная структура', done: true },
      { title: 'Протоколы собраний участников', done: false },
      { title: 'Акционерное соглашение (SHA)', done: false },
    ],
  },
  {
    name: 'IP & Technology',
    items: [
      { title: 'IP assignment — все основатели', done: false },
      { title: 'IP assignment — подрядчики', done: false },
      { title: 'Описание технологического стека', done: true },
      { title: 'Open source audit', done: true },
    ],
  },
  {
    name: 'Data & Privacy',
    items: [
      { title: 'Privacy Policy актуальная', done: true },
      { title: 'Реестр персональных данных', done: false },
      { title: 'Согласия пользователей', done: true },
      { title: 'Локализация данных', done: false },
    ],
  },
  {
    name: 'Contracts',
    items: [
      { title: 'Ключевые клиентские договоры', done: true },
      { title: 'Партнёрские соглашения', done: true },
      { title: 'Трудовые договоры / NDA', done: true },
      { title: 'SaaS Terms of Service', done: true },
    ],
  },
  {
    name: 'Finance',
    items: [
      { title: 'Финансовая отчётность (2 года)', done: false },
      { title: 'Cap table чистый', done: true },
      { title: 'SAFE / конвертируемые займы', done: true },
      { title: 'Tax compliance', done: true },
    ],
  },
]

const documents = [
  { name: 'SAFE Agreement — Angel Round', status: 'signed', date: 'мар 2025' },
  { name: 'SHA (Shareholders Agreement) — Draft', status: 'draft', date: '' },
  { name: 'Cap Table (Excel)', status: 'ready', date: 'май 2025' },
  { name: 'Financial Model', status: 'ready', date: 'май 2025' },
  { name: 'Pitch Deck', status: 'ready', date: 'июн 2025' },
  { name: 'Data Room Index', status: 'draft', date: '' },
]

function DocStatus({ status }: { status: string }) {
  if (status === 'signed') return <span className="text-green-400 text-xs border border-green-500/20 bg-green-500/10 px-2 py-0.5 rounded-full">Подписан</span>
  if (status === 'ready') return <span className="text-blue-400 text-xs border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 rounded-full">Готов</span>
  return <span className="text-slate-400 text-xs border border-slate-600/30 bg-slate-700/30 px-2 py-0.5 rounded-full">Черновик</span>
}

export default function InvestorRoom() {
  const totalItems = ddCategories.reduce((s, c) => s + c.items.length, 0)
  const doneItems = ddCategories.reduce((s, c) => s + c.items.filter(i => i.done).length, 0)
  const readinessScore = Math.round((doneItems / totalItems) * 100)

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Инвестиции" />
        <main className="flex-1 p-6 space-y-6">

          {/* Score */}
          <div className="grid grid-cols-3 gap-4">
            <div className={`border rounded-xl p-4 ${readinessScore >= 75 ? 'bg-green-500/5 border-green-500/20' : readinessScore >= 50 ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
              <div className="text-slate-400 text-xs mb-1">Готовность к DD</div>
              <div className={`text-3xl font-bold ${readinessScore >= 75 ? 'text-green-400' : readinessScore >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                {readinessScore}%
              </div>
              <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
                <div className={`h-1.5 rounded-full ${readinessScore >= 75 ? 'bg-green-500' : readinessScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${readinessScore}%` }} />
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-slate-400 text-xs mb-1">DD Checklist</div>
              <div className="text-2xl font-bold text-white">{doneItems}/{totalItems}</div>
              <div className="text-slate-500 text-xs mt-1">пунктов выполнено</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-slate-400 text-xs mb-1">Документов</div>
              <div className="text-2xl font-bold text-white">{documents.filter(d => d.status !== 'draft').length}/{documents.length}</div>
              <div className="text-slate-500 text-xs mt-1">готово / всего</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cap Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
                <Users size={16} className="text-indigo-400" /> Cap Table
              </h2>
              <div className="space-y-3">
                {capTable.map(({ name, role, equity, type }) => (
                  <div key={name}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <div className="text-slate-300 text-sm font-medium">{name}</div>
                        <div className="text-slate-500 text-xs">{role}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-indigo-400 font-bold">{equity}%</div>
                        <div className="text-slate-600 text-xs">{type}</div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${equity}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-700 mt-4 pt-3 flex justify-between text-sm">
                <span className="text-slate-400">Итого</span>
                <span className="text-white font-bold">100%</span>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
                <FileText size={16} className="text-indigo-400" /> Data Room
              </h2>
              <div className="space-y-3">
                {documents.map(({ name, status, date }) => (
                  <div key={name} className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-slate-300 text-sm">{name}</div>
                      {date && <div className="text-slate-500 text-xs">{date}</div>}
                    </div>
                    <DocStatus status={status} />
                  </div>
                ))}
              </div>
            </div>

            {/* DD Summary */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-indigo-400" /> DD Summary
              </h2>
              <div className="space-y-3">
                {ddCategories.map(({ name, items }) => {
                  const done = items.filter(i => i.done).length
                  const pct = Math.round((done / items.length) * 100)
                  const color = pct === 100 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  const textColor = pct === 100 ? 'text-green-400' : pct >= 50 ? 'text-yellow-400' : 'text-red-400'
                  return (
                    <div key={name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">{name}</span>
                        <span className={textColor}>{done}/{items.length}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* DD Checklist detail */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-slate-200 font-semibold mb-5">Детальный DD Checklist</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ddCategories.map(({ name, items }) => (
                <div key={name}>
                  <h3 className="text-indigo-400 text-sm font-semibold mb-3">{name}</h3>
                  <div className="space-y-2">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        {item.done
                          ? <CheckCircle size={13} className="text-green-400 mt-0.5 shrink-0" />
                          : <AlertTriangle size={13} className="text-yellow-400 mt-0.5 shrink-0" />}
                        <span className={`text-xs ${item.done ? 'text-slate-300' : 'text-slate-400'}`}>{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}
