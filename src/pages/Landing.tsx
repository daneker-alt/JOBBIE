import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import SocialFloat from '../components/SocialFloat'
import Assistant from '../components/Assistant'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'

const featuredPackageIndex = 1

function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`font-bold tracking-tightest ${className}`}>
      <span className="text-brand-blue">Kerege</span><span className="text-brand-green">.ON</span>
    </span>
  )
}

export default function Landing() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#capabilities', label: t.landing.navCapabilities },
    { href: '#how', label: t.landing.navHow },
    { href: '#pricing', label: t.landing.navPricing },
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
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link to="/login" className="text-sm text-muted hover:text-ink px-3 py-2 transition-colors">{t.landing.login}</Link>
            <Link to="/scan" className="text-sm font-medium text-white bg-brand-blue hover:opacity-85 px-4 py-2 rounded-md transition-opacity">{t.landing.start}</Link>
          </div>
          <button className="md:hidden text-ink" onClick={() => setMenuOpen(v => !v)} aria-label={t.landing.menuAria}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-b border-line bg-canvas px-6 py-4 space-y-3">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-sm text-muted hover:text-ink">{l.label}</a>
            ))}
            <LanguageSwitcher />
            <Link to="/scan" className="block text-sm font-medium text-white bg-brand-blue px-4 py-2 rounded-md text-center">{t.landing.start}</Link>
          </div>
        )}
      </header>

      <section className="max-w-container mx-auto px-6 pt-40 pb-20">
        <div className="max-w-3xl animate-rise">
          <p className="text-xs uppercase tracking-[0.14em] text-muted mb-6">
            {t.landing.eyebrow}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tightest leading-[1.05] text-ink max-w-3xl">
            <span className="text-brand-green">{t.landing.heroTitle1}</span><br />
            {t.landing.heroTitle2}
          </h1>
          <p className="mt-6 text-lg text-muted max-w-xl leading-relaxed">
            {t.landing.heroSubtitle}
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link to="/scan" className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-brand-blue hover:opacity-85 px-6 py-3 rounded-md transition-opacity">
              {t.landing.ctaScan} <ArrowRight size={16} />
            </Link>
            <a href="#capabilities" className="inline-flex items-center justify-center gap-2 text-sm font-medium text-ink border border-line hover:bg-brand-surface px-6 py-3 rounded-md transition-colors">
              {t.landing.ctaWhatsInside}
            </a>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-line">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
            {t.landing.stats.map(s => (
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
        <p className="text-xs uppercase tracking-[0.12em] text-muted mb-3">{t.landing.capabilitiesEyebrow}</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tightest text-ink max-w-2xl">
          {t.landing.capabilitiesTitle}
        </h2>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-xl overflow-hidden">
          {t.landing.capabilities.map(c => (
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
        <p className="text-xs uppercase tracking-[0.12em] text-muted mb-3">{t.landing.processEyebrow}</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tightest text-ink max-w-2xl">
          {t.landing.processTitle}
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {t.landing.workflow.map((w, i) => (
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
        <p className="text-xs uppercase tracking-[0.12em] text-muted mb-3">{t.landing.pricingEyebrow}</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tightest text-ink max-w-2xl">
          {t.landing.pricingTitle}
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {t.landing.packages.map((p, i) => {
            const featured = i === featuredPackageIndex
            return (
              <div key={p.name} className={`rounded-xl border p-7 transition-all hover:-translate-y-0.5 hover:shadow-md ${featured ? 'border-brand-blue bg-brand-blue text-white' : 'border-line bg-white'}`}>
                <div className={`text-xs uppercase tracking-[0.1em] mb-4 ${featured ? 'text-brand-green' : 'text-muted'}`}>{p.cta}</div>
                <h3 className={`text-lg font-semibold mb-2 ${featured ? 'text-white' : 'text-ink'}`}>{p.name}</h3>
                <div className="mb-4 flex items-baseline gap-1">
                  <span className={`text-xs ${featured ? 'text-white/60' : 'text-muted'}`}>{t.landing.priceFrom}</span>
                  <span className={`font-mono text-3xl font-semibold ${featured ? 'text-white' : 'text-brand-blue'}`}>{p.price}</span>
                  <span className={`text-sm ${featured ? 'text-white/70' : 'text-muted'}`}>{p.unit}</span>
                </div>
                <p className={`text-sm leading-relaxed mb-6 ${featured ? 'text-white/70' : 'text-muted'}`}>{p.desc}</p>
                <Link to="/scan" className={`inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-85 ${featured ? 'text-brand-green' : 'text-brand-blue'}`}>
                  {t.landing.start} <ArrowRight size={14} />
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      <section className="max-w-container mx-auto px-6 py-24 border-t border-line">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tightest text-ink">{t.landing.closingTitle}</h2>
          <p className="mt-4 text-lg text-muted max-w-lg leading-relaxed">
            {t.landing.closingSubtitle}
          </p>
          <Link to="/scan" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white bg-brand-blue hover:opacity-85 px-6 py-3 rounded-md transition-opacity">
            {t.landing.ctaScan} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="max-w-container mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <Logo className="text-base" />
            <p className="mt-2 text-sm">
              <span className="text-brand-green font-medium">{t.common.taglineCreate}</span>{' '}
              <span className="text-brand-blue font-medium">{t.common.taglineProtect}</span>
            </p>
          </div>
          <div className="text-sm text-muted">{t.landing.footerCredit}</div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-muted hover:text-ink transition-colors">Конфиденциальность</Link>
            <Link to="/terms" className="text-sm text-muted hover:text-ink transition-colors">Условия</Link>
            <a href="tel:+77017976342" className="font-mono text-sm text-ink hover:text-brand-blue transition-colors">+7 701 797 63 42</a>
          </div>
        </div>
      </footer>

      <SocialFloat />
      <Assistant />
    </div>
  )
}
