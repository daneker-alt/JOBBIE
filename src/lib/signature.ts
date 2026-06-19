// Реальная ЭЦП РК: NCALayer — бесплатное ПО НУЦ РК (то же, что использует egov.kz и банки).
// Работает только если у пользователя установлен и запущен NCALayer и подключён ключ (.p12).
// Протокол: локальный WebSocket-сервер NCALayer на wss://127.0.0.1:13579/.
// Если NCALayer не запущен (нет ключа НУЦ РК) — UI должен предложить запасной вариант (simple signature),
// который НЕ является юридической ЭЦП и должен быть явно помечен как таковой.

const NCALAYER_WS_URL = 'wss://127.0.0.1:13579/'
const NCALAYER_TIMEOUT_MS = 4000

export interface NcaLayerSignResult {
  cms: string
  signerCert: string
}

function bufferToBase64(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
}

export async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('')
}

// Подписывает base64-контент через локальный NCALayer (CMS/CAdES, открепленная подпись).
// Бросает ошибку, если NCALayer не запущен, недоступен по таймауту, или пользователь отменил выбор ключа.
export function signWithNcaLayer(base64Content: string): Promise<NcaLayerSignResult> {
  return new Promise((resolve, reject) => {
    let settled = false
    let ws: WebSocket
    try {
      ws = new WebSocket(NCALAYER_WS_URL)
    } catch {
      reject(new Error('NCALayer недоступен'))
      return
    }

    const timer = setTimeout(() => {
      if (settled) return
      settled = true
      ws.close()
      reject(new Error('NCALayer не отвечает — приложение не запущено'))
    }, NCALAYER_TIMEOUT_MS)

    ws.onopen = () => {
      ws.send(JSON.stringify({
        module: 'kz.gov.pki.knca.commonUtils',
        method: 'createCAdESFromBase64',
        args: {
          storageType: 'PKCS12',
          base64Content,
          signingParams: { decode: false, encapsulate: true, digested: false, tsaProfile: {} },
          locale: 'ru',
        },
      }))
    }

    ws.onmessage = (event) => {
      if (settled) return
      try {
        const msg = JSON.parse(event.data)
        if (msg.status === false) {
          settled = true
          clearTimeout(timer)
          ws.close()
          reject(new Error(msg.message || 'Подписание отменено пользователем'))
          return
        }
        if (msg.responseObject) {
          settled = true
          clearTimeout(timer)
          ws.close()
          resolve({ cms: msg.responseObject, signerCert: msg.responseObject2 || '' })
        }
      } catch {
        settled = true
        clearTimeout(timer)
        ws.close()
        reject(new Error('Некорректный ответ NCALayer'))
      }
    }

    ws.onerror = () => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      reject(new Error('NCALayer не запущен на этом устройстве'))
    }
  })
}

export async function hashBlobAsBase64Sha256(blob: Blob): Promise<{ base64: string; hashHex: string }> {
  const buf = await blob.arrayBuffer()
  const digest = await crypto.subtle.digest('SHA-256', buf)
  return { base64: bufferToBase64(buf), hashHex: Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('') }
}
