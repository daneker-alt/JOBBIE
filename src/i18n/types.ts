export type Lang = 'ru' | 'kk' | 'en'

export interface Dict {
  common: {
    save: string
    saving: string
    add: string
    cancel: string
    logout: string
    help: string
    loading: string
    employeeMode: string
    clientView: string
    employee: string
    client: string
    yes: string
    no: string
    partial: string
    open: string
    download: string
    taglineCreate: string
    taglineProtect: string
  }
  nav: {
    dashboard: string
    scan: string
    ip: string
    data: string
    hub: string
    contracts: string
    investor: string
    journey: string
    team: string
    tagline: string
  }
  header: {
    aiAssistant: string
    appTitle: string
  }
  login: {
    title: string
    subtitle: string
    email: string
    password: string
    signIn: string
    signingIn: string
    demoHint: string
    demoAdmin: string
    demoClient: string
    loginError: string
  }
  landing: {
    navCapabilities: string
    navHow: string
    navPricing: string
    login: string
    start: string
    menuAria: string
    eyebrow: string
    heroTitle1: string
    heroTitle2: string
    heroSubtitle: string
    ctaScan: string
    ctaWhatsInside: string
    stats: { value: string; unit: string; label: string }[]
    capabilitiesEyebrow: string
    capabilitiesTitle: string
    capabilities: { name: string; desc: string }[]
    processEyebrow: string
    processTitle: string
    workflow: { phase: string; desc: string }[]
    pricingEyebrow: string
    pricingTitle: string
    priceFrom: string
    packages: { name: string; price: string; unit: string; desc: string; cta: string }[]
    closingTitle: string
    closingSubtitle: string
    footerCredit: string
  }
  legalScan: {
    steps: { title: string; subtitle: string }[]
    stageLabels: Record<string, string>
    industries: string[]
    selectPlaceholder: string
    companyName: string
    companyPlaceholder: string
    stage: string
    industry: string
    questions: {
      ipFounders: string
      ipContractors: string
      openSource: string
      personalData: string
      sensitiveData: string
      dataConsent: string
      saasTerms: string
      slaExists: string
      msaSigned: string
      capTable: string
      dataRoomReady: string
      safeExists: string
    }
    back: string
    next: string
    getMap: string
    resultTitle: string
    companyFallback: string
    stageLabel: string
    stageUnknown: string
    overallScore: string
    riskLow: string
    riskMed: string
    riskHigh: string
    categories: { label: string; lowNote: string; okNote: string }[]
    ctaText: string
    retake: string
    orderFull: string
    savedNote: string
  }
  dashboard: {
    riskLabels: Record<string, string>
    backlog: string
    tasksCount: string
    complianceCalendar: string
    documentMap: string
    readyOf: string
    docStatusLabels: Record<'ready' | 'pending' | 'draft', string>
  }
  taskStatus: Record<string, string>
  ipRegistry: {
    totalAssets: string
    risks: string
    inProgress: string
    riskAlertTitle: string
    riskAlertDesc: string
    tableTitle: string
    addAsset: string
    colAsset: string
    colType: string
    colOwner: string
    colContractors: string
    colStatus: string
    colRisk: string
    statusLabels: Record<string, string>
    modalTitle: string
    fieldName: string
    fieldOwner: string
    fieldContractors: string
    fieldNotes: string
    fieldType: string
  }
  dataAI: {
    privacyCompliance: string
    datasets: string
    risksCount: string
    aiDisclaimers: string
    done: string
    privacyChecklistTitle: string
    aiDisclaimersTitle: string
    attentionTitle: string
    datasetRegistryTitle: string
    colDataset: string
    colSize: string
    colSensitivity: string
    colConsent: string
    colLocation: string
    colStatus: string
    sensitivity: Record<string, string>
    riskBadge: string
    okBadge: string
  }
  astanaHub: {
    eligibility: string
    criteriaDone: string
    ictRevenue: string
    requirementMet: string
    belowThreshold: string
    documents: string
    ready: string
    ruleBroken: string
    eligibilityTitle: string
    revenueTrackTitle: string
    calendarTitle: string
    requiredDocsTitle: string
    threshold: string
    other: string
    urgent: string
  }
  contractsHub: {
    templatesReady: string
    activeContracts: string
    needsAttention: string
    templatesTitle: string
    activeTitle: string
    colClient: string
    colType: string
    colSigned: string
    colExpiry: string
    colStatus: string
    templateStatus: Record<string, string>
    contractActive: string
    contractRisk: string
  }
  investorRoom: {
    ddReadiness: string
    ddChecklist: string
    itemsDone: string
    docsCount: string
    readyTotal: string
    capTableTitle: string
    total: string
    dataRoomTitle: string
    ddSummaryTitle: string
    detailTitle: string
    exportDataRoom: string
    docStatus: Record<string, string>
  }
  clientJourney: {
    completed: string
    inProgress: string
    pending: string
    overallProgress: string
    statusLabels: Record<string, string>
    steps: { stage: string; title: string; desc: string; docs: string[] }[]
  }
  assistant: {
    title: string
    greeting: string
    placeholder: string
    fallback: string
  }
}
