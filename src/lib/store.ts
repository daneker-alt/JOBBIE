import { supabase, isSupabaseConfigured } from './supabase'
import type { WorkspaceData } from './types'

export const defaultWorkspace: WorkspaceData = {
  companyProfile: {
    name: 'ТОО «AI Health Assistant»',
    bin: '230140012345',
    address: 'г. Астана, р-н Есиль, пр. Мангилик Ел, 55/20',
    director: 'Алибек Нурланов',
    iban: 'KZ123456789012345678',
    bank: 'АО «Kaspi Bank»',
    bik: 'CASPKZKA',
  },
  team: [
    { id: 'u1', name: 'Алибек Нурланов', email: 'admin@kerege.kz', role: 'admin', invitedAt: '2025-01-10' },
    { id: 'u2', name: 'MedLab KZ', email: 'client@kerege.kz', role: 'client', invitedAt: '2025-04-01' },
  ],
  auditLog: [],
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
  ipAssets: [
    { id: 1, name: 'Backend API (Node.js)', type: 'Код', owner: 'AI Health Assistant Ltd', status: 'assigned', contractors: '', notes: 'IP assignment подписан всеми основателями', riskScore: 25 },
    { id: 2, name: 'ML Health Model v2', type: 'AI-модель', owner: 'Алибек (основатель)', status: 'risk', contractors: '', notes: 'Не передано на компанию — нужен IP assignment', riskScore: 85 },
    { id: 3, name: 'UI/UX Design System', type: 'Дизайн', owner: 'AI Health Assistant Ltd', status: 'pending', contractors: 'Freelance Designer', notes: 'Ожидает подписания от подрядчика', riskScore: 55 },
    { id: 4, name: 'Training Dataset v1', type: 'Датасет', owner: 'AI Health Assistant Ltd', status: 'assigned', contractors: '', notes: 'Датасет собственный, лицензия оформлена', riskScore: 25 },
    { id: 5, name: 'Mobile App (React Native)', type: 'Код', owner: 'Диана (основатель)', status: 'risk', contractors: 'Dev Agency KZ', notes: 'Нет IP assignment от подрядчика и основателя', riskScore: 85 },
  ],
  privacyItems: [
    { title: 'Privacy Policy опубликована', done: true, note: 'Политика конфиденциальности доступна на сайте и в приложении' },
    { title: 'Согласие на обработку данных', done: true, note: 'Пользователь явно даёт согласие перед обработкой персональных данных' },
    { title: 'Health data consent', done: false, note: 'Отдельное согласие на обработку медицинских данных (требует ст. 8 ЗРК)' },
    { title: 'Локализация данных', done: false, note: 'Персональные данные граждан РК хранятся на серверах в Казахстане' },
    { title: 'Реестр оператора персональных данных', done: false, note: 'Компания зарегистрирована в реестре операторов ПД МЮ РК' },
    { title: 'Data retention policy', done: true, note: 'Определены сроки хранения и удаления персональных данных' },
    { title: 'Breach notification процедура', done: false, note: 'Есть план действий при утечке данных' },
    { title: 'DPA с подрядчиками', done: true, note: 'Data Processing Agreement подписан с облачными провайдерами' },
  ],
  datasets: [
    { name: 'User Health Profiles', size: '12,400 записей', sensitivity: 'high', consent: 'Да', location: 'KZ (AWS ap-southeast-1)', status: 'risk' },
    { name: 'Anonymized Diagnostics', size: '85,000 записей', sensitivity: 'medium', consent: 'Да', location: 'KZ (AWS ap-southeast-1)', status: 'ok' },
    { name: 'App Usage Analytics', size: '240,000 событий', sensitivity: 'low', consent: 'Да', location: 'KZ', status: 'ok' },
    { name: 'Medical Images (beta)', size: '3,200 файлов', sensitivity: 'high', consent: 'Частично', location: 'EU (AWS eu-west-1)', status: 'risk' },
  ],
  aiDisclaimers: [
    { title: 'AI не является медицинским советом', done: true },
    { title: 'Модель прошла внутреннее тестирование', done: true },
    { title: 'Версионирование AI-модели документировано', done: false },
    { title: 'Explainability / bias disclosure', done: false },
    { title: 'Human-in-the-loop для критических решений', done: true },
  ],
  hubEligibility: [
    { title: 'Зарегистрирована в Казахстане', done: true },
    { title: 'Деятельность относится к ИТ/ИКТ', done: true },
    { title: 'Выручка от ИКТ ≥ 90%', done: false, note: 'Текущий показатель: 78%' },
    { title: 'Наличие технической документации', done: true },
    { title: 'Команда разработчиков', done: true },
    { title: 'Продукт или сервис готов / в разработке', done: true },
    { title: 'Нет задолженностей по налогам', done: true },
    { title: 'Уставный капитал соответствует требованиям', done: false, note: 'Требует уточнения' },
  ],
  hubRequiredDocs: [
    { title: 'Устав компании (актуальный)', done: true },
    { title: 'Свидетельство о регистрации', done: true },
    { title: 'Выписка из ЕГРЮЛ', done: true },
    { title: 'Договоры с клиентами (ИКТ)', done: true },
    { title: 'Акты выполненных работ', done: false },
    { title: 'Справка об отсутствии задолженностей', done: false },
    { title: 'Описание продукта/сервиса', done: true },
    { title: 'Структура выручки (90/10 обоснование)', done: false },
  ],
  hubRevenue: [
    { month: 'Янв', ict: 75, other: 25 },
    { month: 'Фев', ict: 80, other: 20 },
    { month: 'Мар', ict: 78, other: 22 },
    { month: 'Апр', ict: 82, other: 18 },
    { month: 'Май', ict: 85, other: 15 },
    { month: 'Июн', ict: 78, other: 22 },
  ],
  contractTemplates: [
    { name: 'MSA (Master Service Agreement)', desc: 'Базовый договор на оказание услуг для B2B клиентов', type: 'Sales', status: 'ready' },
    { name: 'SaaS Terms of Service', desc: 'Условия использования SaaS-продукта', type: 'Sales', status: 'ready' },
    { name: 'SLA (Service Level Agreement)', desc: 'Соглашение об уровне сервиса с метриками uptime', type: 'Sales', status: 'ready' },
    { name: 'POC / Pilot Agreement', desc: 'Договор на пилотный проект или PoC с клиентом', type: 'Sales', status: 'review' },
    { name: 'NDA (Non-Disclosure Agreement)', desc: 'Соглашение о неразглашении конфиденциальной информации', type: 'Corporate', status: 'ready' },
    { name: 'IP Assignment Agreement', desc: 'Передача прав на интеллектуальную собственность', type: 'IP', status: 'ready' },
    { name: 'Contractor Agreement', desc: 'Договор с внешним разработчиком или подрядчиком', type: 'IP', status: 'draft' },
    { name: 'Invoice Template (KZ)', desc: 'Счёт-фактура по требованиям НК РК', type: 'Finance', status: 'ready' },
  ],
  activeContracts: [
    { client: 'MedLab KZ', type: 'Pilot Agreement', signed: '1 апр 2025', expiry: '1 июл 2025', status: 'active' },
    { client: 'TechCorp Almaty', type: 'SaaS Terms + SLA', signed: '15 мар 2025', expiry: '15 мар 2026', status: 'active' },
    { client: 'HealthGov Ministry', type: 'MSA + POC', signed: '10 янв 2025', expiry: '10 янв 2026', status: 'active' },
    { client: 'AI Research Lab', type: 'NDA', signed: '5 мая 2025', expiry: '5 мая 2026', status: 'active' },
    { client: 'Dev Agency KZ', type: 'Contractor Agreement', signed: '—', expiry: '—', status: 'risk' },
  ],
  ddCategories: [
    { name: 'Corporate', items: [
      { title: 'Устав и учредительные документы', done: true },
      { title: 'Корпоративная структура', done: true },
      { title: 'Протоколы собраний участников', done: false },
      { title: 'Акционерное соглашение (SHA)', done: false },
    ] },
    { name: 'IP & Technology', items: [
      { title: 'IP assignment — все основатели', done: false },
      { title: 'IP assignment — подрядчики', done: false },
      { title: 'Описание технологического стека', done: true },
      { title: 'Open source audit', done: true },
    ] },
    { name: 'Data & Privacy', items: [
      { title: 'Privacy Policy актуальная', done: true },
      { title: 'Реестр персональных данных', done: false },
      { title: 'Согласия пользователей', done: true },
      { title: 'Локализация данных', done: false },
    ] },
    { name: 'Contracts', items: [
      { title: 'Ключевые клиентские договоры', done: true },
      { title: 'Партнёрские соглашения', done: true },
      { title: 'Трудовые договоры / NDA', done: true },
      { title: 'SaaS Terms of Service', done: true },
    ] },
    { name: 'Finance', items: [
      { title: 'Финансовая отчётность (2 года)', done: false },
      { title: 'Cap table чистый', done: true },
      { title: 'SAFE / конвертируемые займы', done: true },
      { title: 'Tax compliance', done: true },
    ] },
  ],
  investorDocs: [
    { name: 'SAFE Agreement — Angel Round', status: 'signed', date: 'мар 2025' },
    { name: 'SHA (Shareholders Agreement) — Draft', status: 'draft', date: '' },
    { name: 'Cap Table (Excel)', status: 'ready', date: 'май 2025' },
    { name: 'Financial Model', status: 'ready', date: 'май 2025' },
    { name: 'Pitch Deck', status: 'ready', date: 'июн 2025' },
    { name: 'Data Room Index', status: 'draft', date: '' },
  ],
  journeySteps: [
    { num: 1, status: 'done' },
    { num: 2, status: 'in-progress' },
    { num: 3, status: 'pending' },
    { num: 4, status: 'pending' },
    { num: 5, status: 'pending' },
    { num: 6, status: 'pending' },
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
    if (data?.data) return { ...defaultWorkspace, ...(data.data as WorkspaceData) }
    // первый вход — создаём workspace по умолчанию
    await supabase.from('workspaces').insert({ owner_id: ownerId, data: defaultWorkspace })
    return structuredClone(defaultWorkspace)
  }

  const raw = localStorage.getItem(LS_KEY)
  if (raw) {
    try { return { ...defaultWorkspace, ...(JSON.parse(raw) as WorkspaceData) } } catch { /* пере-сеем ниже */ }
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
