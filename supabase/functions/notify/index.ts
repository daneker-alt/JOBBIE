// Supabase Edge Function (Deno) — отправка email-уведомлений команде через Resend.
// Хранит RESEND_API_KEY на сервере (Supabase secret), ключ не попадает в браузер.
//
// Деплой:
//   supabase functions deploy notify
//   supabase secrets set RESEND_API_KEY=re_...
//   supabase secrets set NOTIFY_FROM=notify@kerege.on
//
// Без задеплоенной функции вызовы из src/lib/notify.ts молча игнорируются —
// уведомления не критичны для работы платформы.

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM = Deno.env.get('NOTIFY_FROM') ?? 'notify@kerege.on'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RequestBody {
  to: string[]
  subject: string
  message: string
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS })

  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY не настроен на сервере' }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }

  try {
    const { to, subject, message } = (await req.json()) as RequestBody
    if (!to?.length) {
      return new Response(JSON.stringify({ error: 'Пустой список получателей' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      })
    }

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM,
        to,
        subject,
        text: message,
      }),
    })

    if (!resp.ok) {
      const errText = await resp.text()
      return new Response(JSON.stringify({ error: `Resend API error: ${errText}` }), {
        status: 502,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }
})
