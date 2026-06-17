import { CheckCircle, AlertTriangle, Database, Shield } from 'lucide-react'

const privacyItems = [
  { id: 1, title: 'Privacy Policy опубликована', desc: 'Политика конфиденциальности доступна на сайте и в приложении', done: true },
  { id: 2, title: 'Согласие на обработку данных', desc: 'Пользователь явно даёт согласие перед обработкой персональных данных', done: true },
  { id: 3, title: 'Health data consent', desc: 'Отдельное согласие на обработку медицинских данных (требует ст. 8 ЗРК)', done: false },
  { id: 4, title: 'Локализация данных', desc: 'Персональные данные граждан РК хранятся на серверах в Казахстане', done: false },
  { id: 5, title: 'Реестр оператора персональных данных', desc: 'Компания зарегистрирована в реестре операторов ПД МЮ РК', done: false },
  { id: 6, title: 'Data retention policy', desc: 'Определены сроки хранения и удаления персональных данных', done: true },
  { id: 7, title: 'Breach notification процедура', desc: 'Есть план действий при утечке данных', done: false },
  { id: 8, title: 'DPA с подрядчиками', desc: 'Data Processing Agreement подписан с облачными провайдерами', done: true },
]

const datasets = [
  { name: 'User Health Profiles', size: '12,400 записей', sensitivity: 'high', consent: 'Да', location: 'KZ (AWS ap-southeast-1)', status: 'risk' },
  { name: 'Anonymized Diagnostics', size: '85,000 записей', sensitivity: 'medium', consent: 'Да', location: 'KZ (AWS ap-southeast-1)', status: 'ok' },
  { name: 'App Usage Analytics', size: '240,000 событий', sensitivity: 'low', consent: 'Да', location: 'KZ', status: 'ok' },
  { name: 'Medical Images (beta)', size: '3,200 файлов', sensitivity: 'high', consent: 'Частично', location: 'EU (AWS eu-west-1)', status: 'risk' },
]

const aiDisclaimers = [
  { title: 'AI не является медицинским советом', done: true },
  { title: 'Модель прошла внутреннее тестирование', done: true },
  { title: 'Версионирование AI-модели документировано', done: false },
  { title: 'Explainability / bias disclosure', done: false },
  { title: 'Human-in-the-loop для критических решений', done: true },
]

function SensitivityBadge({ level }: { level: string }) {
  const conf = {
    high: 'text-red-700 bg-red-50 border-red-200',
    medium: 'text-amber-700 bg-amber-50 border-amber-200',
    low: 'text-green-700 bg-green-50 border-green-200',
  }[level] || 'text-muted bg-brand-surface border-line'
  const labels: Record<string, string> = { high: 'Высокая', medium: 'Средняя', low: 'Низкая' }
  return <span className={`text-xs border px-2 py-0.5 rounded-full ${conf}`}>{labels[level]}</span>
}

export default function DataAI() {
  const done = privacyItems.filter(i => i.done).length
  const total = privacyItems.length
  const pct = Math.round((done / total) * 100)

  return (
    <div className="space-y-6">

          {/* Score */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-line rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <div className="text-muted text-xs mb-1">Privacy Compliance</div>
              <div className="text-2xl font-mono font-semibold text-brand-blue">{pct}%</div>
              <div className="w-full bg-line rounded-full h-1.5 mt-2">
                <div className="bg-brand-green h-1.5 rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </div>
            <div className="bg-white border border-line rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <div className="text-muted text-xs mb-1">Датасеты</div>
              <div className="text-2xl font-mono font-semibold text-brand-blue">{datasets.length}</div>
              <div className="text-red-700 text-xs mt-1"><span className="font-mono">{datasets.filter(d => d.status === 'risk').length}</span> риска</div>
            </div>
            <div className="bg-white border border-line rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <div className="text-muted text-xs mb-1">AI Disclaimers</div>
              <div className="text-2xl font-mono font-semibold text-brand-blue">{aiDisclaimers.filter(d => d.done).length}/{aiDisclaimers.length}</div>
              <div className="text-muted text-xs mt-1">готово</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Privacy Checklist */}
            <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
              <h2 className="text-ink font-semibold mb-4 flex items-center gap-2 tracking-tightest">
                <Shield size={16} className="text-brand-blue" /> Privacy Checklist
              </h2>
              <div className="space-y-3">
                {privacyItems.map(item => (
                  <div key={item.id} className="flex items-start gap-3">
                    {item.done
                      ? <CheckCircle size={16} className="text-green-600 mt-0.5 shrink-0" />
                      : <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />}
                    <div>
                      <div className="text-ink text-sm font-medium">{item.title}</div>
                      <div className="text-muted text-xs">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Disclaimers */}
            <div className="space-y-4">
              <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
                <h2 className="text-ink font-semibold mb-4 tracking-tightest">AI Disclaimers</h2>
                <div className="space-y-3">
                  {aiDisclaimers.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {item.done
                        ? <CheckCircle size={16} className="text-green-600 shrink-0" />
                        : <AlertTriangle size={16} className="text-amber-600 shrink-0" />}
                      <span className={`text-sm ${item.done ? 'text-ink' : 'text-muted'}`}>{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-amber-700 font-semibold text-sm mb-1">Требует внимания</div>
                    <ul className="text-amber-700/80 text-xs space-y-1">
                      <li>• Медицинские данные требуют согласия по отдельной форме (ст. 8 ЗРК о персональных данных)</li>
                      <li>• Medical Images хранятся вне Казахстана — риск нарушения требований локализации</li>
                      <li>• Необходима регистрация в реестре операторов ПД МЮ РК</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dataset Registry */}
          <div className="bg-white border border-line rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-line flex items-center gap-2">
              <Database size={16} className="text-brand-blue" />
              <h2 className="text-ink font-semibold tracking-tightest">Реестр датасетов</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line">
                    {['Датасет', 'Размер', 'Чувствительность', 'Согласие', 'Локация', 'Статус'].map(h => (
                      <th key={h} className="text-left text-xs font-semibold uppercase tracking-[0.05em] text-muted px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {datasets.map(ds => (
                    <tr key={ds.name} className="border-b border-line hover:bg-brand-surface transition-colors">
                      <td className="px-4 py-3 text-ink font-medium">{ds.name}</td>
                      <td className="px-4 py-3 text-muted font-mono text-xs">{ds.size}</td>
                      <td className="px-4 py-3"><SensitivityBadge level={ds.sensitivity} /></td>
                      <td className="px-4 py-3">
                        <span className={ds.consent === 'Да' ? 'text-green-700' : 'text-amber-700'}>{ds.consent}</span>
                      </td>
                      <td className="px-4 py-3 text-muted text-xs">{ds.location}</td>
                      <td className="px-4 py-3">
                        {ds.status === 'risk'
                          ? <span className="text-red-700 text-xs flex items-center gap-1"><AlertTriangle size={12} /> Риск</span>
                          : <span className="text-green-700 text-xs flex items-center gap-1"><CheckCircle size={12} /> OK</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

    </div>
  )
}
