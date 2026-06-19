export type Role = 'client' | 'admin'

export interface AuthUser {
  id: string
  email: string
  role: Role
}

export type DocStatus = 'ready' | 'pending' | 'draft'
export type TaskStatus = 'urgent' | 'in-progress' | 'ready' | 'pending'
export type IPStatus = 'assigned' | 'pending' | 'risk'

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

export interface ChecklistItem {
  title: string
  done: boolean
  note?: string
}

export interface IPAsset {
  id: number
  name: string
  type: string
  owner: string
  status: IPStatus
  contractors: string
  notes: string
  riskScore: number
}

export interface Dataset {
  name: string
  size: string
  sensitivity: 'high' | 'medium' | 'low'
  consent: string
  location: string
  status: 'risk' | 'ok'
}

export interface RevenueMonth {
  month: string
  ict: number
  other: number
}

export interface ContractTemplate {
  name: string
  desc: string
  type: string
  status: 'ready' | 'review' | 'draft'
}

export interface SignatureRecord {
  method: 'ncalayer' | 'simple'
  signerName: string
  signerCert?: string
  hash: string
  signedAt: string
  cms?: string
}

export interface ActiveContract {
  client: string
  type: string
  signed: string
  expiry: string
  status: 'active' | 'risk'
  signature?: SignatureRecord
}

export interface AuditEntry {
  id: string
  timestamp: string
  actor: string
  action: string
  target: string
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: 'admin' | 'client'
  invitedAt: string
}

export interface DDCategory {
  name: string
  items: ChecklistItem[]
}

export interface InvestorDoc {
  name: string
  status: 'signed' | 'ready' | 'draft'
  date: string
}

export interface JourneyStep {
  num: number
  status: 'done' | 'in-progress' | 'pending'
}

export interface CompanyProfile {
  name: string
  bin: string
  address: string
  director: string
  iban: string
  bank: string
  bik: string
}

export interface WorkspaceData {
  companyProfile: CompanyProfile
  team: TeamMember[]
  auditLog: AuditEntry[]
  risks: RiskCategory[]
  documents: WorkspaceDoc[]
  tasks: WorkspaceTask[]
  calendar: CalendarItem[]
  ipAssets: IPAsset[]
  privacyItems: ChecklistItem[]
  datasets: Dataset[]
  aiDisclaimers: ChecklistItem[]
  hubEligibility: ChecklistItem[]
  hubRequiredDocs: ChecklistItem[]
  hubRevenue: RevenueMonth[]
  contractTemplates: ContractTemplate[]
  activeContracts: ActiveContract[]
  ddCategories: DDCategory[]
  investorDocs: InvestorDoc[]
  journeySteps: JourneyStep[]
}
