import { CheckCircle, AlertTriangle, Building2, Calendar, TrendingUp } from 'lucide-react'

const eligibilityItems = [
  { title: 'Зарегистрирована в Казахстане', done: true },
  { title: 'Деятельность относится к ИТ/ИКТ', done: true },
  { title: 'Выручка от ИКТ ≥ 90%', done: false, note: 'Текущий показатель: 78%' },
  { title: 'Наличие технической документации', done: true },
  { title: 'Команда разработчиков', done: true },
  { title: 'Продукт или сервис готов / в разработке', done: true },
  { title: 'Нет задолженностей по налогам', done: true },
  { title: 'Уставный капитал соответствует требованиям', done: false, note: 'Требует уточнения' },
]

const revenueData = [
  { month: 'Янв', ict: 75, other: 25 },
  { month: 'Фев', ict: 80, other: 20 },
  { month: 'Мар', ict: 78, other: 22 },
  { month: 'Апр', ict: 82, other: 18 },
  { month: 'Май', ict: 85, other: 15 },
  { month: 'Июн', ict: 78, other: 22 },
]

const calendarEvents = [
  { date: '20 июня 2025', title: 'Квартальный отчёт Q2', type: 'report', urgent: true },
  { date: '1 июля 2025', title: '90/10 Revenue Review Q2', type: 'review', urgent: true },
  { date: '15 июля 2025', title: 'Аудит состава команды', type: 'audit', urgent: false },
  { date: '1 октября 2025', title: 'Квартальный отчёт Q3', type: 'report', urgent: false },
  { date: '15 декабря 2025', title: 'Годовой compliance review', type: 'review', urgent: false },
]

const requiredDocs = [
  { name: 'Устав компании (актуальный)', done: true },
  { name: 'Свидетельство о регистрации', done: true },
  { name: 'Выписка из ЕГРЮЛ', done: true },
  { name: 'Договоры с клиентами (ИКТ)', done: true },
  { name: 'Акты выполненных работ', done: false },
  { name: 'Справка об отсутствии задолженностей', done: false },
  { name: 'Описание продукта/сервиса', done: true },
  { name: 'Структура выручки (90/10 обоснование)', done: false },
]

export default function AstanaHub() {
  const eligScore = eligibilityItems.filter(i => i.done).length
  const docScore = requiredDocs.filter(d => d.done).length
  const avgIct = Math.round(revenueData.reduce((s, d) => s + d.ict, 0) / revenueData.length)

  return (
    <div className="space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className={`border rounded-xl p-4 shadow-sm hover:shadow-md transition ${eligScore === eligibilityItems.length ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className="text-muted text-xs mb-1">Eligibility</div>
              <div className={`text-2xl font-mono font-semibold ${eligScore === eligibilityItems.length ? 'text-green-700' : 'text-amber-700'}`}>
                {eligScore}/{eligibilityItems.length}
              </div>
              <div className="text-muted text-xs mt-1">критериев выполнено</div>
            </div>
            <div className={`border rounded-xl p-4 shadow-sm hover:shadow-md transition ${avgIct >= 90 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="text-muted text-xs mb-1">ИКТ-выручка (avg)</div>
              <div className={`text-2xl font-mono font-semibold ${avgIct >= 90 ? 'text-green-700' : 'text-red-700'}`}>{avgIct}%</div>
              <div className={`text-xs mt-1 ${avgIct >= 90 ? 'text-green-700/70' : 'text-red-700/70'}`}>
                {avgIct >= 90 ? 'Требование выполнено' : 'Ниже порога 90%'}
              </div>
            </div>
            <div className="bg-white border border-line rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <div className="text-muted text-xs mb-1">Документы</div>
              <div className="text-2xl font-mono font-semibold text-brand-blue">{docScore}/{requiredDocs.length}</div>
              <div className="text-muted text-xs mt-1">готово</div>
            </div>
          </div>

          {avgIct < 90 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle size={18} className="text-red-600 mt-0.5 shrink-0" />
              <div>
                <div className="text-red-700 font-semibold text-sm mb-1">Правило 90/10 нарушено</div>
                <div className="text-red-700/80 text-xs">
                  Средняя ИКТ-выручка за период составляет <span className="font-mono">{avgIct}%</span>, что ниже обязательного порога 90%.
                  Необходимо пересмотреть структуру выручки или контрактную базу до квартального отчёта.
                </div>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Eligibility */}
            <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
              <h2 className="text-ink font-semibold mb-4 flex items-center gap-2 tracking-tightest">
                <Building2 size={16} className="text-brand-blue" /> Eligibility Checker
              </h2>
              <div className="space-y-3">
                {eligibilityItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    {item.done
                      ? <CheckCircle size={14} className="text-green-600 mt-0.5 shrink-0" />
                      : <AlertTriangle size={14} className="text-amber-600 mt-0.5 shrink-0" />}
                    <div>
                      <div className={`text-sm ${item.done ? 'text-ink' : 'text-muted'}`}>{item.title}</div>
                      {item.note && <div className="text-amber-700/80 text-xs">{item.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Tracker */}
            <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
              <h2 className="text-ink font-semibold mb-4 flex items-center gap-2 tracking-tightest">
                <TrendingUp size={16} className="text-brand-blue" /> 90/10 Revenue Track
              </h2>
              <div className="space-y-3">
                {revenueData.map(({ month, ict, other }) => (
                  <div key={month}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted">{month}</span>
                      <span className={`font-mono ${ict >= 90 ? 'text-green-700' : 'text-red-700'}`}>{ict}% ИКТ</span>
                    </div>
                    <div className="w-full bg-line rounded-full h-2 flex overflow-hidden">
                      <div className={`h-2 ${ict >= 90 ? 'bg-brand-green' : 'bg-red-500'}`} style={{ width: `${ict}%` }} />
                      <div className="h-2 bg-line" style={{ width: `${other}%` }} />
                    </div>
                    <div className="flex justify-between text-xs mt-0.5">
                      <span className="text-muted">90% порог</span>
                      <span className="text-muted font-mono">{other}% прочее</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Calendar */}
            <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
              <h2 className="text-ink font-semibold mb-4 flex items-center gap-2 tracking-tightest">
                <Calendar size={16} className="text-brand-blue" /> Compliance Calendar
              </h2>
              <div className="space-y-3">
                {calendarEvents.map(({ date, title, urgent }) => (
                  <div key={date} className={`rounded-xl p-3 border ${urgent ? 'bg-red-50 border-red-200' : 'bg-brand-surface border-line'}`}>
                    <div className="text-muted text-xs mb-0.5 font-mono">{date}</div>
                    <div className={`text-sm font-medium ${urgent ? 'text-red-700' : 'text-ink'}`}>{title}</div>
                    {urgent && <div className="text-red-700/70 text-xs mt-0.5">Срочно</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Required Docs */}
          <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
            <h2 className="text-ink font-semibold mb-4 tracking-tightest">Обязательные документы для Astana Hub</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {requiredDocs.map((doc, i) => (
                <div key={i} className="flex items-center gap-2">
                  {doc.done
                    ? <CheckCircle size={14} className="text-green-600 shrink-0" />
                    : <AlertTriangle size={14} className="text-amber-600 shrink-0" />}
                  <span className={`text-sm ${doc.done ? 'text-ink' : 'text-muted'}`}>{doc.name}</span>
                </div>
              ))}
            </div>
          </div>

    </div>
  )
}
