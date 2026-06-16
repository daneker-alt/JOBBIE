interface RiskBadgeProps { score: number; size?: 'sm' | 'md' | 'lg'; label?: string }

export default function RiskBadge({ score, size = 'md', label }: RiskBadgeProps) {
  const color = score >= 75 ? 'text-green-700 bg-green-100 border-green-200'
    : score >= 50 ? 'text-orange-700 bg-orange-100 border-orange-200'
    : 'text-red-700 bg-red-100 border-red-200'
  const text = size === 'sm' ? 'text-xs' : 'text-sm'
  return (
    <span className={`border rounded-full font-semibold px-2.5 py-0.5 ${color} ${text}`}>
      {label ?? `${score}/100`}
    </span>
  )
}
