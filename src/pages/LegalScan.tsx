import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const stages = ['idea', 'mvp', 'pilot', 'hub', 'sales', 'invest']

type FormData = {
  companyName: string; stage: string; industry: string
  ipFounders: string; ipContractors: string; openSource: string
  personalData: string; sensitiveData: string; dataConsent: string
  saasTerms: string; slaExists: string; msaSigned: string
  capTable: string; dataRoomReady: string; safeExists: string
}

const initialForm: FormData = {
  companyName: '', stage: '', industry: '',
  ipFounders: '', ipContractors: '', openSource: '',
  personalData: '', sensitiveData: '', dataConsent: '',
  saasTerms: '', slaExists: '', msaSigned: '',
  capTable: '', dataRoomReady: '', safeExists: '',
}

const RADIO_VALUES = ['Да', 'Нет', 'Частично']

function RadioGroup({ label, name, value, onChange, optionLabels }: { label: string; name: keyof FormData; value: string; onChange: (k: keyof FormData, v: string) => void; optionLabels: string[] }) {
  return (
    <div className="mb-5">
      <p className="text-ink text-sm mb-2">{label}</p>
      <div className="flex gap-3">
        {RADIO_VALUES.map((opt, i) => (
          <button key={opt} type="button" onClick={() => onChange(name, opt)}
            className={`px-4 py-2 rounded-lg text-sm border transition-colors ${value === opt ? 'bg-brand-blue text-white border-brand-blue' : 'border-line text-muted hover:bg-brand-surface'}`}>
            {optionLabels[i]}
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
  const { t } = useLanguage()
  const steps = t.legalScan.steps.map((s, i) => ({ id: i + 1, title: s.title, subtitle: s.subtitle }))
  const stageLabels = t.legalScan.stageLabels
  const optionLabels = [t.common.yes, t.common.no, t.common.partial]
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(initialForm)
  const [done, setDone] = useState(false)
  const update = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }))
  const risk = calcRisk(form)

  if (done) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-surface border border-line rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={28} className="text-brand-green" />
          </div>
          <h2 className="text-brand-blue text-2xl font-semibold mb-2 tracking-tightest">{t.legalScan.resultTitle}</h2>
          <p className="text-muted">{form.companyName || t.legalScan.companyFallback} · {t.legalScan.stageLabel}: {stageLabels[form.stage] || t.legalScan.stageUnknown}</p>
        </div>

        <div className="bg-white border border-line rounded-2xl p-6 mb-6 text-center shadow-sm">
          <div className="text-muted text-sm mb-1">{t.legalScan.overallScore}</div>
          <div className={`text-6xl font-mono font-semibold mb-2 ${risk.overall >= 75 ? 'text-green-700' : risk.overall >= 50 ? 'text-amber-700' : 'text-red-700'}`}>
            {risk.overall}<span className="text-2xl text-muted">/100</span>
          </div>
          <div className="text-muted text-sm">
            {risk.overall >= 75 ? t.legalScan.riskLow : risk.overall >= 50 ? t.legalScan.riskMed : t.legalScan.riskHigh}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {[
            { label: t.legalScan.categories[0].label, score: risk.ip, desc: risk.ip < 60 ? t.legalScan.categories[0].lowNote : t.legalScan.categories[0].okNote },
            { label: t.legalScan.categories[1].label, score: risk.data, desc: risk.data < 60 ? t.legalScan.categories[1].lowNote : t.legalScan.categories[1].okNote },
            { label: t.legalScan.categories[2].label, score: risk.sales, desc: risk.sales < 60 ? t.legalScan.categories[2].lowNote : t.legalScan.categories[2].okNote },
            { label: t.legalScan.categories[3].label, score: risk.invest, desc: risk.invest < 60 ? t.legalScan.categories[3].lowNote : t.legalScan.categories[3].okNote },
          ].map(({ label, score, desc }) => {
            const color = score >= 75 ? 'text-green-700' : score >= 50 ? 'text-amber-700' : 'text-red-700'
            const fill = score >= 75 ? 'bg-brand-green' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'
            return (
              <div key={label} className="bg-white border border-line rounded-xl p-5 shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-ink font-semibold">{label}</span>
                  <span className={`font-mono font-semibold ${color}`}>{score}/100</span>
                </div>
                <div className="w-full bg-line rounded-full h-1.5 mb-3">
                  <div className={`h-1.5 rounded-full ${fill}`} style={{ width: `${score}%` }} />
                </div>
                <div className="flex items-start gap-2">
                  {score < 60 ? <AlertTriangle size={14} className="text-amber-600 mt-0.5 shrink-0" /> : <CheckCircle size={14} className="text-green-600 mt-0.5 shrink-0" />}
                  <p className="text-muted text-xs">{desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-brand-surface border border-line rounded-2xl p-6 text-center">
          <p className="text-ink mb-4">{t.legalScan.ctaText}</p>
          <button onClick={() => { setDone(false); setStep(1); setForm(initialForm) }}
            className="text-brand-blue hover:opacity-85 text-sm underline mr-6 transition-colors">
            {t.legalScan.retake}
          </button>
          <button className="bg-brand-blue hover:opacity-85 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
            {t.legalScan.orderFull}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        {steps.map(s => (
          <div key={s.id} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono font-semibold shrink-0 transition-colors ${s.id < step ? 'bg-brand-blue text-white' : s.id === step ? 'bg-brand-surface border border-brand-blue text-brand-blue' : 'bg-brand-surface text-muted'}`}>
              {s.id < step ? <CheckCircle size={14} /> : s.id}
            </div>
            {s.id < steps.length && <div className={`flex-1 h-0.5 ${s.id < step ? 'bg-brand-blue' : 'bg-line'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white border border-line rounded-2xl p-8 shadow-sm">
        <h2 className="text-ink font-semibold text-xl mb-1 tracking-tightest">{steps[step - 1].title}</h2>
        <p className="text-muted text-sm mb-6">{steps[step - 1].subtitle}</p>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-ink text-sm mb-2 block">{t.legalScan.companyName}</label>
              <input className="w-full bg-white border border-line rounded-lg px-4 py-2.5 text-ink text-sm focus:outline-none focus:border-brand-blue"
                placeholder={t.legalScan.companyPlaceholder} value={form.companyName} onChange={e => update('companyName', e.target.value)} />
            </div>
            <div>
              <label className="text-ink text-sm mb-2 block">{t.legalScan.stage}</label>
              <div className="grid grid-cols-3 gap-2">
                {stages.map(s => (
                  <button key={s} type="button" onClick={() => update('stage', s)}
                    className={`py-2 px-3 rounded-lg text-sm border transition-colors ${form.stage === s ? 'bg-brand-blue text-white border-brand-blue' : 'border-line text-muted hover:bg-brand-surface'}`}>
                    {stageLabels[s]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-ink text-sm mb-2 block">{t.legalScan.industry}</label>
              <select className="w-full bg-white border border-line rounded-lg px-4 py-2.5 text-ink text-sm focus:outline-none focus:border-brand-blue"
                value={form.industry} onChange={e => update('industry', e.target.value)}>
                <option value="">{t.legalScan.selectPlaceholder}</option>
                {t.legalScan.industries.map(ind => <option key={ind}>{ind}</option>)}
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <RadioGroup label={t.legalScan.questions.ipFounders} name="ipFounders" value={form.ipFounders} onChange={update} optionLabels={optionLabels} />
            <RadioGroup label={t.legalScan.questions.ipContractors} name="ipContractors" value={form.ipContractors} onChange={update} optionLabels={optionLabels} />
            <RadioGroup label={t.legalScan.questions.openSource} name="openSource" value={form.openSource} onChange={update} optionLabels={optionLabels} />
          </div>
        )}

        {step === 3 && (
          <div>
            <RadioGroup label={t.legalScan.questions.personalData} name="personalData" value={form.personalData} onChange={update} optionLabels={optionLabels} />
            <RadioGroup label={t.legalScan.questions.sensitiveData} name="sensitiveData" value={form.sensitiveData} onChange={update} optionLabels={optionLabels} />
            <RadioGroup label={t.legalScan.questions.dataConsent} name="dataConsent" value={form.dataConsent} onChange={update} optionLabels={optionLabels} />
          </div>
        )}

        {step === 4 && (
          <div>
            <RadioGroup label={t.legalScan.questions.saasTerms} name="saasTerms" value={form.saasTerms} onChange={update} optionLabels={optionLabels} />
            <RadioGroup label={t.legalScan.questions.slaExists} name="slaExists" value={form.slaExists} onChange={update} optionLabels={optionLabels} />
            <RadioGroup label={t.legalScan.questions.msaSigned} name="msaSigned" value={form.msaSigned} onChange={update} optionLabels={optionLabels} />
          </div>
        )}

        {step === 5 && (
          <div>
            <RadioGroup label={t.legalScan.questions.capTable} name="capTable" value={form.capTable} onChange={update} optionLabels={optionLabels} />
            <RadioGroup label={t.legalScan.questions.dataRoomReady} name="dataRoomReady" value={form.dataRoomReady} onChange={update} optionLabels={optionLabels} />
            <RadioGroup label={t.legalScan.questions.safeExists} name="safeExists" value={form.safeExists} onChange={update} optionLabels={optionLabels} />
          </div>
        )}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-line">
          <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}
            className="flex items-center gap-2 px-4 py-2 text-muted hover:text-ink disabled:opacity-40 transition-colors">
            <ArrowLeft size={16} /> {t.legalScan.back}
          </button>
          {step < steps.length ? (
            <button onClick={() => setStep(s => s + 1)}
              className="flex items-center gap-2 bg-brand-blue hover:opacity-85 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
              {t.legalScan.next} <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={() => setDone(true)}
              className="flex items-center gap-2 bg-brand-green hover:opacity-85 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
              <CheckCircle size={16} /> {t.legalScan.getMap}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
