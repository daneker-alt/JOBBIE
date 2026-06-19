import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useWorkspace } from '../lib/useWorkspace'
import { askAssistant, summarizeWorkspace, aiAssistantAvailable, type ChatMessage as AssistantHistoryMessage } from '../lib/assistant'

const faq = [
  { keywords: ['ip', 'права', 'код', 'assignment'], answer: 'IP Assignment оформляется между компанией и каждым основателем/подрядчиком. Это защищает права на код, дизайн и модели. Раздел IP Реестр поможет отследить статус.' },
  { keywords: ['data', 'данные', 'privacy', 'gdpr', 'персональные'], answer: 'Для работы с персональными данными в Казахстане нужны: Privacy Policy, форма согласия, регистрация в реестре МЮ РК. Проверьте статус в разделе Data & AI.' },
  { keywords: ['hub', 'astana', '90', 'выручка'], answer: 'Для Astana Hub нужно подтвердить структуру выручки: 90% должна быть от ИКТ-деятельности. Проверьте eligibility в разделе Astana Hub.' },
  { keywords: ['инвестор', 'dd', 'safe', 'cap table', 'инвестиц'], answer: 'Для DD инвестора нужны: чистый cap table, IP chain, data room, SAFE/SHA и privacy compliance. Раздел "Инвестиции" покажет готовность.' },
  { keywords: ['договор', 'контракт', 'sla', 'msa', 'saas'], answer: 'Базовый набор для B2B SaaS: MSA, SaaS Terms of Service, SLA с метриками uptime. Шаблоны доступны в разделе "Договоры".' },
  { keywords: ['scan', 'скан', 'начать', 'старт', 'риск'], answer: 'Начните с Legal Scan — 10-минутная анкета даст карту рисков по 4 зонам: IP, Data, Contracts, Investor Ready.' },
  { keywords: ['цена', 'стоимость', 'сколько', 'тариф', 'пакет'], answer: 'Legal Sprint (scan + roadmap): от 300 000 ₸. Monthly LegalOps: от 200 000 ₸/мес. Investor Ready: от 350 000 ₸. Позвоните для точного расчёта: +7 701 797 63 42' },
]
interface Message {
  role: 'assistant' | 'user'
  text: string
}

function getAnswer(msg: string, fallback: string): string {
  const lower = msg.toLowerCase()
  for (const item of faq) {
    if (item.keywords.some(k => lower.includes(k))) {
      return item.answer
    }
  }
  return fallback
}

export default function Assistant() {
  const { t, lang } = useLanguage()
  const { data } = useWorkspace()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: t.assistant.greeting }
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  async function send() {
    const text = input.trim()
    if (!text || thinking) return
    setInput('')
    const history: AssistantHistoryMessage[] = messages.map(m => ({ role: m.role, text: m.text }))
    setMessages(prev => [...prev, { role: 'user', text }])
    setThinking(true)

    if (aiAssistantAvailable) {
      try {
        const reply = await askAssistant(text, history, summarizeWorkspace(data), lang)
        setMessages(prev => [...prev, { role: 'assistant', text: reply }])
      } catch {
        setMessages(prev => [...prev, { role: 'assistant', text: getAnswer(text, t.assistant.fallback) }])
      } finally {
        setThinking(false)
      }
      return
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: getAnswer(text, t.assistant.fallback) }])
      setThinking(false)
    }, 500)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#0B2D6B] hover:bg-[#0a2660] text-white font-semibold text-sm px-4 py-3 rounded-full shadow-lg transition-all"
      >
        <MessageCircle size={18} />
        {t.assistant.title}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed z-50 bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden"
          style={{ bottom: '80px', left: '24px', width: '380px', height: '480px' }}
        >
          {/* Header */}
          <div className="bg-[#0B2D6B] text-white flex items-center justify-between px-4 py-3 shrink-0">
            <div className="font-semibold text-sm">{t.assistant.title}</div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] text-sm px-3 py-2 rounded-xl leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#0B2D6B] text-white rounded-br-sm'
                      : 'bg-[#F3F5F7] text-[#1F2937] rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex justify-start">
                <div className="bg-[#F3F5F7] text-[#1F2937] text-sm px-3 py-2 rounded-xl rounded-bl-sm">
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 px-3 py-3 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={t.assistant.placeholder}
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#0B2D6B] text-[#1F2937]"
            />
            <button
              onClick={send}
              disabled={!input.trim() || thinking}
              className="bg-[#16A334] hover:bg-[#138a2c] disabled:opacity-40 text-white p-2 rounded-lg transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
