import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="font-mono text-6xl font-semibold text-brand-blue">404</div>
        <h1 className="mt-4 text-2xl font-bold tracking-tightest text-ink">Страница не найдена</h1>
        <p className="mt-3 text-muted leading-relaxed">
          Такой страницы не существует или она была перемещена.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white bg-brand-blue hover:opacity-85 px-6 py-3 rounded-md transition-opacity"
        >
          <ArrowLeft size={16} /> На главную
        </Link>
      </div>
    </div>
  )
}
