interface RiskBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
}

export default function RiskBadge({ score, size = 'sm' }: RiskBadgeProps) {
  const getColor = (s: number) => {
    if (s >= 75) return 'text-green-400 bg-green-500/20 border-green-500/30'
    if (s >= 50) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
    return 'text-red-400 bg-red-500/20 border-red-500/30'
  }

  const getLabel = (s: number) => {
    if (s >= 75) return 'Низкий риск'
    if (s >= 50) return 'Средний риск'
    return 'Высокий риск'
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  }

  return (
    <span className={`border rounded-full font-semibold ${getColor(score)} ${sizeClasses[size]}`}>
      {score}/100 · {getLabel(score)}
    </span>
  )
}
