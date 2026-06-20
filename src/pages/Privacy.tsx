import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-canvas px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink mb-10">
          <ArrowLeft size={16} /> На главную
        </Link>
        <h1 className="text-3xl font-bold tracking-tightest text-ink mb-6">Политика конфиденциальности</h1>
        <div className="space-y-5 text-muted leading-relaxed">
          <p>
            Kerege.ON («мы», «сервис») обрабатывает персональные данные пользователей в соответствии
            с законодательством Республики Казахстан о персональных данных и их защите.
          </p>
          <p>
            Мы собираем только те данные, которые необходимы для предоставления сервиса: контактные
            данные, сведения о компании и документы, загружаемые пользователем для юридического анализа.
          </p>
          <p>
            Данные не передаются третьим лицам без согласия пользователя, за исключением случаев,
            предусмотренных законом. Пользователь может запросить удаление своих данных в любой момент,
            обратившись по контактам, указанным на сайте.
          </p>
          <p>
            Используя сервис, вы соглашаетесь с условиями настоящей политики.
          </p>
        </div>
      </div>
    </div>
  )
}
