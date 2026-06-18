import { FileText, Download, CheckCircle, AlertTriangle, Clock } from 'lucide-react'
import SaveBar from '../components/SaveBar'
import { useWorkspace } from '../lib/useWorkspace'
import { useLanguage } from '../context/LanguageContext'
import type { ContractTemplate } from '../lib/types'
import type { Dict } from '../i18n/types'

const typeColors: Record<string, string> = {
  Sales: 'text-blue-700 bg-blue-50 border-blue-200',
  Corporate: 'text-purple-700 bg-purple-50 border-purple-200',
  IP: 'text-green-700 bg-green-50 border-green-200',
  Finance: 'text-amber-700 bg-amber-50 border-amber-200',
}

const templateStatusCycle: ContractTemplate['status'][] = ['draft', 'review', 'ready']

function TemplateBadge({ status, t }: { status: string; t: Dict }) {
  if (status === 'ready') return <span className="text-green-700 bg-green-50 border border-green-200 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle size={10} /> {t.contractsHub.templateStatus.ready}</span>
  if (status === 'review') return <span className="text-amber-700 bg-amber-50 border border-amber-200 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><Clock size={10} /> {t.contractsHub.templateStatus.review}</span>
  return <span className="text-muted bg-brand-surface border border-line text-xs px-2 py-0.5 rounded-full">{t.contractsHub.templateStatus.draft}</span>
}

export default function ContractsHub() {
  const { data, update, save, loading, dirty, saving, isAdmin } = useWorkspace()
  const { t } = useLanguage()

  if (loading) return <div className="text-muted text-sm">{t.common.loading}</div>

  const { contractTemplates: templates, activeContracts } = data
  const readyCount = templates.filter(t => t.status === 'ready').length

  return (
    <div className="space-y-6">
      <SaveBar isAdmin={isAdmin} dirty={dirty} saving={saving} onSave={save} />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-line rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <div className="text-muted text-xs mb-1">{t.contractsHub.templatesReady}</div>
          <div className="text-2xl font-mono font-semibold text-brand-blue">{readyCount}/{templates.length}</div>
        </div>
        <div className="bg-white border border-line rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <div className="text-muted text-xs mb-1">{t.contractsHub.activeContracts}</div>
          <div className="text-2xl font-mono font-semibold text-brand-blue">{activeContracts.filter(c => c.status === 'active').length}</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <div className="text-muted text-xs mb-1">{t.contractsHub.needsAttention}</div>
          <div className="text-2xl font-mono font-semibold text-red-700">{activeContracts.filter(c => c.status === 'risk').length}</div>
        </div>
      </div>

      {/* Templates */}
      <div className="bg-white border border-line rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-line">
          <h2 className="text-ink font-semibold tracking-tightest">{t.contractsHub.templatesTitle}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-line">
          {templates.map(({ name, desc, type, status }, idx) => (
            <div key={name} className="bg-white p-5 hover:bg-brand-surface transition-colors">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-3">
                  <FileText size={16} className="text-muted mt-0.5 shrink-0" />
                  <div>
                    <div className="text-ink text-sm font-medium">{name}</div>
                    <div className="text-muted text-xs mt-0.5">{desc}</div>
                  </div>
                </div>
                {isAdmin ? (
                  <button
                    onClick={() => update(d => {
                      const cur = d.contractTemplates[idx].status
                      d.contractTemplates[idx].status = templateStatusCycle[(templateStatusCycle.indexOf(cur) + 1) % templateStatusCycle.length]
                    })}
                    className="hover:opacity-80 transition"
                  >
                    <TemplateBadge status={status} t={t} />
                  </button>
                ) : <TemplateBadge status={status} t={t} />}
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className={`text-xs border px-2 py-0.5 rounded-full ${typeColors[type] || 'text-muted bg-brand-surface border-line'}`}>{type}</span>
                <button className="flex items-center gap-1.5 text-brand-blue hover:opacity-85 text-xs transition-colors">
                  <Download size={12} /> {t.common.download}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Contracts */}
      <div className="bg-white border border-line rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-line">
          <h2 className="text-ink font-semibold tracking-tightest">{t.contractsHub.activeTitle}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line">
                {[t.contractsHub.colClient, t.contractsHub.colType, t.contractsHub.colSigned, t.contractsHub.colExpiry, t.contractsHub.colStatus].map(h => (
                  <th key={h} className="text-left text-xs font-semibold uppercase tracking-[0.05em] text-muted px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeContracts.map((c, idx) => (
                <tr key={c.client} className="border-b border-line hover:bg-brand-surface transition-colors">
                  <td className="px-5 py-3 text-ink font-medium">{c.client}</td>
                  <td className="px-5 py-3 text-muted">{c.type}</td>
                  <td className="px-5 py-3 text-muted font-mono text-xs">{c.signed}</td>
                  <td className="px-5 py-3 text-muted font-mono text-xs">{c.expiry}</td>
                  <td className="px-5 py-3">
                    {isAdmin ? (
                      <button
                        onClick={() => update(d => { d.activeContracts[idx].status = d.activeContracts[idx].status === 'active' ? 'risk' : 'active' })}
                        className="hover:opacity-80 transition"
                      >
                        {c.status === 'active'
                          ? <span className="text-green-700 text-xs flex items-center gap-1"><CheckCircle size={12} /> {t.contractsHub.contractActive}</span>
                          : <span className="text-red-700 text-xs flex items-center gap-1"><AlertTriangle size={12} /> {t.contractsHub.contractRisk}</span>}
                      </button>
                    ) : (
                      c.status === 'active'
                        ? <span className="text-green-700 text-xs flex items-center gap-1"><CheckCircle size={12} /> {t.contractsHub.contractActive}</span>
                        : <span className="text-red-700 text-xs flex items-center gap-1"><AlertTriangle size={12} /> {t.contractsHub.contractRisk}</span>
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
