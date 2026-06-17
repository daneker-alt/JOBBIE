interface HeaderProps { title: string; onHelp?: () => void }

export default function Header({ title, onHelp }: HeaderProps) {
  return (
    <header className="h-14 bg-white border-b border-line flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="text-brand-blue font-semibold text-lg tracking-tightest">{title}</h1>
        <span className="hidden sm:block text-xs text-line">|</span>
        <span className="hidden sm:block text-xs font-semibold text-muted">AI Health Assistant</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onHelp}
          className="text-xs font-semibold text-brand-blue border border-line hover:bg-brand-surface px-3 py-1.5 rounded-lg transition-colors"
        >
          Помощь
        </button>
        <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-2.5 py-1 rounded-full">
          Риск <span className="font-mono">68/100</span>
        </span>
      </div>
    </header>
  )
}
