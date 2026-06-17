import { CheckCircle, Circle, ArrowRight, FileText, Shield, Building2, TrendingUp, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

const steps = [
  {
    num: 1,
    stage: 'Idea',
    title: 'Legal Scan',
    desc: 'Анкета, карта рисков, legal roadmap. Понимаем что есть и что нужно.',
    icon: Search,
    path: '/scan',
    status: 'done',
    docs: ['Legal Scan анкета', 'Risk Map', 'Legal Roadmap', 'Backlog задач'],
  },
  {
    num: 2,
    stage: 'MVP',
    title: 'IP + Data',
    desc: 'IP assignment для основателей и подрядчиков. Privacy policy и consent.',
    icon: Shield,
    path: '/ip',
    status: 'in-progress',
    docs: ['IP Assignment (founders)', 'IP Assignment (contractors)', 'Privacy Policy', 'Data Consent Form'],
  },
  {
    num: 3,
    stage: 'Pilot',
    title: 'POC / SLA',
    desc: 'Договор на пилот. SLA с метриками. Защита оплаты и результата.',
    icon: FileText,
    path: '/contracts',
    status: 'pending',
    docs: ['POC Agreement', 'SLA Template', 'Acceptance Criteria', 'Invoice Template'],
  },
  {
    num: 4,
    stage: 'Hub',
    title: '90/10',
    desc: 'Eligibility check для Astana Hub. Структура выручки 90% ИКТ.',
    icon: Building2,
    path: '/hub',
    status: 'pending',
    docs: ['Eligibility Assessment', '90/10 Revenue Structure', 'Hub Application', 'Compliance Calendar'],
  },
  {
    num: 5,
    stage: 'Sales',
    title: 'Contracts',
    desc: 'MSA, SaaS Terms, SLA для масштабирования. Защита продукта и оплаты.',
    icon: FileText,
    path: '/contracts',
    status: 'pending',
    docs: ['Master Service Agreement', 'SaaS Terms of Service', 'SLA', 'NDA Package'],
  },
  {
    num: 6,
    stage: 'Invest',
    title: 'Data Room',
    desc: 'Cap table, SAFE/SHA, data room и DD checklist для инвестора.',
    icon: TrendingUp,
    path: '/investor',
    status: 'pending',
    docs: ['Cap Table', 'SAFE / SHA', 'Data Room Package', 'DD Answers'],
  },
]

const statusConfig = {
  done: { label: 'Завершён', cls: 'text-green-700 bg-green-50 border-green-200' },
  'in-progress': { label: 'В работе', cls: 'text-amber-700 bg-amber-50 border-amber-200' },
  pending: { label: 'Ожидает', cls: 'text-muted bg-brand-surface border-line' },
}

export default function ClientJourney() {
  const doneCount = steps.filter(s => s.status === 'done').length
  const inProgressCount = steps.filter(s => s.status === 'in-progress').length

  return (
    <div>
      <div className="flex items-center gap-6 mb-8 p-4 bg-white border border-line rounded-xl shadow-sm">
        <div className="text-center">
          <div className="text-2xl font-mono font-semibold text-green-700">{doneCount}</div>
          <div className="text-muted text-xs">Завершено</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-mono font-semibold text-amber-700">{inProgressCount}</div>
          <div className="text-muted text-xs">В работе</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-mono font-semibold text-muted">{steps.length - doneCount - inProgressCount}</div>
          <div className="text-muted text-xs">Ожидает</div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted">Общий прогресс</span>
            <span className="text-brand-blue font-mono">{Math.round(((doneCount + inProgressCount * 0.5) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-line rounded-full h-2">
            <div className="bg-brand-blue h-2 rounded-full" style={{ width: `${Math.round(((doneCount + inProgressCount * 0.5) / steps.length) * 100)}%` }} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, idx) => {
          const Icon = step.icon
          const conf = statusConfig[step.status as keyof typeof statusConfig]
          const isLast = idx === steps.length - 1
          return (
            <div key={step.num} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  step.status === 'done' ? 'border-brand-green bg-green-50' :
                  step.status === 'in-progress' ? 'border-amber-400 bg-amber-50' :
                  'border-line bg-brand-surface'
                }`}>
                  {step.status === 'done'
                    ? <CheckCircle size={18} className="text-green-600" />
                    : step.status === 'in-progress'
                    ? <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                    : <Circle size={18} className="text-muted" />}
                </div>
                {!isLast && <div className="w-0.5 h-full bg-line mt-2" />}
              </div>

              <div className={`flex-1 mb-4 bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition ${
                step.status === 'done' ? 'border-green-200' :
                step.status === 'in-progress' ? 'border-amber-200' :
                'border-line'
              }`}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      step.status === 'done' ? 'bg-green-50' :
                      step.status === 'in-progress' ? 'bg-amber-50' :
                      'bg-brand-surface'
                    }`}>
                      <Icon size={16} className={
                        step.status === 'done' ? 'text-green-600' :
                        step.status === 'in-progress' ? 'text-amber-600' :
                        'text-muted'
                      } />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-muted text-xs font-mono">{step.num}. {step.stage}</span>
                      </div>
                      <h3 className="text-ink font-semibold">{step.title}</h3>
                      <p className="text-muted text-sm mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs border px-2.5 py-1 rounded-full ${conf.cls}`}>{conf.label}</span>
                    <Link
                      to={step.path}
                      className="flex items-center gap-1 text-brand-blue hover:opacity-85 text-xs transition-colors"
                    >
                      Открыть <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {step.docs.map(doc => (
                    <div key={doc} className="flex items-center gap-1.5 bg-brand-surface rounded-lg px-2.5 py-1.5">
                      <FileText size={11} className="text-muted shrink-0" />
                      <span className="text-muted text-xs truncate">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
