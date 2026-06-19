import { supabase, isSupabaseConfigured } from './supabase'
import type { WorkspaceData } from './types'
import type { Lang } from '../i18n/types'

export interface ChatMessage {
  role: 'user' | 'assistant'
  text: string
}

// Реальный AI работает только если задеплоена supabase/functions/ai-assistant
// с секретом ANTHROPIC_API_KEY (ключ никогда не попадает в браузер).
// Без backend — используется простой FAQ-ответчик (см. вызывающий код).
export const aiAssistantAvailable = isSupabaseConfigured

export function summarizeWorkspace(d: WorkspaceData): string {
  const riskLines = d.risks.map(r => `${r.label}: ${r.score}/100`).join(', ')
  const ipRisks = d.ipAssets.filter(a => a.status === 'risk').map(a => a.name)
  const contractRisks = d.activeContracts.filter(c => c.status === 'risk').map(c => c.client)
  return [
    `Компания: ${d.companyProfile.name}`,
    `Риски по зонам: ${riskLines}`,
    ipRisks.length ? `IP-активы без оформленных прав: ${ipRisks.join(', ')}` : 'Все IP-активы оформлены',
    contractRisks.length ? `Контрагенты без подписанных договоров: ${contractRisks.join(', ')}` : 'Все активные контракты в порядке',
  ].join('\n')
}

export async function askAssistant(message: string, history: ChatMessage[], workspaceSummary: string, lang: Lang): Promise<string> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase не настроен — AI backend недоступен')
  }
  const { data, error } = await supabase.functions.invoke('ai-assistant', {
    body: { message, history, workspaceSummary, lang },
  })
  if (error) throw error
  if (data?.error) throw new Error(data.error)
  return data.reply as string
}
