import type { AuditEntry, WorkspaceData } from './types'

const MAX_ENTRIES = 300

export function pushAudit(d: WorkspaceData, actor: string, action: string, target: string) {
  const entry: AuditEntry = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    actor,
    action,
    target,
  }
  d.auditLog = [entry, ...d.auditLog].slice(0, MAX_ENTRIES)
}
