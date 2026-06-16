import { FileText, Download, CheckCircle, AlertTriangle, Clock } from 'lucide-react'

const templates = [
  { name: 'MSA (Master Service Agreement)', desc: 'Базовый договор на оказание услуг для B2B клиентов', type: 'Sales', status: 'ready' },
  { name: 'SaaS Terms of Service', desc: 'Условия использования SaaS-продукта', type: 'Sales', status: 'ready' },
  { name: 'SLA (Service Level Agreement)', desc: 'Соглашение об уровне сервиса с метриками uptime', type: 'Sales', status: 'ready' },
  { name: 'POC / Pilot Agreement', desc: 'Договор на пилотный проект или PoC с клиентом', type: 'Sales', status: 'review' },
  { name: 'NDA (Non-Disclosure Agreement)', desc: 'Соглашение о неразглашении конфиденциальной информации', type: 'Corporate', status: 'ready' },
  { name: 'IP Assignment Agreement', desc: 'Передача прав на интеллектуальную собственность', type: 'IP', status: 'ready' },
  { name: 'Contractor Agreement', desc: 'Договор с внешним разработчиком или подрядчиком', type: 'IP', status: 'draft' },
  { name: 'Invoice Template (KZ)', desc: 'Счёт-фактура по требованиям НК РК', type: 'Finance', status: 'ready' },
]

const activeContracts = [
  { client: 'MedLab KZ', type: 'Pilot Agreement', signed: '1 апр 2025', expiry: '1 июл 2025', status: 'active' },
  { client: 'TechCorp Almaty', type: 'SaaS Terms + SLA', signed: '15 мар 2025', expiry: '15 мар 2026', status: 'active' },
  { client: 'HealthGov Ministry', type: 'MSA + POC', signed: '10 янв 2025', expiry: '10 янв 2026', status: 'active' },
  { client: 'AI Research Lab', type: 'NDA', signed: '5 мая 2025', expiry: '5 мая 2026', status: 'active' },
  { client: 'Dev Agency KZ', type: 'Contractor Agreement', signed: '—', expiry: '—', status: 'risk' },
]

const typeColors: Record<string, string> = {
  Sales: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Corporate: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  IP: 'text-green-400 bg-green-500/10 border-green-500/20',
  Finance: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
}

function TemplateBadge({ status }: { status: string }) {
  if (status === 'ready') return <span className="text-green-400 bg-green-500/10 border border-green-500/20 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle size={10} /> Готов</span>
  if (status === 'review') return <span className="text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><Clock size={10} /> На проверке</span>
  return <span className="text-gray-500 bg-gray-100 border border-gray-200 text-xs px-2 py-0.5 rounded-full">Черновик</span>
}

export default function ContractsHub() {
  const readyCount = templates.filter(t => t.status === 'ready').length

  return (
    <div className="space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-gray-500 text-xs mb-1">Шаблонов готово</div>
              <div className="text-2xl font-bold text-[#0B2D6B]">{readyCount}/{templates.length}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-gray-500 text-xs mb-1">Активных договоров</div>
              <div className="text-2xl font-bold text-[#0B2D6B]">{activeContracts.filter(c => c.status === 'active').length}</div>
            </div>
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
              <div className="text-gray-500 text-xs mb-1">Требуют внимания</div>
              <div className="text-2xl font-bold text-red-400">{activeContracts.filter(c => c.status === 'risk').length}</div>
            </div>
          </div>

          {/* Templates */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-[#1F2937] font-semibold">Шаблоны договоров</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-px bg-gray-100">
              {templates.map(({ name, desc, type, status }) => (
                <div key={name} className="bg-white p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-start gap-3">
                      <FileText size={16} className="text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-[#1F2937] text-sm font-medium">{name}</div>
                        <div className="text-gray-400 text-xs mt-0.5">{desc}</div>
                      </div>
                    </div>
                    <TemplateBadge status={status} />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className={`text-xs border px-2 py-0.5 rounded-full ${typeColors[type] || 'text-gray-500 bg-gray-100 border-gray-300'}`}>{type}</span>
                    <button className="flex items-center gap-1.5 text-[#0B2D6B] hover:text-[#0B2D6B] text-xs transition-colors">
                      <Download size={12} /> Скачать
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Contracts */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-[#1F2937] font-semibold">Активные договоры</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    {['Клиент', 'Тип договора', 'Подписан', 'Истекает', 'Статус'].map(h => (
                      <th key={h} className="text-left text-gray-400 font-medium px-5 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeContracts.map(c => (
                    <tr key={c.client} className="border-b border-gray-100 hover:bg-gray-100/30 transition-colors">
                      <td className="px-5 py-3 text-gray-700 font-medium">{c.client}</td>
                      <td className="px-5 py-3 text-gray-500">{c.type}</td>
                      <td className="px-5 py-3 text-gray-500">{c.signed}</td>
                      <td className="px-5 py-3 text-gray-500">{c.expiry}</td>
                      <td className="px-5 py-3">
                        {c.status === 'active'
                          ? <span className="text-green-400 text-xs flex items-center gap-1"><CheckCircle size={12} /> Активен</span>
                          : <span className="text-red-400 text-xs flex items-center gap-1"><AlertTriangle size={12} /> Риск</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

    </div>
  )
}
