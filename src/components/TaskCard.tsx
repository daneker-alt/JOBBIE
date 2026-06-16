import { Clock, AlertTriangle, CheckCircle, Circle } from 'lucide-react'

interface TaskCardProps {
  title: string
  description: string
  status: 'urgent' | 'in-progress' | 'ready' | 'pending'
  deadline?: string
  assignees?: string[]
}

export default function TaskCard({ title, description, status, deadline, assignees }: TaskCardProps) {
  const conf = {
    urgent: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50 border-red-200', label: 'Срочно' },
    'in-progress': { icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', label: 'В работе' },
    ready: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50 border-green-200', label: 'Готово' },
    pending: { icon: Circle, color: 'text-gray-400', bg: 'bg-gray-50 border-gray-200', label: 'Ожидает' },
  }[status]

  const Icon = conf.icon

  return (
    <div className={`border rounded-xl p-4 ${conf.bg}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Icon size={16} className={`${conf.color} mt-0.5 shrink-0`} />
          <div>
            <div className="font-semibold text-[#0B2D6B] text-sm">{title}</div>
            <div className="text-gray-500 text-xs mt-0.5">{description}</div>
          </div>
        </div>
        <span className={`text-xs font-medium ${conf.color} shrink-0`}>{conf.label}</span>
      </div>
      {(deadline || assignees?.length) && (
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-black/5 text-xs text-gray-400">
          {deadline && <span className="flex items-center gap-1"><Clock size={11} /> {deadline}</span>}
          {assignees?.length && <span>{assignees.join(' · ')}</span>}
        </div>
      )}
    </div>
  )
}
