import { Save, Eye, Lock } from 'lucide-react'

interface SaveBarProps {
  isAdmin: boolean
  dirty: boolean
  saving: boolean
  onSave: () => void
}

export default function SaveBar({ isAdmin, dirty, saving, onSave }: SaveBarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border ${isAdmin ? 'bg-brand-blue/5 border-brand-blue/20 text-brand-blue' : 'bg-brand-surface border-line text-muted'}`}>
        {isAdmin ? <><Lock size={12} /> Режим сотрудника — редактирование</> : <><Eye size={12} /> Клиентский вид — только просмотр</>}
      </div>
      {isAdmin && dirty && (
        <button onClick={onSave} disabled={saving} className="flex items-center gap-1.5 bg-brand-green text-white text-sm rounded-lg px-4 py-2 hover:opacity-90 transition disabled:opacity-60">
          <Save size={14} /> {saving ? 'Сохранение…' : 'Сохранить'}
        </button>
      )}
    </div>
  )
}
