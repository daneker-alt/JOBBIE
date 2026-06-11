import { Clock, User, AlertTriangle, CheckCircle, Circle } from 'lucide-react'

interface TaskCardProps {
  title: string
  description: string
  status: 'urgent' | 'in-progress' | 'ready'
  deadline?: string
  assignees?: string[]
}

const statusConfig = {
  urgent: {
    label: 'Срочно',
    className: 'badge-urgent',
    icon: AlertTriangle,
  },
  'in-progress': {
    label: 'В работе',
    className: 'badge-progress',
    icon: Circle,
  },
  ready: {
    label: 'Готово',
    className: 'badge-ready',
    icon: CheckCircle,
  },
}

export default function TaskCard({ title, description, status, deadline, assignees }: TaskCardProps) {
  const config = statusConfig[status]
  const StatusIcon = config.icon

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 hover:border-indigo-500/40 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <StatusIcon
            size={18}
            className={
              status === 'urgent'
                ? 'text-red-400 mt-0.5 shrink-0'
                : status === 'in-progress'
                ? 'text-yellow-400 mt-0.5 shrink-0'
                : 'text-green-400 mt-0.5 shrink-0'
            }
          />
          <div>
            <h3 className="text-slate-200 font-medium text-sm">{title}</h3>
            <p className="text-slate-400 text-xs mt-1">{description}</p>
          </div>
        </div>
        <span className={config.className}>{config.label}</span>
      </div>

      {(deadline || assignees) && (
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-700">
          {deadline && (
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <Clock size={13} />
              <span>{deadline}</span>
            </div>
          )}
          {assignees && assignees.length > 0 && (
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <User size={13} />
              <span>{assignees.join(', ')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
