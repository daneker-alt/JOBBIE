import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const steps = [
  { id: 1, title: 'Компания', subtitle: 'Основная информация' },
  { id: 2, title: 'IP', subtitle: 'Интеллектуальная собственность' },
  { id: 3, title: 'Данные', subtitle: 'Персональные данные и AI' },
  { id: 4, title: 'Договоры', subtitle: 'Продажи и сервисы' },
  { id: 5, title: 'Инвестиции', subtitle: 'Готовность к DD' },
]

const stages = ['idea', 'mvp', 'pilot', 'hub', 'sales', 'invest']
const stageLabels: Record<string, string> = {
  idea: 'Идея',
  mvp: 'MVP',
  pilot: 'Пилот',
  hub: 'Astana Hub',
  sales: 'Продажи',
  invest: 'Инвестиции',
}

type FormData = {
  companyName: string
  stage: string
  industry: string
  ipFounders: string
  ipContractors: string
  openSource: string
  personalData: string
  sensitiveData: string
  dataConsent: string
  saasTerms: string
  slaExists: string
  msaSigned: string
  capTable: string
  dataRoomReady: string
  safeExists: string
}

const initialForm: FormData = {
  companyName: '',
  stage: '',
  industry: '',
  ipFounders: '',
  ipContractors: '',
  openSource: '',
  personalData: '',
  sensitiveData: '',
  dataConsent: '',
  saasTerms: '',
  slaExists: '',
  msaSigned: '',
  capTable: '',
  dataRoomReady: '',
  safeExists: '',
}

