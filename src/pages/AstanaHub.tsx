import { AlertTriangle, Building2, Calendar, TrendingUp } from 'lucide-react'
import SaveBar from '../components/SaveBar'
import Checklist from '../components/Checklist'
import { useWorkspace } from '../lib/useWorkspace'
import { useLanguage } from '../context/LanguageContext'

const calendarEvents = [
  { date: '20 июня 2025', title: 'Квартальный отчёт Q2', urgent: true },
  { date: '1 июля 2025', title: '90/10 Revenue Review Q2', urgent: true },
  { date: '15 июля 2025', title: 'Аудит состава команды', urgent: false },
  { date: '1 октября 2025', title: 'Квартальный отчёт Q3', urgent: false },
  { date: '15 декабря 2025', title: 'Годовой compliance review', urgent: false },
]

export default function AstanaHub() {
  const { data, update, save, loading, dirty, saving, isAdmin } = useWorkspace()
  const { t } = useLanguage()

  if (loading) return <div className="text-muted text-sm">{t.common.loading}</div>

  const { hubEligibility, hubRequiredDocs, hubRevenue } = data
  const eligScore = hubEligibility.filter(i => i.done).length
  const docScore = hubRequiredDocs.filter(d => d.done).length
  const avgIct = Math.round(hubRevenue.reduce((s, d) => s + d.ict, 0) / hubRevenue.length)

  return (
    <div className="space-y-6">
      <SaveBar isAdmin={isAdmin} dirty={dirty} saving={saving} onSave={save} />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`border rounded-xl p-4 shadow-sm hover:shadow-md transition ${eligScore === hubEligibility.length ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
          <div className="text-muted text-xs mb-1">{t.astanaHub.eligibility}</div>
          <div className={`text-2xl font-mono font-semibold ${eligScore === hubEligibility.length ? 'text-green-700' : 'text-amber-700'}`}>
            {eligScore}/{hubEligibility.length}
          </div>
          <div className="text-muted text-xs mt-1">{t.astanaHub.criteriaDone}</div>
        </div>
        <div className={`border rounded-xl p-4 shadow-sm hover:shadow-md transition ${avgIct >= 90 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="text-muted text-xs mb-1">{t.astanaHub.ictRevenue}</div>
          <div className={`text-2xl font-mono font-semibold ${avgIct >= 90 ? 'text-green-700' : 'text-red-700'}`}>{avgIct}%</div>
          <div className={`text-xs mt-1 ${avgIct >= 90 ? 'text-green-700/70' : 'text-red-700/70'}`}>
            {avgIct >= 90 ? t.astanaHub.requirementMet : t.astanaHub.belowThreshold}
          </div>
        </div>
        <div className="bg-white border border-line rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <div className="text-muted text-xs mb-1">{t.astanaHub.documents}</div>
          <div className="text-2xl font-mono font-semibold text-brand-blue">{docScore}/{hubRequiredDocs.length}</div>
          <div className="text-muted text-xs mt-1">{t.astanaHub.ready}</div>
        </div>
      </div>

      {avgIct < 90 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle size={18} className="text-red-600 mt-0.5 shrink-0" />
          <div>
            <div className="text-red-700 font-semibold text-sm mb-1">{t.astanaHub.ruleBroken}</div>
            <div className="text-red-700/80 text-xs">
              Средняя ИКТ-выручка за период составляет <span className="font-mono">{avgIct}%</span>, что ниже обязательного порога 90%.
              Необходимо пересмотреть структуру выручки или контрактную базу до квартального отчёта.
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Eligibility */}
        <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
          <h2 className="text-ink font-semibold mb-4 flex items-center gap-2 tracking-tightest">
            <Building2 size={16} className="text-brand-blue" /> {t.astanaHub.eligibilityTitle}
          </h2>
          <Checklist
            items={hubEligibility}
            isAdmin={isAdmin}
            onToggle={idx => update(d => { d.hubEligibility[idx].done = !d.hubEligibility[idx].done })}
          />
        </div>

        {/* Revenue Tracker */}
        <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
          <h2 className="text-ink font-semibold mb-4 flex items-center gap-2 tracking-tightest">
            <TrendingUp size={16} className="text-brand-blue" /> {t.astanaHub.revenueTrackTitle}
          </h2>
          <div className="space-y-3">
            {hubRevenue.map(({ month, ict, other }, idx) => (
              <div key={month}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted">{month}</span>
                  <span className={`font-mono ${ict >= 90 ? 'text-green-700' : 'text-red-700'}`}>{ict}% ИКТ</span>
                </div>
                {isAdmin ? (
                  <input
                    type="range" min={0} max={100} value={ict}
                    onChange={e => update(d => {
                      const v = Number(e.target.value)
                      d.hubRevenue[idx].ict = v
                      d.hubRevenue[idx].other = 100 - v
                    })}
                    className="w-full accent-brand-blue"
                  />
                ) : (
                  <div className="w-full bg-line rounded-full h-2 flex overflow-hidden">
                    <div className={`h-2 ${ict >= 90 ? 'bg-brand-green' : 'bg-red-500'}`} style={{ width: `${ict}%` }} />
                    <div className="h-2 bg-line" style={{ width: `${other}%` }} />
                  </div>
                )}
                <div className="flex justify-between text-xs mt-0.5">
                  <span className="text-muted">{t.astanaHub.threshold}</span>
                  <span className="text-muted font-mono">{other}% {t.astanaHub.other}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Calendar */}
        <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
          <h2 className="text-ink font-semibold mb-4 flex items-center gap-2 tracking-tightest">
            <Calendar size={16} className="text-brand-blue" /> {t.astanaHub.calendarTitle}
          </h2>
          <div className="space-y-3">
            {calendarEvents.map(({ date, title, urgent }) => (
              <div key={date} className={`rounded-xl p-3 border ${urgent ? 'bg-red-50 border-red-200' : 'bg-brand-surface border-line'}`}>
                <div className="text-muted text-xs mb-0.5 font-mono">{date}</div>
                <div className={`text-sm font-medium ${urgent ? 'text-red-700' : 'text-ink'}`}>{title}</div>
                {urgent && <div className="text-red-700/70 text-xs mt-0.5">{t.astanaHub.urgent}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Required Docs */}
      <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
        <h2 className="text-ink font-semibold mb-4 tracking-tightest">{t.astanaHub.requiredDocsTitle}</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <Checklist
            items={hubRequiredDocs}
            isAdmin={isAdmin}
            onToggle={idx => update(d => { d.hubRequiredDocs[idx].done = !d.hubRequiredDocs[idx].done })}
            dense
          />
        </div>
      </div>
    </div>
  )
}
