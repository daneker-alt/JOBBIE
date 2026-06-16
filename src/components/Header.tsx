interface HeaderProps { title: string }

export default function Header({ title }: HeaderProps) {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <h1 className="text-[#0B2D6B] font-semibold text-lg">{title}</h1>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400">AI Health Assistant</span>
        <span className="bg-orange-100 text-orange-700 border border-orange-200 text-xs font-semibold px-2.5 py-1 rounded-full">
          Риск 68/100
        </span>
      </div>
    </header>
  )
}
