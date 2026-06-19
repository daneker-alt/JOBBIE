import { supabase, isSupabaseConfigured } from './supabase'
import type { WorkspaceData } from './types'

// Уведомления не критичны для UX — ошибки и отсутствие Supabase backend
// игнорируются молча, чтобы не прерывать основной флоу пользователя.
export function notifyTeam(data: WorkspaceData, subject: string, message: string) {
  if (!isSupabaseConfigured || !supabase) return
  const to = data.team.map(m => m.email)
  if (!to.length) return
  supabase.functions.invoke('notify', { body: { to, subject, message } }).catch(() => {})
}
