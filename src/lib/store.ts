import { supabase, isSupabaseConfigured } from './supabase'
import type { WorkspaceData } from './types'

export const defaultWorkspace: WorkspaceData = {
  risks: [
    { label: 'IP', score: 40 },
    { label: 'Data', score: 55 },
    { label: 'Hub', score: 80 },
    { label: 'Sales', score: 70 },
    { label: 'Investor', score: 30 },
  ],
  documents: [
    { name: 'NDA / Founder Terms', status: 'ready', type: 'Corporate' },
    { name: 'IP Assignment Package', status: 'pending', type: 'IP' },
    { name: 'Privacy Policy + Consent', status: 'pending', type: 'Data' },
    { name: 'SaaS Terms / SLA', status: 'ready', type: 'Sales' },
    { name: 'Astana Hub Memo', status: 'ready', type: 'Hub' },
    { name: 'Investor DD Package', status: 'draft', type: 'Invest' },
  ],
  tasks: [
    { title: 'IP Assignment', description: '2 founders · 1 contractor · нет подписанных соглашений', status: 'urgent', deadline: 'Пятница', assignees: ['Алибек', 'Диана'] },
    { title: 'Privacy Notice', description: 'Health-data flow требует обновления consent policy', status: 'in-progress', deadline: '20 июня', assignees: ['Алибек'] },
    { title: 'Pilot Agreement', description: 'POC шаблон готов к согласованию с клиентом', status: 'ready', deadline: '25 июня', assignees: ['Диана', 'Клиент'] },
  ],
  calendar: [
    { date: '14 июня', event: 'IP assignment deadline — founders', urgent: true },
    { date: '20 июня', event: 'Astana Hub — квартальный отчёт', urgent: false },
    { date: '25 июня', event: 'Pilot agreement — клиент review', urgent: false },
    { date: '1 июля', event: '90/10 revenue review Q2', urgent: false },
  ],
}

const LS_KEY = 'kerege.workspace'

// owner_id привязывает workspace к клиенту. В demo-режиме — один общий workspace.
export async function loadWorkspace(ownerId: string): Promise<WorkspaceData> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('workspaces')
      .select('data')
      .eq('owner_id', ownerId)
      .maybeSingle()
    if (error) throw error
    if (data?.data) return data.data as WorkspaceData
    // первый вход — создаём workspace по умолчанию
    await supabase.from('workspaces').insert({ owner_id: ownerId, data: defaultWorkspace })
    return structuredClone(defaultWorkspace)
  }

  const raw = localStorage.getItem(LS_KEY)
  if (raw) {
    try { return JSON.parse(raw) as WorkspaceData } catch { /* пере-сеем ниже */ }
  }
  localStorage.setItem(LS_KEY, JSON.stringify(defaultWorkspace))
  return structuredClone(defaultWorkspace)
}

export async function saveWorkspace(ownerId: string, data: WorkspaceData): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('workspaces')
      .upsert({ owner_id: ownerId, data }, { onConflict: 'owner_id' })
    if (error) throw error
    return
  }
  localStorage.setItem(LS_KEY, JSON.stringify(data))
}
