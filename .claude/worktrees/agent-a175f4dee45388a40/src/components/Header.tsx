interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
      <h1 className="text-white font-semibold text-lg">{title}</h1>
      <div className="flex items-center gap-4">
        <span className="text-slate-400 text-sm">AI Health Assistant</span>
        <div className="flex items-center gap-2 bg-slate-700 px-3 py-1.5 rounded-lg">
          <span className="text-slate-300 text-sm">Риск-скор:</span>
          <span className="text-yellow-400 font-bold text-sm">68/100</span>
        </div>
      </div>
    </header>
  )
}
