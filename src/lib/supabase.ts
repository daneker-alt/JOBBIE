import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// Платформа работает в двух режимах:
// 1. Supabase (продакшн) — если заданы VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY.
// 2. Demo (локально / GitHub Pages) — авторизация и данные в localStorage браузера.
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured
  ? createClient(url!, anonKey!)
  : null
