import { Link } from 'react-router-dom'
import { Scale, ArrowRight, CheckCircle, Phone } from 'lucide-react'

function LayoutIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}
function BrainIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M9.5 2C7 2 5 4 5 6.5c0 .8.2 1.6.6 2.2C4.2 9.3 3 10.8 3 12.5 3 15 5 17 7.5 17H9v3h6v-3h1.5C19 17 21 15 21 12.5c0-1.7-1.2-3.2-2.6-3.8.4-.6.6-1.4.6-2.2C19 4 17 2 14.5 2c-1.2 0-2.3.5-3 1.3C10.8 2.5 9.7 2 9.5 2z" />
    </svg>
  )
}
function DatabaseIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  )
}
function MonitorIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}

const packages = [
  {
    name: 'Legal Sprint',
    period: '1–2 недели',
    desc: 'Scan, roadmap, базовые документы. Быстрый старт и понимание рисков.',
    items: ['Legal Scan анкета', 'Карта рисков', 'Roadmap задач', 'Базовые шаблоны'],
    price: 'от 150 000 ₸',
    highlight: false,
  },
  {
    name: 'Astana Hub Track',
    period: 'разовый',
    desc: 'Eligibility, правило 90/10, заявка и compliance calendar.',
    items: ['Eligibility check', '90/10 структура', 'Подготовка заявки', 'Compliance calendar'],
    price: 'от 200 000 ₸',
    highlight: false,
  },
  {
    name: 'AI/IP/Data',
    period: 'разовый',
    desc: 'IP chain, privacy, dataset risk, AI terms и disclaimers.',
    items: ['IP assignment', 'Privacy policy', 'Dataset registry', 'AI disclaimers'],
    price: 'от 180 000 ₸',
    highlight: false,
  },
  {
    name: 'Sales Contracts',
    period: 'разовый',
    desc: 'MSA, SaaS Terms, SLA, pilot/POC, invoices и защита оплаты.',
    items: ['MSA + SaaS Terms', 'SLA шаблон', 'POC/Pilot agreement', 'Invoice template'],
    price: 'от 250 000 ₸',
    highlight: false,
  },
  {
    name: 'Investor Ready',
    period: 'разовый',
    desc: 'Data room, SAFE/SHA, DD answers — готовность к инвестору.',
    items: ['Cap table аудит', 'SAFE/SHA подготовка', 'Data room сборка', 'DD checklist'],
    price: 'от 350 000 ₸',
    highlight: true,
  },
  {
    name: 'Monthly LegalOps',
    period: 'ежемесячно',
    desc: 'Постоянный кабинет, задачи, мониторинг, Q&A — юрист как часть команды.',
    items: ['Кабинет клиента', 'Задачи и дедлайны', 'Мониторинг рисков', 'Неограниченный Q&A'],
    price: 'от 300 000 ₸/мес',
    highlight: false,
  },
]

const journey = [
  { step: 1, stage: 'Idea', action: 'Legal Scan', color: 'indigo' },
  { step: 2, stage: 'MVP', action: 'IP + Data', color: 'blue' },
  { step: 3, stage: 'Pilot', action: 'POC / SLA', color: 'cyan' },
  { step: 4, stage: 'Hub', action: '90/10', color: 'teal' },
  { step: 5, stage: 'Sales', action: 'Contracts', color: 'green' },
  { step: 6, stage: 'Invest', action: 'Data Room', color: 'emerald' },
]

