import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { AuthUser, Role } from '../lib/types'

interface AuthState {
  user: AuthUser | null
  loading: boolean
  isAdmin: boolean
  demoMode: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthState | undefined>(undefined)

const DEMO_KEY = 'kerege.auth'

// Demo-аккаунты для режима без бэкенда.
const DEMO_USERS: Record<string, Role> = {
  'admin@kerege.kz': 'admin',
  'client@kerege.kz': 'client',
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(async ({ data }) => {
        if (data.session) await hydrateFromSupabase(data.session.user.id, data.session.user.email || '')
        setLoading(false)
      })
      const { data: sub } = supabase.auth.onAuthStateChange(async (_e, session) => {
        if (session) await hydrateFromSupabase(session.user.id, session.user.email || '')
        else setUser(null)
      })
      return () => sub.subscription.unsubscribe()
    }
    // demo
    const raw = localStorage.getItem(DEMO_KEY)
    if (raw) { try { setUser(JSON.parse(raw)) } catch { /* ignore */ } }
    setLoading(false)
  }, [])

  async function hydrateFromSupabase(id: string, email: string) {
    let role: Role = 'client'
    const { data } = await supabase!.from('profiles').select('role').eq('id', id).maybeSingle()
    if (data?.role) role = data.role as Role
    setUser({ id, email, role })
  }

  async function signIn(email: string, password: string) {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      return
    }
    // demo: пароль не проверяется, роль — по списку demo-аккаунтов
    const role = DEMO_USERS[email.toLowerCase()] ?? 'client'
    const demoUser: AuthUser = { id: email.toLowerCase(), email, role }
    localStorage.setItem(DEMO_KEY, JSON.stringify(demoUser))
    setUser(demoUser)
  }

  async function signOut() {
    if (isSupabaseConfigured && supabase) await supabase.auth.signOut()
    localStorage.removeItem(DEMO_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAdmin: user?.role === 'admin',
      demoMode: !isSupabaseConfigured,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
