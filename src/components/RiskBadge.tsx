interface RiskBadgeProps { score: number; size?: 'sm' | 'md' | 'lg'; label?: string }

export default function RiskBadge({ score, size = 'md', label }: RiskBadgeProps) {
  const color = score >= 75 ? 'text-green-700 bg-green-50 border-green-200'
    : score >= 50 ? 'text-amber-700 bg-amber-50 border-amber-200'
    : 'text-red-700 bg-red-50 border-red-200'
  const text = size === 'sm' ? 'text-xs' : 'text-sm'
  return (
    <span className={`border rounded-full font-semibold font-mono px-2.5 py-0.5 ${color} ${text}`}>
      {label ?? `${score}/100`}
    </span>
  )
}
