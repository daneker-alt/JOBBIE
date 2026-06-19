// Supabase Edge Function (Deno) — прокси к Claude API.
// Хранит ANTHROPIC_API_KEY на сервере (Supabase secret), чтобы ключ не попадал в браузер.
//
// Деплой:
//   supabase functions deploy ai-assistant
//   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
//
// Без задеплоенной функции (или без Supabase-проекта) фронтенд автоматически
// откатывается на простой FAQ-ответчик (см. src/lib/assistant.ts).

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')
const MODEL = 'claude-sonnet-4-6'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ChatMessage {
  role: 'user' | 'assistant'
  text: string
}

interface RequestBody {
  message: string
  history?: ChatMessage[]
  workspaceSummary?: string
  lang?: 'ru' | 'kk' | 'en'
}

const SYSTEM_PROMPT = (workspaceSummary: string, lang: string) => `
Ты — AI Legal Counsel внутри Kerege.ON, юридической ОС для AI/IT-стартапов в Казахстане.
Отвечай кратко (3-6 предложений), по делу, на ${lang === 'kk' ? 'казахском' : lang === 'en' ? 'английском' : 'русском'} языке.
Опирайся на законодательство Республики Казахстан (ГК РК, Налоговый кодекс РК, Закон «О персональных данных и их защите», программа Astana Hub).
Если вопрос требует точной юридической консультации по конкретной сделке — прямо скажи, что нужна проверка практикующим юристом РК.
Контекст текущего воркспейса клиента:
${workspaceSummary}
`

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS })

  if (!ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY не настроен на сервере' }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }

  try {
    const { message, history = [], workspaceSummary = '', lang = 'ru' } = (await req.json()) as RequestBody

    const messages = [
      ...history.slice(-8).map(h => ({ role: h.role, content: h.text })),
      { role: 'user', content: message },
    ]

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 500,
        system: SYSTEM_PROMPT(workspaceSummary, lang),
        messages,
      }),
    })

    if (!resp.ok) {
      const errText = await resp.text()
      return new Response(JSON.stringify({ error: `Anthropic API error: ${errText}` }), {
        status: 502,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      })
    }

    const data = await resp.json()
    const reply = data.content?.[0]?.text ?? ''
    return new Response(JSON.stringify({ reply }), {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }
})