function RadioGroup({ label, name, value, onChange }: { label: string; name: keyof FormData; value: string; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="mb-5">
      <p className="text-slate-300 text-sm mb-2">{label}</p>
      <div className="flex gap-3">
        {['Да', 'Нет', 'Частично'].map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(name, opt)}
            className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
              value === opt
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                : 'border-slate-700 text-slate-400 hover:border-slate-500'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

function calcRisk(form: FormData) {
  let ip = 50
  if (form.ipFounders === 'Да') ip += 25
  if (form.ipFounders === 'Нет') ip -= 20
  if (form.ipContractors === 'Да') ip += 15
  if (form.openSource === 'Да') ip -= 10

  let data = 60
  if (form.personalData === 'Нет') data += 20
  if (form.sensitiveData === 'Нет') data += 15
  if (form.dataConsent === 'Да') data += 15
  if (form.dataConsent === 'Нет') data -= 20

  let sales = 50
  if (form.saasTerms === 'Да') sales += 20
  if (form.slaExists === 'Да') sales += 15
  if (form.msaSigned === 'Да') sales += 15

  let invest = 30
  if (form.capTable === 'Да') invest += 30
  if (form.dataRoomReady === 'Да') invest += 25
  if (form.safeExists === 'Да') invest += 15

  return {
    ip: Math.min(100, Math.max(0, ip)),
    data: Math.min(100, Math.max(0, data)),
    sales: Math.min(100, Math.max(0, sales)),
    invest: Math.min(100, Math.max(0, invest)),
    overall: Math.round((ip + data + sales + invest) / 4),
  }
}

export default function LegalScan() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(initialForm)
  const [done, setDone] = useState(false)

  const update = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }))

  const risk = calcRisk(form)

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Legal Scan" />
        <main className="flex-1 p-6">
          {!done ? (
            <div className="max-w-2xl mx-auto">
              {/* Progress */}
              <div className="flex items-center gap-2 mb-8">
                {steps.map(s => (
                  <div key={s.id} className="flex items-center gap-2 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                      s.id < step ? 'bg-indigo-600 text-white' : s.id === step ? 'bg-indigo-600/30 border border-indigo-500 text-indigo-400' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {s.id < step ? <CheckCircle size={14} /> : s.id}
                    </div>
                    {s.id < steps.length && <div className={`flex-1 h-0.5 ${s.id < step ? 'bg-indigo-600' : 'bg-slate-800'}`} />}
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <h2 className="text-white font-bold text-xl mb-1">{steps[step - 1].title}</h2>
                <p className="text-slate-400 text-sm mb-6">{steps[step - 1].subtitle}</p>

                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-slate-300 text-sm mb-2 block">Название компании</label>
                      <input
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                        placeholder="AI Health Assistant Ltd"
                        value={form.companyName}
                        onChange={e => update('companyName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm mb-2 block">Стадия</label>
                      <div className="grid grid-cols-3 gap-2">
                        {stages.map(s => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => update('stage', s)}
                            className={`py-2 px-3 rounded-lg text-sm border transition-colors ${
                              form.stage === s ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'border-slate-700 text-slate-400 hover:border-slate-500'
                            }`}
                          >
                            {stageLabels[s]}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm mb-2 block">Индустрия</label>
                      <select
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                        value={form.industry}
                        onChange={e => update('industry', e.target.value)}
                      >
                        <option value="">Выберите...</option>
                        <option>HealthTech / MedTech</option>
                        <option>FinTech</option>
                        <option>EdTech</option>
                        <option>AgriTech</option>
                        <option>B2B SaaS</option>
                        <option>AI / ML Platform</option>
                        <option>Другое</option>
                      </select>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <RadioGroup label="Все основатели подписали IP assignment?" name="ipFounders" value={form.ipFounders} onChange={update} />
                    <RadioGroup label="Все подрядчики передали права на результаты работ?" name="ipContractors" value={form.ipContractors} onChange={update} />
                    <RadioGroup label="Используете open source с ограничительными лицензиями?" name="openSource" value={form.openSource} onChange={update} />
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <RadioGroup label="Обрабатываете персональные данные пользователей?" name="personalData" value={form.personalData} onChange={update} />
                    <RadioGroup label="Есть чувствительные данные (health, biometrics, fintech)?" name="sensitiveData" value={form.sensitiveData} onChange={update} />
                    <RadioGroup label="Есть действующий consent и privacy policy?" name="dataConsent" value={form.dataConsent} onChange={update} />
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <RadioGroup label="Есть актуальные SaaS Terms / Terms of Service?" name="saasTerms" value={form.saasTerms} onChange={update} />
                    <RadioGroup label="Есть подписанные SLA с клиентами?" name="slaExists" value={form.slaExists} onChange={update} />
                    <RadioGroup label="Есть подписанные MSA с ключевыми клиентами?" name="msaSigned" value={form.msaSigned} onChange={update} />
                  </div>
                )}

                {step === 5 && (
                  <div>
                    <RadioGroup label="Cap table чистый и оформлен документально?" name="capTable" value={form.capTable} onChange={update} />
                    <RadioGroup label="Есть собранный data room для инвестора?" name="dataRoomReady" value={form.dataRoomReady} onChange={update} />
                    <RadioGroup label="Есть SAFE или SHA?" name="safeExists" value={form.safeExists} onChange={update} />
                  </div>
                )}

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700">
                  <button
                    onClick={() => setStep(s => Math.max(1, s - 1))}
                    disabled={step === 1}
                    className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-slate-200 disabled:opacity-40 transition-colors"
                  >
                    <ArrowLeft size={16} /> Назад
                  </button>
                  {step < steps.length ? (
                    <button
                      onClick={() => setStep(s => s + 1)}
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
                    >
                      Далее <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setDone(true)}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
                    >
                      <CheckCircle size={16} /> Получить карту рисков
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-indigo-600/20 border border-indigo-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-indigo-400" />
                </div>
                <h2 className="text-white text-2xl font-bold mb-2">Legal Scan завершён</h2>
                <p className="text-slate-400">{form.companyName || 'Ваша компания'} · Стадия: {stageLabels[form.stage] || 'не указана'}</p>
              </div>

              {/* Overall */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 text-center">
                <div className="text-slate-400 text-sm mb-1">Общий риск-скор</div>
                <div className={`text-6xl font-bold mb-2 ${risk.overall >= 75 ? 'text-green-400' : risk.overall >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {risk.overall}<span className="text-2xl text-slate-500">/100</span>
                </div>
                <div className="text-slate-400 text-sm">
                  {risk.overall >= 75 ? 'Низкий риск — хорошая правовая база' : risk.overall >= 50 ? 'Средний риск — требуется работа' : 'Высокий риск — необходима срочная работа'}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  { label: 'IP', score: risk.ip, desc: risk.ip < 60 ? 'Требуется IP assignment для всех участников' : 'IP структура в порядке' },
                  { label: 'Data & Privacy', score: risk.data, desc: risk.data < 60 ? 'Обновите consent и privacy policy' : 'Privacy compliance на уровне' },
                  { label: 'Contracts', score: risk.sales, desc: risk.sales < 60 ? 'Нужны SaaS Terms, SLA и MSA' : 'Договорная база в норме' },
                  { label: 'Investor Ready', score: risk.invest, desc: risk.invest < 60 ? 'Соберите cap table и data room' : 'Готовность к DD хорошая' },
                ].map(({ label, score, desc }) => {
                  const color = score >= 75 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'
                  const bg = score >= 75 ? 'bg-green-500/10 border-green-500/20' : score >= 50 ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-red-500/10 border-red-500/20'
                  return (
                    <div key={label} className={`border rounded-xl p-5 ${bg}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300 font-semibold">{label}</span>
                        <span className={`font-bold ${color}`}>{score}/100</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5 mb-3">
                        <div className={`h-1.5 rounded-full ${score >= 75 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${score}%` }} />
                      </div>
                      <div className="flex items-start gap-2">
                        {score < 60 ? <AlertTriangle size={14} className="text-yellow-400 mt-0.5 shrink-0" /> : <CheckCircle size={14} className="text-green-400 mt-0.5 shrink-0" />}
                        <p className="text-slate-400 text-xs">{desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-6 text-center">
                <p className="text-slate-300 mb-4">Получите полный legal roadmap и backlog задач в формате платформы</p>
                <button
                  onClick={() => { setDone(false); setStep(1); setForm(initialForm) }}
                  className="text-indigo-400 hover:text-indigo-300 text-sm underline mr-6 transition-colors"
                >
                  Пройти заново
                </button>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
                  Заказать полный Legal Scan
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
