import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-canvas px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink mb-10">
          <ArrowLeft size={16} /> На главную
        </Link>
        <h1 className="text-3xl font-bold tracking-tightest text-ink mb-6">Условия использования</h1>
        <div className="space-y-5 text-muted leading-relaxed">
          <p>
            Используя Kerege.ON, вы соглашаетесь с настоящими условиями. Сервис предоставляет
            инструменты юридического сопровождения и аналитики для AI/IT-стартапов и не является
            заменой консультации квалифицированного юриста по конкретному делу.
          </p>
          <p>
            Документы и рекомендации, формируемые сервисом, носят справочный характер. Окончательная
            юридическая ответственность за принятые решения лежит на пользователе и его компании.
          </p>
          <p>
            Мы оставляем за собой право изменять функциональность сервиса и настоящие условия,
            уведомляя пользователей об существенных изменениях.
          </p>
          <p>
            Любые споры разрешаются в соответствии с законодательством Республики Казахстан.
          </p>
        </div>
      </div>
    </div>
  )
}
