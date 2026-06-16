interface HeaderProps { title: string; onHelp?: () => void }

export default function Header({ title, onHelp }: HeaderProps) {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="text-[#0B2D6B] font-semibold text-lg">{title}</h1>
        <span className="hidden sm:block text-xs text-gray-300">|</span>
        <span className="hidden sm:block text-xs font-semibold text-gray-500">AI Health Assistant</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onHelp}
          className="text-xs font-semibold text-[#0B2D6B] border border-[#0B2D6B]/30 hover:bg-[#0B2D6B] hover:text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          Помощь
        </button>
        <span className="bg-orange-100 text-orange-700 border border-orange-200 text-xs font-semibold px-2.5 py-1 rounded-full">
          Риск 68/100
        </span>
      </div>
    </header>
  )
}
