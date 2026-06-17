import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import SocialFloat from '../components/SocialFloat'
import Assistant from '../components/Assistant'

const stats = [
  { value: '10', unit: 'мин', label: 'Legal Scan от анкеты до карты рисков' },
  { value: '2', unit: 'нед', label: 'Roadmap и базовые документы' },
  { value: '4', unit: 'зоны', label: 'IP · Данные · Договоры · Инвестор' },
  { value: '90', unit: '/10', label: 'Структура выручки для Astana Hub' },
]

const capabilities = [
  { name: 'Legal Scan', desc: 'Анкета превращается в карту рисков с приоритетами и legal roadmap по всем зонам стартапа.' },
  { name: 'IP Registry', desc: 'Права на код, дизайн, модели и датасеты закреплены за компанией — отслеживаются по статусу владельца.' },
  { name: 'Data & AI', desc: 'Privacy policy, согласия, локализация данных РК и AI-disclaimers в одном compliance-чеклисте.' },
  { name: 'Astana Hub', desc: 'Проверка eligibility, контроль структуры выручки 90/10 и календарь отчётности резидента.' },
  { name: 'Contracts', desc: 'MSA, SaaS Terms, SLA и пилотные соглашения — шаблоны, которые защищают оплату и продукт.' },
  { name: 'Investor Room', desc: 'Cap table, SAFE/SHA, data room и ответы на due diligence — готовность к раунду в процентах.' },
]

const workflow = [
  { phase: 'Scan', desc: 'Заполняете анкету — система собирает факты и показывает, где риски, что готово и что делать первым.' },
  { phase: 'Fix', desc: 'Юрист закрывает задачи бэклога: оформляет IP, данные, договоры и структуру под Astana Hub.' },
  { phase: 'Grow', desc: 'Продаёте по защищённым договорам, проходите DD и привлекаете инвестиции без правовых пробелов.' },
]

const packages = [
  { name: 'Legal Sprint', price: '300 000', unit: '₸', desc: 'Scan, roadmap и первичный пакет документов за 1–2 недели.', cta: 'Стартовая точка', featured: false },
  { name: 'Monthly LegalOps', price: '200 000', unit: '₸/мес', desc: 'Постоянный кабинет, задачи, мониторинг и Q&A. Юрист как часть команды.', cta: 'Популярный', featured: true },
  { name: 'Investor Ready', price: '350 000', unit: '₸', desc: 'Cap table, data room, SAFE/SHA и ответы на DD за 3–4 недели.', cta: 'Перед раундом', featured: false },
]

function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`font-bold tracking-tightest ${className}`}>
      <span className="text-brand-blue">Kerege</span><span className="text-brand-green">.ON</span>
    </span>
  )
}

