import { CheckCircle, Circle, ArrowRight, FileText, Shield, Building2, TrendingUp, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import SaveBar from '../components/SaveBar'
import { useWorkspace } from '../lib/useWorkspace'
import { useLanguage } from '../context/LanguageContext'
import type { JourneyStep } from '../lib/types'

const stepIconsAndPaths = [
  { num: 1, icon: Search, path: '/scan' },
  { num: 2, icon: Shield, path: '/ip' },
  { num: 3, icon: FileText, path: '/contracts' },
  { num: 4, icon: Building2, path: '/hub' },
  { num: 5, icon: FileText, path: '/contracts' },
  { num: 6, icon: TrendingUp, path: '/investor' },
]

const statusCycle: JourneyStep['status'][] = ['pending', 'in-progress', 'done']

export default function ClientJourney() {
  const { t } = useLanguage()
  const { data, update, save, loading, dirty, saving, isAdmin } = useWorkspace()

  if (loading) return <div className="text-muted text-sm">{t.common.loading}</div>

  const statusConfig = {
    done: { label: t.clientJourney.statusLabels.done, cls: 'text-green-700 bg-green-50 border-green-200' },
    'in-progress': { label: t.clientJourney.statusLabels['in-progress'], cls: 'text-amber-700 bg-amber-50 border-amber-200' },
    pending: { label: t.clientJourney.statusLabels.pending, cls: 'text-muted bg-brand-surface border-line' },
  }

  const stepMeta = t.clientJourney.steps.map((meta, idx) => ({
    ...meta,
    num: stepIconsAndPaths[idx].num,
    icon: stepIconsAndPaths[idx].icon,
    path: stepIconsAndPaths[idx].path,
  }))

  const steps = stepMeta.map(meta => ({
    ...meta,
    status: data.journeySteps.find(s => s.num === meta.num)?.status || 'pending',
  }))
  const doneCount = steps.filter(s => s.status === 'done').length
  const inProgressCount = steps.filter(s => s.status === 'in-progress').length

  return (
    <div className="space-y-6">
      <SaveBar isAdmin={isAdmin} dirty={dirty} saving={saving} onSave={save} />

      <div className="flex items-center gap-6 p-4 bg-white border border-line rounded-xl shadow-sm">
        <div className="text-center">
          <div className="text-2xl font-mono font-semibold text-green-700">{doneCount}</div>
          <div className="text-muted text-xs">{t.clientJourney.completed}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-mono font-semibold text-amber-700">{inProgressCount}</div>
          <div className="text-muted text-xs">{t.clientJourney.inProgress}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-mono font-semibold text-muted">{steps.length - doneCount - inProgressCount}</div>
          <div className="text-muted text-xs">{t.clientJourney.pending}</div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted">{t.clientJourney.overallProgress}</span>
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
                <button
                  disabled={!isAdmin}
                  onClick={() => update(d => {
                    const entry = d.journeySteps.find(s => s.num === step.num)
                    if (entry) entry.status = statusCycle[(statusCycle.indexOf(entry.status) + 1) % statusCycle.length]
                  })}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 ${isAdmin ? 'hover:opacity-80 transition' : ''} ${
                    step.status === 'done' ? 'border-brand-green bg-green-50' :
                    step.status === 'in-progress' ? 'border-amber-400 bg-amber-50' :
                    'border-line bg-brand-surface'
                  }`}
                >
                  {step.status === 'done'
                    ? <CheckCircle size={18} className="text-green-600" />
                    : step.status === 'in-progress'
                    ? <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                    : <Circle size={18} className="text-muted" />}
                </button>
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
                      {t.common.open} <ArrowRight size={12} />
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
