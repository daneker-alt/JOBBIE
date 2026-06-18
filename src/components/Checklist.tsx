import { CheckCircle, AlertTriangle } from 'lucide-react'
import type { ChecklistItem } from '../lib/types'

interface ChecklistProps {
  items: ChecklistItem[]
  isAdmin: boolean
  onToggle: (idx: number) => void
  dense?: boolean
}

export default function Checklist({ items, isAdmin, onToggle, dense }: ChecklistProps) {
  return (
    <div className={dense ? 'space-y-2' : 'space-y-3'}>
      {items.map((item, i) => {
        const Icon = item.done ? CheckCircle : AlertTriangle
        const row = (
          <div className="flex items-start gap-2.5">
            <Icon size={dense ? 13 : 14} className={`${item.done ? 'text-green-600' : 'text-amber-600'} mt-0.5 shrink-0`} />
            <div>
              <div className={`${dense ? 'text-xs' : 'text-sm'} ${item.done ? 'text-ink' : 'text-muted'}`}>{item.title}</div>
              {item.note && <div className="text-amber-700/80 text-xs">{item.note}</div>}
            </div>
          </div>
        )
        return isAdmin ? (
          <button key={item.title} onClick={() => onToggle(i)} className="w-full text-left hover:bg-brand-surface rounded-lg -mx-1 px-1 transition">
            {row}
          </button>
        ) : <div key={item.title}>{row}</div>
      })}
    </div>
  )
}
