import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight, Phone } from 'lucide-react'

const problems = [
  'Инвестор задаёт вопросы — нечего показать',
  'Подрядчик ушёл с кодом — права не оформлены',
  'Клиент не платит — договора нет',
  'Astana Hub отказал — не та структура выручки',
]

const results = [
  { num: '10', label: 'минут', desc: 'Legal Scan — карта ваших рисков' },
  { num: '2', label: 'недели', desc: 'Roadmap + базовые документы' },
  { num: '1', label: 'кабинет', desc: 'Всё в одном месте: задачи, дедлайны, документы' },
]

const steps = [
  { n: '1', title: 'Scan', desc: 'Заполняете анкету — получаете карту рисков и план' },
  { n: '2', title: 'Fix', desc: 'Юрист закрывает задачи: IP, данные, договоры, Hub' },
  { n: '3', title: 'Grow', desc: 'Продаёте, привлекаете инвестиции, масштабируетесь' },
]

const packages = [
  { name: 'Legal Sprint', price: 'от 300 000 ₸', desc: '1–2 недели. Scan + roadmap + первичные документы. Стартовая точка.' },
  { name: 'Monthly LegalOps', price: 'от 200 000 ₸/мес', desc: 'Постоянный кабинет, задачи, мониторинг. Юрист как часть команды.', highlight: true },
  { name: 'Investor Ready', price: 'от 350 000 ₸', desc: 'Cap table, data room, SAFE/SHA. Готовность к DD за 3–4 недели.' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Nav */}
      <nav className="sticky top-0 bg-white border-b border-gray-100 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold">
            <span className="text-[#0B2D6B]">Lex</span><span className="text-[#16A334]">.ON</span>
          </div>
          <a href="tel:+77017976342"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0B2D6B] transition-colors">
            <Phone size={14} /> +7 701 797 63 42
          </a>
          <Link to="/scan"
            className="bg-[#16A334] hover:bg-[#138a2c] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            Начать бесплатно
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-[#16A334] font-semibold text-sm mb-4 tracking-wide uppercase">
          Юридическое сопровождение для AI/IT стартапов Казахстана
        </p>
        <h1 className="text-5xl md:text-6xl font-bold text-[#0B2D6B] leading-tight mb-6">
          Вы строите продукт.<br />
          <span className="text-[#16A334]">Мы защищаем его.</span>
        </h1>
        <p className="text-gray-500 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
          IP, данные, договоры, Astana Hub и инвестиционная готовность — всё в одном кабинете.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/scan"
            className="bg-[#16A334] hover:bg-[#138a2c] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2">
            Пройти Legal Scan <ArrowRight size={18} />
          </Link>
          <a href="tel:+77017976342"
            className="border-2 border-[#0B2D6B] text-[#0B2D6B] hover:bg-[#0B2D6B] hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">
            Позвонить
          </a>
        </div>
      </section>

      {/* Pain */}
      <section className="bg-[#F3F5F7] py-14">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-gray-400 text-sm font-semibold uppercase tracking-wide mb-8">
            Это уже случилось с другими стартапами
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {problems.map(p => (
              <div key={p} className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-start gap-3">
                <span className="text-red-500 text-lg shrink-0 mt-0.5">×</span>
                <span className="text-gray-700 text-sm">{p}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-[#0B2D6B] font-semibold mt-8">
            С Lex.ON вы узнаёте о рисках до того, как они стали проблемой.
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {results.map(({ num, label, desc }) => (
              <div key={num}>
                <div className="text-5xl font-bold text-[#0B2D6B] leading-none">{num}</div>
                <div className="text-[#16A334] font-bold text-lg mb-2">{label}</div>
                <div className="text-gray-500 text-sm">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#0B2D6B] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-white text-3xl font-bold text-center mb-12">Как это работает</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#16A334] text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {n}
                </div>
                <div className="text-white font-bold text-lg mb-2">{title}</div>
                <div className="text-white/60 text-sm leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#0B2D6B] text-center mb-3">Пакеты</h2>
          <p className="text-gray-400 text-center mb-10">Выберите что нужно сейчас. Можно комбинировать.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map(({ name, price, desc, highlight }) => (
              <div key={name} className={`rounded-2xl p-6 border-2 transition-all ${highlight ? 'border-[#0B2D6B] bg-[#0B2D6B] text-white' : 'border-gray-200 bg-white hover:border-[#0B2D6B]'}`}>
                {highlight && <div className="text-[#16A334] text-xs font-bold uppercase tracking-wide mb-2">Популярный</div>}
                <h3 className={`font-bold text-lg mb-1 ${highlight ? 'text-white' : 'text-[#0B2D6B]'}`}>{name}</h3>
                <div className={`text-2xl font-bold mb-3 ${highlight ? 'text-[#16A334]' : 'text-[#16A334]'}`}>{price}</div>
                <p className={`text-sm leading-relaxed ${highlight ? 'text-white/70' : 'text-gray-500'}`}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#F3F5F7] py-16">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#0B2D6B] mb-4">Начните с Legal Scan</h2>
          <p className="text-gray-500 mb-8">10 минут — и вы знаете где риски и что делать дальше.</p>
          <Link to="/scan"
            className="inline-flex items-center gap-2 bg-[#16A334] hover:bg-[#138a2c] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors mb-6">
            Пройти Legal Scan <ArrowRight size={18} />
          </Link>
          <div className="flex items-center justify-center gap-3 text-sm text-gray-400">
            <CheckCircle size={14} className="text-[#16A334]" /> Без предоплаты
            <CheckCircle size={14} className="text-[#16A334]" /> Результат за 2 недели
            <CheckCircle size={14} className="text-[#16A334]" /> Фиксированная цена
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <div className="font-bold text-lg">
            <span className="text-[#0B2D6B]">Lex</span><span className="text-[#16A334]">.ON</span>
          </div>
          <div>Sarsembaev Kanat · AI Legal Counsel · PhD</div>
          <a href="tel:+77017976342" className="hover:text-[#0B2D6B] transition-colors">+7 701 797 63 42</a>
        </div>
      </footer>

    </div>
  )
}