export default function Landing() {
  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen">
      {/* Nav */}
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Scale size={18} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">LegalOS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-slate-400 text-sm">
            <a href="#features" className="hover:text-slate-200 transition-colors">Платформа</a>
            <a href="#journey" className="hover:text-slate-200 transition-colors">Путь клиента</a>
            <a href="#packages" className="hover:text-slate-200 transition-colors">Тарифы</a>
          </div>
          <Link
            to="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Открыть платформу
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-24 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-indigo-400 text-sm mb-8">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
            Юридическое сопровождение как IT-продукт
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            LegalOS для<br />
            <span className="text-indigo-400">AI/IT-стартапов</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            От идеи и MVP до Astana Hub, IP, данных, договоров, продаж и инвестиций.
            Юрист становится частью операционной системы вашего стартапа.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/scan"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors"
            >
              Начать Legal Scan <ArrowRight size={20} />
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors"
            >
              Смотреть демо
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '68+', label: 'пунктов Legal Scan' },
            { val: '90%', label: 'ICT-выручка Hub' },
            { val: '6', label: 'этапов покрытия' },
            { val: '48ч', label: 'первый документ' },
          ].map(({ val, label }) => (
            <div key={label} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-indigo-400 mb-1">{val}</div>
              <div className="text-slate-400 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
              <h3 className="text-red-400 font-semibold mb-4">Классическая модель</h3>
              <ul className="space-y-3">
                {[
                  'Юрист подключается поздно',
                  'Документы хранятся хаотично',
                  'Риски видны только после проблемы',
                  'Стартап не готов к инвестору',
                ].map(t => (
                  <li key={t} className="flex items-start gap-2 text-slate-400 text-sm">
                    <span className="text-red-400 mt-0.5">✗</span> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6">
              <h3 className="text-green-400 font-semibold mb-4">LegalOS-модель</h3>
              <ul className="space-y-3">
                {[
                  'Единый workspace для команды',
                  'Документы как продуктовые артефакты',
                  'Risk score, дедлайны и трек задач',
                  'Готовность к продажам, Hub и DD',
                ].map(t => (
                  <li key={t} className="flex items-start gap-2 text-slate-400 text-sm">
                    <CheckCircle size={16} className="text-green-400 mt-0.5 shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Архитектура платформы</h2>
            <p className="text-slate-400">Один клиентский кабинет вместо разрозненных писем, файлов и устных договорённостей.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '01', icon: <LayoutIcon size={20} />, title: 'Client Workspace', desc: 'Задачи, документы, дедлайны' },
              { num: '02', icon: <BrainIcon size={20} />, title: 'Legal Engine', desc: 'AI-чеклисты + юрист' },
              { num: '03', icon: <DatabaseIcon size={20} />, title: 'Data Room', desc: 'IP, privacy, contracts' },
              { num: '04', icon: <MonitorIcon size={20} />, title: 'Monitoring', desc: 'Astana Hub, отчётность, риски' },
            ].map(({ num, icon, title, desc }) => (
              <div key={num} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-indigo-400">{icon}</div>
                  <span className="text-slate-600 text-xs font-mono">{num}</span>
                </div>
                <h3 className="text-slate-200 font-semibold mb-1">{title}</h3>
                <p className="text-slate-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 key risks */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Почему AI/IT-стартапу нужна платформа</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Главный актив стартапа — код, модель, данные, права и возможность законно масштабировать выручку.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { num: '01', label: 'IP', desc: 'Права на код, дизайн, модель и датасеты должны принадлежать компании' },
              { num: '02', label: 'DATA', desc: 'Персональные данные, биометрия, health/fintech требуют безопасной схемы' },
              { num: '03', label: 'HUB', desc: 'Выручка и договоры должны подтверждать ICT-логику и 90/10' },
              { num: '04', label: 'SALES', desc: 'SaaS Terms, SLA и акты должны защищать оплату и продукт' },
              { num: '05', label: 'INVESTOR', desc: 'Инвестор проверяет cap table, IP chain, data room и ответственность' },
            ].map(({ num, label, desc }) => (
              <div key={num} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <div className="text-indigo-400 text-xs font-mono mb-2">{num}</div>
                <div className="text-white font-bold text-lg mb-2">{label}</div>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Путь клиента</h2>
            <p className="text-slate-400">На выходе каждого шага: документ + статус + владелец + следующий риск.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {journey.map(({ step, stage, action }) => (
              <div key={step} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center w-36">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-3">{step}</div>
                <div className="text-white font-semibold text-sm mb-1">{stage}</div>
                <div className="text-slate-400 text-xs">{action}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MVP Timeline */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">MVP за 90 дней</h2>
            <p className="text-slate-400">Сначала управляемый сервис, затем автоматизация и AI-чеклисты.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { period: '0–30 дней', title: 'Service Blueprint', items: ['Анкеты и шаблоны', 'Статусы и карта рисков', 'Структура кабинета'] },
              { period: '31–60 дней', title: 'Client Portal MVP', items: ['Документы и задачи', 'Дедлайны и уведомления', 'Роли клиента и юриста'] },
              { period: '61–90 дней', title: 'AI Workflow', items: ['Draft assistant', 'Red-flag чеклисты', 'Data room + reporting'] },
            ].map(({ period, title, items }) => (
              <div key={period} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="text-indigo-400 text-xs font-mono mb-2">{period}</div>
                <h3 className="text-white font-semibold mb-3">{title}</h3>
                <ul className="space-y-2">
                  {items.map(i => (
                    <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                      <CheckCircle size={14} className="text-indigo-400 mt-0.5 shrink-0" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Пакеты и тарифы</h2>
            <p className="text-slate-400">Setup fee + monthly subscription. Начните с Legal Sprint за 1–2 недели.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map(({ name, period, desc, items, price, highlight }) => (
              <div
                key={name}
                className={`rounded-2xl p-6 border transition-colors ${
                  highlight
                    ? 'bg-indigo-600/10 border-indigo-500/50'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-600'
                }`}
              >
                {highlight && (
                  <span className="inline-block bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    Популярный
                  </span>
                )}
                <h3 className="text-white font-bold text-lg mb-1">{name}</h3>
                <p className="text-slate-500 text-xs mb-3">{period}</p>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{desc}</p>
                <ul className="space-y-2 mb-6">
                  {items.map(i => (
                    <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                      <CheckCircle size={14} className="text-green-400 mt-0.5 shrink-0" /> {i}
                    </li>
                  ))}
                </ul>
                <div className="text-indigo-400 font-semibold">{price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto bg-indigo-600/10 border border-indigo-500/30 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Начните с Legal Scan</h2>
          <p className="text-slate-400 mb-8">
            1–2 недели: карта рисков и legal roadmap, структура кабинета и backlog задач,
            перечень документов и бюджет этапов. Первичная упаковка IP / data / Hub / sales.
          </p>
          <div className="text-indigo-300 font-semibold text-xl mb-6">300–700 тыс. ₸</div>
          <Link
            to="/scan"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-colors"
          >
            Начать Legal Scan <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Scale size={18} className="text-white" />
            </div>
            <div>
              <div className="text-white font-bold">LegalOS</div>
              <div className="text-slate-500 text-xs">AI/IT Legal Platform</div>
            </div>
          </div>
          <div className="text-center text-slate-400 text-sm">
            <div className="font-semibold text-slate-300">Sarsembaev Kanat</div>
            <div>AI Legal Counsel, PhD</div>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Phone size={16} className="text-indigo-400" />
            <a href="tel:+77017976342" className="hover:text-slate-200 transition-colors">7 701 797 63 42</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
