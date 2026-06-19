import { useState } from 'react'
import { Users, UserPlus, History, Shield, X } from 'lucide-react'
import SaveBar from '../components/SaveBar'
import { useWorkspace } from '../lib/useWorkspace'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { pushAudit } from '../lib/audit'

export default function Team() {
  const { data, update, save, loading, dirty, saving, isAdmin } = useWorkspace()
  const { user } = useAuth()
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'admin' | 'client'>('client')

  if (loading) return <div className="text-muted text-sm">{t.common.loading}</div>

  const { team, auditLog } = data

  function invite() {
    if (!name.trim() || !email.trim()) return
    update(d => {
      d.team.push({ id: crypto.randomUUID(), name: name.trim(), email: email.trim(), role, invitedAt: new Date().toISOString().slice(0, 10) })
      pushAudit(d, user?.email || 'admin', 'Добавлен участник команды', `${name.trim()} (${role})`)
    })
    setName(''); setEmail('')
  }

  function remove(id: string, label: string) {
    update(d => {
      d.team = d.team.filter(m => m.id !== id)
      pushAudit(d, user?.email || 'admin', 'Удалён участник команды', label)
    })
  }

  return (
    <div className="space-y-6">
      <SaveBar isAdmin={isAdmin} dirty={dirty} saving={saving} onSave={save} />

      <div className="bg-white border border-line rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-line flex items-center gap-2">
          <Users size={16} className="text-muted" />
          <h2 className="text-ink font-semibold tracking-tightest">Команда</h2>
        </div>

        {isAdmin && (
          <div className="px-6 py-4 border-b border-line bg-brand-surface flex flex-wrap items-end gap-3">
            <div>
              <label className="block text-xs text-muted mb-1">Имя</label>
              <input value={name} onChange={e => setName(e.target.value)} className="border border-line rounded-lg px-3 py-2 text-sm w-48" placeholder="Иван Иванов" />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} className="border border-line rounded-lg px-3 py-2 text-sm w-56" placeholder="ivan@company.kz" />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">Роль</label>
              <select value={role} onChange={e => setRole(e.target.value as 'admin' | 'client')} className="border border-line rounded-lg px-3 py-2 text-sm">
                <option value="client">Клиент</option>
                <option value="admin">Сотрудник</option>
              </select>
            </div>
            <button onClick={invite} className="flex items-center gap-1.5 bg-brand-blue text-white text-sm px-4 py-2 rounded-lg hover:opacity-90">
              <UserPlus size={14} /> Добавить
            </button>
          </div>
        )}

        <div className="divide-y divide-line">
          {team.map(m => (
            <div key={m.id} className="px-6 py-3 flex items-center justify-between">
              <div>
                <div className="text-sm text-ink font-medium">{m.name}</div>
                <div className="text-xs text-muted">{m.email} · добавлен {m.invitedAt}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs border px-2 py-0.5 rounded-full flex items-center gap-1 ${m.role === 'admin' ? 'text-purple-700 bg-purple-50 border-purple-200' : 'text-blue-700 bg-blue-50 border-blue-200'}`}>
                  <Shield size={10} /> {m.role === 'admin' ? 'Сотрудник' : 'Клиент'}
                </span>
                {isAdmin && (
                  <button onClick={() => remove(m.id, m.name)} className="text-muted hover:text-red-600">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-line rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-line flex items-center gap-2">
          <History size={16} className="text-muted" />
          <h2 className="text-ink font-semibold tracking-tightest">Журнал аудита</h2>
        </div>
        <div className="divide-y divide-line max-h-[480px] overflow-y-auto">
          {auditLog.length === 0 && <div className="px-6 py-6 text-muted text-sm">Пока нет событий.</div>}
          {auditLog.map(e => (
            <div key={e.id} className="px-6 py-3 flex items-center justify-between text-sm">
              <div>
                <span className="text-ink">{e.action}</span>
                <span className="text-muted"> — {e.target}</span>
              </div>
              <div className="text-xs text-muted font-mono shrink-0 ml-4">
                {e.actor} · {new Date(e.timestamp).toLocaleString('ru-RU')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