export default function Landing() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#capabilities', label: 'Возможности' },
    { href: '#how', label: 'Как работает' },
    { href: '#pricing', label: 'Пакеты' },
  ]

  return (
    <div className="min-h-screen bg-canvas font-sans text-ink">

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-shadow duration-200 ${scrolled ? 'shadow-sm' : ''}`}
        style={{ background: 'rgba(250,250,250,0.8)', backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-container mx-auto px-6 h-14 flex items-center justify-between border-b border-line">
          <Logo className="text-lg" />
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-muted hover:text-ink transition-colors">{l.label}</a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <Link to="/login" className="text-sm text-muted hover:text-ink px-3 py-2 transition-colors">Войти</Link>
            <Link to="/scan" className="text-sm font-medium text-white bg-brand-blue hover:opacity-85 px-4 py-2 rounded-md transition-opacity">Начать</Link>
          </div>
          <button className="md:hidden text-ink" onClick={() => setMenuOpen(v => !v)} aria-label="Меню">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-b border-line bg-canvas px-6 py-4 space-y-3">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-sm text-muted hover:text-ink">{l.label}</a>
            ))}
            <Link to="/scan" className="block text-sm font-medium text-white bg-brand-blue px-4 py-2 rounded-md text-center">Начать</Link>
          </div>
        )}
      </header>

      <section className="max-w-container mx-auto px-6 pt-40 pb-20">
        <div className="max-w-3xl animate-rise">
          <p className="text-xs uppercase tracking-[0.14em] text-muted mb-6">
            Юридическая операционная система · AI / IT · Казахстан
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tightest leading-[1.05] text-ink max-w-3xl">
            Вы строите продукт.<br />
            <span className="text-brand-green">Мы защищаем его</span> как систему.
          </h1>
          <p className="mt-6 text-lg text-muted max-w-xl leading-relaxed">
            Kerege.ON превращает юридические риски в управляемые задачи: владелец, статус, дедлайн, документ. От идеи и MVP до Astana Hub, IP, данных и инвестиций.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link to="/scan" className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-brand-blue hover:opacity-85 px-6 py-3 rounded-md transition-opacity">
              Пройти Legal Scan <ArrowRight size={16} />
            </Link>
            <a href="#capabilities" className="inline-flex items-center justify-center gap-2 text-sm font-medium text-ink border border-line hover:bg-brand-surface px-6 py-3 rounded-md transition-colors">
              Что внутри
            </a>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-line">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
            {stats.map(s => (
              <div key={s.label}>
                <div className="font-mono text-4xl font-semibold text-brand-blue leading-none">
                  {s.value}<span className="text-xl text-muted">{s.unit}</span>
                </div>
                <div className="mt-3 text-sm text-muted leading-snug max-w-[200px]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="max-w-container mx-auto px-6 py-24 border-t border-line">
        <p className="text-xs uppercase tracking-[0.12em] text-muted mb-3">Возможности</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tightest text-ink max-w-2xl">
          Один кабинет вместо писем, файлов и устных договорённостей
        </h2>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-xl overflow-hidden">
          {capabilities.map(c => (
            <div key={c.name} className="group bg-white p-6 transition-colors hover:bg-brand-surface">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-ink">{c.name}</h3>
                <ArrowUpRight size={16} className="text-line group-hover:text-brand-blue transition-colors" />
              </div>
              <p className="text-sm text-muted leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="max-w-container mx-auto px-6 py-24 border-t border-line">
        <p className="text-xs uppercase tracking-[0.12em] text-muted mb-3">Процесс</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tightest text-ink max-w-2xl">
          Три состояния, в которых живёт ваш стартап
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {workflow.map((w, i) => (
            <div key={w.phase} className="pt-6 border-t-2 border-brand-blue">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-mono text-sm text-muted">0{i + 1}</span>
                <h3 className="text-xl font-semibold text-ink">{w.phase}</h3>
              </div>
              <p className="text-sm text-muted leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="max-w-container mx-auto px-6 py-24 border-t border-line">
        <p className="text-xs uppercase tracking-[0.12em] text-muted mb-3">Пакеты</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tightest text-ink max-w-2xl">
          Выберите, что нужно сейчас. Можно комбинировать
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {packages.map(p => (
            <div key={p.name} className={`rounded-xl border p-7 transition-all hover:-translate-y-0.5 hover:shadow-md ${p.featured ? 'border-brand-blue bg-brand-blue text-white' : 'border-line bg-white'}`}>
              <div className={`text-xs uppercase tracking-[0.1em] mb-4 ${p.featured ? 'text-brand-green' : 'text-muted'}`}>{p.cta}</div>
              <h3 className={`text-lg font-semibold mb-2 ${p.featured ? 'text-white' : 'text-ink'}`}>{p.name}</h3>
              <div className="mb-4 flex items-baseline gap-1">
                <span className={`text-xs ${p.featured ? 'text-white/60' : 'text-muted'}`}>от</span>
                <span className={`font-mono text-3xl font-semibold ${p.featured ? 'text-white' : 'text-brand-blue'}`}>{p.price}</span>
                <span className={`text-sm ${p.featured ? 'text-white/70' : 'text-muted'}`}>{p.unit}</span>
              </div>
              <p className={`text-sm leading-relaxed mb-6 ${p.featured ? 'text-white/70' : 'text-muted'}`}>{p.desc}</p>
              <Link to="/scan" className={`inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-85 ${p.featured ? 'text-brand-green' : 'text-brand-blue'}`}>
                Начать <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-container mx-auto px-6 py-24 border-t border-line">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tightest text-ink">Начните с Legal Scan</h2>
          <p className="mt-4 text-lg text-muted max-w-lg leading-relaxed">
            Десять минут — и вы знаете, где находятся риски и какой документ нужен следующим. Без предоплаты, с фиксированной ценой этапов.
          </p>
          <Link to="/scan" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white bg-brand-blue hover:opacity-85 px-6 py-3 rounded-md transition-opacity">
            Пройти Legal Scan <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="max-w-container mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <Logo className="text-base" />
            <p className="mt-2 text-sm">
              <span className="text-brand-green font-medium">You Create.</span>{' '}
              <span className="text-brand-blue font-medium">We Protect.</span>
            </p>
          </div>
          <div className="text-sm text-muted">Sarsembaev Kanat · AI Legal Counsel · PhD</div>
          <a href="tel:+77017976342" className="font-mono text-sm text-ink hover:text-brand-blue transition-colors">+7 701 797 63 42</a>
        </div>
      </footer>

      <SocialFloat />
      <Assistant />
    </div>
  )
}
