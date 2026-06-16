import { Link } from 'react-router-dom'
import { Shield, Search, Building2, TrendingUp, CheckCircle, ArrowRight, Phone } from 'lucide-react'

const features = [
  { icon: Search, title: 'Legal Scan', desc: 'Анкета за 10 минут — карта рисков и legal roadmap для вашего стартапа.' },
  { icon: Shield, title: 'IP & Data', desc: 'IP assignment, privacy policy, consent — защита вашего продукта и данных.' },
  { icon: Building2, title: 'Astana Hub', desc: 'Eligibility check, структура 90/10, compliance calendar и отчётность.' },
  { icon: TrendingUp, title: 'Investor Ready', desc: 'Cap table, SAFE/SHA, data room и DD checklist для инвестора.' },
]

const packages = [
  { name: 'Legal Sprint', period: '1–2 недели', desc: 'Legal scan, roadmap, базовые документы', price: 'от 300 000 ₸' },
  { name: 'Astana Hub Track', period: 'разово', desc: 'Eligibility, 90/10, заявка, compliance', price: 'от 200 000 ₸' },
  { name: 'AI / IP / Data', period: 'разово', desc: 'IP chain, privacy, dataset risk, AI terms', price: 'от 250 000 ₸' },
  { name: 'Sales Contracts', period: 'разово', desc: 'MSA, SaaS, SLA, pilot/POC, invoices', price: 'от 150 000 ₸' },
  { name: 'Investor Ready', period: 'разово', desc: 'Data room, SAFE/SHA, DD answers', price: 'от 350 000 ₸' },
  { name: 'Monthly LegalOps', period: 'в месяц', desc: 'Кабинет, задачи, мониторинг, Q&A', price: 'от 200 000 ₸' },
]

const journey = [
  { num: 1, stage: 'Idea', action: 'Legal Scan' },
  { num: 2, stage: 'MVP', action: 'IP + Data' },
  { num: 3, stage: 'Pilot', action: 'POC / SLA' },
  { num: 4, stage: 'Hub', action: '90/10' },
  { num: 5, stage: 'Sales', action: 'Contracts' },
  { num: 6, stage: 'Invest', action: 'Data Room' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold">
            <span className="text-[#0B2D6B]">Lex</span><span className="text-[#16A334]">.ON</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-[#0B2D6B] transition-colors">Услуги</a>
            <a href="#packages" className="hover:text-[#0B2D6B] transition-colors">Пакеты</a>
            <a href="#journey" className="hover:text-[#0B2D6B] transition-colors">Как работаем</a>
          </div>
          <a href="tel:+77017976342" className="bg-[#16A334] hover:bg-[#138a2c] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">Связаться</a>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-20 flex items-center gap-16">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 bg-[#F3F5F7] border border-gray-200 rounded-full px-4 py-1.5 text-sm text-[#0B2D6B] font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#16A334]" />
            Юридическое сопровождение как IT-продукт
          </div>
          <h1 className="text-5xl font-bold text-[#0B2D6B] leading-tight mb-6">
            Правовая защита<br />для ваших инноваций
          </h1>
          <p className="text-gray-500 text-xl mb-8 leading-relaxed">
            Lex.ON помогает IT и AI командам запускаться и расти без правовых рисков — от идеи и MVP до Astana Hub, IP, данных и инвестиций.
          </p>
          <div className="flex gap-4">
            <Link to="/scan" className="bg-[#16A334] hover:bg-[#138a2c] text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
              Получить Legal Scan <ArrowRight size={16} />
            </Link>
            <a href="#features" className="border-2 border-[#0B2D6B] text-[#0B2D6B] hover:bg-[#0B2D6B] hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Наши услуги
            </a>
          </div>
        </div>
        <div className="hidden lg:flex items-end gap-3 h-64 shrink-0">
          {[80,120,100,140,90,160,110,150,85,130].map((h, i) => (
            <div key={i} className="w-8 rounded-t-md" style={{ height: `${h}px`, backgroundColor: i % 2 === 0 ? '#0B2D6B' : '#16A334' }} />
          ))}
        </div>
      </section>

      <section className="bg-[#F3F5F7] py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <div className="text-gray-400 text-sm font-semibold uppercase tracking-wide mb-4">Классическая модель</div>
            <ul className="space-y-3">
              {['Юрист подключается поздно','Документы хранятся хаотично','Риски видны только после проблемы','Стартап не готов к инвестору'].map(t => (
                <li key={t} className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs shrink-0">✕</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#0B2D6B] rounded-2xl p-8">
            <div className="text-[#16A334] text-sm font-semibold uppercase tracking-wide mb-4">Lex.ON модель</div>
            <ul className="space-y-3">
              {['Единый workspace для команды','Документы как продуктовые артефакты','Risk score, дедлайны и трек задач','Готовность к продажам, Hub и DD'].map(t => (
                <li key={t} className="flex items-center gap-3 text-sm text-white">
                  <CheckCircle size={16} className="text-[#16A334] shrink-0" />{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B2D6B] mb-3">Что входит в платформу</h2>
            <p className="text-gray-500">Юридические риски превращаются в понятные продуктовые задачи</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#F3F5F7] rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#0B2D6B]" />
                </div>
                <h3 className="font-semibold text-[#0B2D6B] mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="journey" className="bg-[#F3F5F7] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B2D6B] mb-3">Путь клиента</h2>
            <p className="text-gray-500">На выходе каждого шага: документ + статус + владелец + следующий риск</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {journey.map(({ num, stage, action }, i) => (
              <div key={num} className="flex items-center gap-3">
                <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 text-center min-w-[110px]">
                  <div className="text-xs text-gray-400 font-mono mb-1">{num}. {stage}</div>
                  <div className="text-[#0B2D6B] font-semibold text-sm">{action}</div>
                </div>
                {i < journey.length - 1 && <ArrowRight size={16} className="text-[#16A334] shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B2D6B] mb-3">Пакеты</h2>
            <p className="text-gray-500">Setup fee + monthly subscription + success fee для крупных сделок</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map(({ name, period, desc, price }) => (
              <div key={name} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#0B2D6B] transition-colors">
                <h3 className="font-bold text-[#0B2D6B] mb-1">{name}</h3>
                <div className="text-gray-400 text-xs mb-3">{period}</div>
                <p className="text-gray-500 text-sm mb-4">{desc}</p>
                <div className="text-[#16A334] font-bold">{price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2D6B] py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Начните с Legal Scan</h2>
          <p className="text-white/70 mb-8">Карта рисков и legal roadmap за 1–2 недели. 300–700 тыс. ₸</p>
          <div className="flex gap-4 justify-center">
            <Link to="/scan" className="bg-[#16A334] hover:bg-[#138a2c] text-white font-semibold px-7 py-3 rounded-lg transition-colors">
              Пройти Legal Scan
            </Link>
            <Link to="/dashboard" className="border border-white/30 text-white hover:bg-white/10 font-semibold px-7 py-3 rounded-lg transition-colors">
              Открыть платформу
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xl font-bold"><span className="text-[#0B2D6B]">Lex</span><span className="text-[#16A334]">.ON</span></div>
          <div className="text-gray-400 text-sm flex items-center gap-2">
            <Phone size={14} /> Sarsembaev Kanat · AI Legal Counsel · PhD · 7 701 797 63 42
          </div>
          <div className="text-sm"><span className="text-[#16A334] font-medium">You Create.</span> <span className="text-[#0B2D6B] font-medium">We Protect.</span></div>
        </div>
      </footer>
    </div>
  )
}
