import RiskBadge from './RiskBadge'

interface TaskCardProps {
  title: string
  description: string
  status: 'urgent' | 'in-progress' | 'ready'
  deadline: string
  assignedTo: string
}

export default function TaskCard({ title, description, status, deadline, assignedTo }: TaskCardProps) {
  const statusConfig = {
    urgent: { level: 'high' as const, label: 'Срочно' },
    'in-progress': { level: 'medium' as const, label: 'В процессе' },
    ready: { level: 'low' as const, label: 'Готово' },
  }
  const s = statusConfig[status]
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-indigo-500 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-white font-medium">{title}</h3>
        <RiskBadge level={s.level} label={s.label} />
      </div>
      <p className="text-slate-400 text-sm mb-4">{description}</p>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Дедлайн: {deadline}</span>
        <span>Отв: {assignedTo}</span>
      </div>
    </div>
  )
}
