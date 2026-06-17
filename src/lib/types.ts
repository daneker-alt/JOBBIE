export type Role = 'client' | 'admin'

export interface AuthUser {
  id: string
  email: string
  role: Role
}

export type DocStatus = 'ready' | 'pending' | 'draft'
export type TaskStatus = 'urgent' | 'in-progress' | 'ready' | 'pending'

export interface RiskCategory {
  label: string
  score: number
}

export interface WorkspaceDoc {
  name: string
  status: DocStatus
  type: string
}

export interface WorkspaceTask {
  title: string
  description: string
  status: TaskStatus
  deadline?: string
  assignees?: string[]
}

export interface CalendarItem {
  date: string
  event: string
  urgent: boolean
}

export interface WorkspaceData {
  risks: RiskCategory[]
  documents: WorkspaceDoc[]
  tasks: WorkspaceTask[]
  calendar: CalendarItem[]
}
