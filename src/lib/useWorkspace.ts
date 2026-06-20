import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { loadWorkspace, saveWorkspace, defaultWorkspace } from './store'
import type { WorkspaceData } from './types'

export function useWorkspace() {
  const { user, isAdmin } = useAuth()
  const [data, setData] = useState<WorkspaceData>(defaultWorkspace)
  const [loading, setLoading] = useState(true)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!user) return
    loadWorkspace(user.id)
      .then(setData)
      .catch(() => setData(defaultWorkspace))
      .finally(() => setLoading(false))
  }, [user])

  function update(mut: (d: WorkspaceData) => void) {
    setData(prev => {
      const next = structuredClone(prev)
      mut(next)
      return next
    })
    setDirty(true)
  }

  async function save() {
    if (!user) return
    setSaving(true)
    try {
      await saveWorkspace(user.id, data)
      setDirty(false)
    } finally {
      setSaving(false)
    }
  }

  // Для действий, которые сами должны зафиксироваться в audit log без
  // отдельного нажатия Save (например, экспорт), мутирует и сохраняет
  // один и тот же снимок данных, не дожидаясь следующего рендера.
  async function updateAndSave(mut: (d: WorkspaceData) => void) {
    const next = structuredClone(data)
    mut(next)
    setData(next)
    if (!user) {
      setDirty(true)
      return
    }
    setSaving(true)
    try {
      await saveWorkspace(user.id, next)
    } finally {
      setSaving(false)
    }
  }

  return { data, update, save, updateAndSave, loading, dirty, saving, isAdmin }
}
