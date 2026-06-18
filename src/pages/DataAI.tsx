import { CheckCircle, AlertTriangle, Database, Shield } from 'lucide-react'
import SaveBar from '../components/SaveBar'
import Checklist from '../components/Checklist'
import { useWorkspace } from '../lib/useWorkspace'
import { useLanguage } from '../context/LanguageContext'

function SensitivityBadge({ level, labels }: { level: string; labels: Record<string, string> }) {
  const conf = {
    high: 'text-red-700 bg-red-50 border-red-200',
    medium: 'text-amber-700 bg-amber-50 border-amber-200',
    low: 'text-green-700 bg-green-50 border-green-200',
  }[level] || 'text-muted bg-brand-surface border-line'
  return <span className={`text-xs border px-2 py-0.5 rounded-full ${conf}`}>{labels[level]}</span>
}

export default function DataAI() {
  const { t } = useLanguage()
  const { data, update, save, loading, dirty, saving, isAdmin } = useWorkspace()

  if (loading) return <div className="text-muted text-sm">{t.common.loading}</div>

  const { privacyItems, datasets, aiDisclaimers } = data
  const done = privacyItems.filter(i => i.done).length
  const total = privacyItems.length
  const pct = Math.round((done / total) * 100)

  return (
    <div className="space-y-6">
      <SaveBar isAdmin={isAdmin} dirty={dirty} saving={saving} onSave={save} />

      {/* Score */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-line rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <div className="text-muted text-xs mb-1">{t.dataAI.privacyCompliance}</div>
          <div className="text-2xl font-mono font-semibold text-brand-blue">{pct}%</div>
          <div className="w-full bg-line rounded-full h-1.5 mt-2">
            <div className="bg-brand-green h-1.5 rounded-full" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="bg-white border border-line rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <div className="text-muted text-xs mb-1">{t.dataAI.datasets}</div>
          <div className="text-2xl font-mono font-semibold text-brand-blue">{datasets.length}</div>
          <div className="text-red-700 text-xs mt-1"><span className="font-mono">{datasets.filter(d => d.status === 'risk').length}</span> {t.dataAI.risksCount}</div>
        </div>
        <div className="bg-white border border-line rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <div className="text-muted text-xs mb-1">{t.dataAI.aiDisclaimers}</div>
          <div className="text-2xl font-mono font-semibold text-brand-blue">{aiDisclaimers.filter(d => d.done).length}/{aiDisclaimers.length}</div>
          <div className="text-muted text-xs mt-1">{t.dataAI.done}</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Privacy Checklist */}
        <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
          <h2 className="text-ink font-semibold mb-4 flex items-center gap-2 tracking-tightest">
            <Shield size={16} className="text-brand-blue" /> {t.dataAI.privacyChecklistTitle}
          </h2>
          <Checklist
            items={privacyItems}
            isAdmin={isAdmin}
            onToggle={idx => update(d => { d.privacyItems[idx].done = !d.privacyItems[idx].done })}
          />
        </div>

        {/* AI Disclaimers */}
        <div className="space-y-4">
          <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
            <h2 className="text-ink font-semibold mb-4 tracking-tightest">{t.dataAI.aiDisclaimersTitle}</h2>
            <Checklist
              items={aiDisclaimers}
              isAdmin={isAdmin}
              onToggle={idx => update(d => { d.aiDisclaimers[idx].done = !d.aiDisclaimers[idx].done })}
            />
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
              <div>
                <div className="text-amber-700 font-semibold text-sm mb-1">{t.dataAI.attentionTitle}</div>
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
          <h2 className="text-ink font-semibold tracking-tightest">{t.dataAI.datasetRegistryTitle}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line">
                {[t.dataAI.colDataset, t.dataAI.colSize, t.dataAI.colSensitivity, t.dataAI.colConsent, t.dataAI.colLocation, t.dataAI.colStatus].map(h => (
                  <th key={h} className="text-left text-xs font-semibold uppercase tracking-[0.05em] text-muted px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {datasets.map((ds, idx) => (
                <tr key={ds.name} className="border-b border-line hover:bg-brand-surface transition-colors">
                  <td className="px-4 py-3 text-ink font-medium">{ds.name}</td>
                  <td className="px-4 py-3 text-muted font-mono text-xs">{ds.size}</td>
                  <td className="px-4 py-3"><SensitivityBadge level={ds.sensitivity} labels={t.dataAI.sensitivity} /></td>
                  <td className="px-4 py-3">
                    <span className={ds.consent === 'Да' ? 'text-green-700' : 'text-amber-700'}>{ds.consent}</span>
                  </td>
                  <td className="px-4 py-3 text-muted text-xs">{ds.location}</td>
                  <td className="px-4 py-3">
                    {isAdmin ? (
                      <button
                        onClick={() => update(d => { d.datasets[idx].status = d.datasets[idx].status === 'risk' ? 'ok' : 'risk' })}
                        className="hover:opacity-80 transition"
                      >
                        {ds.status === 'risk'
                          ? <span className="text-red-700 text-xs flex items-center gap-1"><AlertTriangle size={12} /> {t.dataAI.riskBadge}</span>
                          : <span className="text-green-700 text-xs flex items-center gap-1"><CheckCircle size={12} /> {t.dataAI.okBadge}</span>}
                      </button>
                    ) : (
                      ds.status === 'risk'
                        ? <span className="text-red-700 text-xs flex items-center gap-1"><AlertTriangle size={12} /> {t.dataAI.riskBadge}</span>
                        : <span className="text-green-700 text-xs flex items-center gap-1"><CheckCircle size={12} /> {t.dataAI.okBadge}</span>
                    )}
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
