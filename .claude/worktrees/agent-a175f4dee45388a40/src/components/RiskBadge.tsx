interface RiskBadgeProps {
  level: 'high' | 'medium' | 'low'
  label?: string
}

export default function RiskBadge({ level, label }: RiskBadgeProps) {
  const config = {
    high: { bg: 'bg-red-900/50', text: 'text-red-400', border: 'border-red-700', default: 'Высокий' },
    medium: { bg: 'bg-yellow-900/50', text: 'text-yellow-400', border: 'border-yellow-700', default: 'Средний' },
    low: { bg: 'bg-green-900/50', text: 'text-green-400', border: 'border-green-700', default: 'Низкий' },
  }
  const c = config[level]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${c.bg} ${c.text} ${c.border}`}>
      {label || c.default}
    </span>
  )
}
