import { useState, useEffect } from 'react'
import { FileText, Download, CheckCircle, AlertTriangle, Clock, Loader2, PenLine, ShieldCheck } from 'lucide-react'
import SaveBar from '../components/SaveBar'
import { useWorkspace } from '../lib/useWorkspace'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import type { ContractTemplate } from '../lib/types'
import type { Dict } from '../i18n/types'
import { downloadContract } from '../lib/contracts/generate'
import { signWithNcaLayer, sha256Hex } from '../lib/signature'
import { pushAudit } from '../lib/audit'

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

type SignStage = 'idle' | 'trying-ncalayer' | 'fallback' | 'done'

function SignModal({ clientName, onClose, onSigned }: { clientName: string; onClose: () => void; onSigned: (sig: { method: 'ncalayer' | 'simple'; signerName: string; signerCert?: string; hash: string; cms?: string }) => void }) {
  const [stage, setStage] = useState<SignStage>('trying-ncalayer')
  const [error, setError] = useState('')
  const [fullName, setFullName] = useState('')

  useEffect(() => {
    (async () => {
      const hash = await sha256Hex(`${clientName}:${Date.now()}`)
      try {
        const result = await signWithNcaLayer(btoa(hash))
        onSigned({ method: 'ncalayer', signerName: clientName, signerCert: result.signerCert, hash, cms: result.cms })
        setStage('done')
      } catch (e) {
        setError((e as Error).message)
        setStage('fallback')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function confirmSimple() {
    if (!fullName.trim()) return
    const hash = await sha256Hex(`${fullName}:${clientName}:${Date.now()}`)
    onSigned({ method: 'simple', signerName: fullName.trim(), hash })
    setStage('done')
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-[420px] shadow-xl" onClick={e => e.stopPropagation()}>
        <h3 className="font-semibold text-ink mb-1">Подписание договора — {clientName}</h3>
        {stage === 'trying-ncalayer' && (
          <div className="flex items-center gap-2 text-muted text-sm py-4">
            <Loader2 size={14} className="animate-spin" /> Поиск NCALayer (ЭЦП НУЦ РК) на этом устройстве…
          </div>
        )}
        {stage === 'fallback' && (
          <div className="space-y-3">
            <div className="text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs">
              NCALayer не обнаружен ({error}). Это значит, что юридическая ЭЦП НУЦ РК недоступна на этом устройстве.
              Можно поставить упрощённую подпись — она <b>не является юридической ЭЦП</b> и фиксируется только как
              внутреннее подтверждение (хэш + время + автор).
            </div>
            <label className="block text-xs text-muted">ФИО подписанта</label>
            <input
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Иванов Иван Иванович"
              className="w-full border border-line rounded-lg px-3 py-2 text-sm"
            />
            <div className="flex justify-end gap-2 pt-1">
              <button onClick={onClose} className="text-xs text-muted px-3 py-1.5">Отмена</button>
              <button onClick={confirmSimple} className="text-xs bg-brand-blue text-white px-3 py-1.5 rounded-lg">
                Поставить упрощённую подпись
              </button>
            </div>
          </div>
        )}
        {stage === 'done' && (
          <div className="flex items-center gap-2 text-green-700 text-sm py-4">
            <ShieldCheck size={16} /> Подписано
          </div>
        )}
      </div>
    </div>
  )
}

export default function ContractsHub() {
  const { data, update, save, loading, dirty, saving, isAdmin } = useWorkspace()
  const { user } = useAuth()
  const { t } = useLanguage()
  const [downloading, setDownloading] = useState<string | null>(null)
  const [signingIdx, setSigningIdx] = useState<number | null>(null)

  if (loading) return <div className="text-muted text-sm">{t.common.loading}</div>

  const { contractTemplates: templates, activeContracts, companyProfile, ipAssets } = data
  const readyCount = templates.filter(t => t.status === 'ready').length

  async function handleDownload(name: string) {
    setDownloading(name)
    try {
      const matchedContract = activeContracts.find(c => name.startsWith(c.type.split(' ')[0]) || c.type.includes(name.split(' ')[0]))
      const riskyAsset = ipAssets.find(a => a.status === 'risk')
      await downloadContract(name, companyProfile, {
        counterparty: matchedContract?.client,
        assetDescription: riskyAsset ? `${riskyAsset.name} (${riskyAsset.type})` : undefined,
      })
      update(d => pushAudit(d, user?.email || 'admin', 'Скачан шаблон договора', name))
    } finally {
      setDownloading(null)
    }
  }

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
                <button
                  onClick={() => handleDownload(name)}
                  disabled={downloading === name}
                  className="flex items-center gap-1.5 text-brand-blue hover:opacity-85 text-xs transition-colors disabled:opacity-50"
                >
                  {downloading === name ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />} {t.common.download}
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
                {[t.contractsHub.colClient, t.contractsHub.colType, t.contractsHub.colSigned, t.contractsHub.colExpiry, t.contractsHub.colStatus, 'ЭЦП'].map(h => (
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
                  <td className="px-5 py-3">
                    {c.signature ? (
                      <span className={`text-xs flex items-center gap-1 ${c.signature.method === 'ncalayer' ? 'text-green-700' : 'text-amber-700'}`}>
                        <ShieldCheck size={12} /> {c.signature.method === 'ncalayer' ? 'ЭЦП НУЦ РК' : 'Упрощённая'}
                      </span>
                    ) : isAdmin ? (
                      <button onClick={() => setSigningIdx(idx)} className="flex items-center gap-1 text-brand-blue text-xs hover:opacity-85">
                        <PenLine size={12} /> Подписать
                      </button>
                    ) : (
                      <span className="text-muted text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {signingIdx !== null && (
        <SignModal
          clientName={activeContracts[signingIdx].client}
          onClose={() => setSigningIdx(null)}
          onSigned={(sig) => {
            update(d => {
              d.activeContracts[signingIdx].signature = { ...sig, signedAt: new Date().toISOString() }
              pushAudit(d, user?.email || 'admin', sig.method === 'ncalayer' ? 'Подписан ЭЦП НУЦ РК' : 'Подписан упрощённой подписью', d.activeContracts[signingIdx].client)
            })
            setTimeout(() => setSigningIdx(null), 1200)
          }}
        />
      )}
    </div>
  )
}
