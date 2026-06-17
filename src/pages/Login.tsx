import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Logo() {
  return <span className="text-2xl font-bold tracking-tightest"><span className="text-brand-blue">Kerege</span><span className="text-brand-green">.ON</span></span>
}

export default function Login() {
  const { user, signIn, demoMode } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to="/dashboard" replace />

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа')
    } finally {
      setBusy(false)
    }
  }

  function demoLogin(role: 'admin' | 'client') {
    setEmail(role === 'admin' ? 'admin@kerege.kz' : 'client@kerege.kz')
    setPassword('demo')
  }

  return (
    <div className="min-h-screen bg-brand-surface flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Logo />
          <p className="text-muted text-sm mt-2">
            <span className="text-brand-green">You Create.</span>{' '}
            <span className="text-brand-blue">We Protect.</span>
          </p>
        </div>

        <form onSubmit={submit} className="bg-white border border-line rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="text-xs font-medium text-muted">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="mt-1 w-full border border-line rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-blue"
              placeholder="you@company.kz"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="mt-1 w-full border border-line rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-blue"
              placeholder="••••••••"
            />
          </div>

          {error && <div className="text-red-700 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-brand-blue text-white rounded-lg py-2.5 text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {busy ? 'Вход…' : 'Войти'}
          </button>
        </form>

        {demoMode && (
          <div className="mt-4 text-center">
            <p className="text-muted text-xs mb-2">Demo-режим — войдите как:</p>
            <div className="flex gap-2 justify-center">
              <button onClick={() => demoLogin('admin')} className="text-xs border border-line bg-white rounded-lg px-3 py-1.5 hover:bg-brand-surface transition">Сотрудник (admin)</button>
              <button onClick={() => demoLogin('client')} className="text-xs border border-line bg-white rounded-lg px-3 py-1.5 hover:bg-brand-surface transition">Клиент</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
