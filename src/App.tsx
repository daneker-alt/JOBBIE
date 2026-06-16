import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import LegalScan from './pages/LegalScan'
import IPRegistry from './pages/IPRegistry'
import DataAI from './pages/DataAI'
import AstanaHub from './pages/AstanaHub'
import ContractsHub from './pages/ContractsHub'
import InvestorRoom from './pages/InvestorRoom'
import ClientJourney from './pages/ClientJourney'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Дашборд',
  '/scan': 'Legal Scan',
  '/ip': 'IP Реестр',
  '/data': 'Data & AI',
  '/hub': 'Astana Hub',
  '/contracts': 'Договоры',
  '/investor': 'Investor Room',
  '/journey': 'Client Journey',
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'LegalOS'
  return (
    <div className="flex h-screen bg-[#F3F5F7] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
      <Route path="/scan" element={<AppLayout><LegalScan /></AppLayout>} />
      <Route path="/ip" element={<AppLayout><IPRegistry /></AppLayout>} />
      <Route path="/data" element={<AppLayout><DataAI /></AppLayout>} />
      <Route path="/hub" element={<AppLayout><AstanaHub /></AppLayout>} />
      <Route path="/contracts" element={<AppLayout><ContractsHub /></AppLayout>} />
      <Route path="/investor" element={<AppLayout><InvestorRoom /></AppLayout>} />
      <Route path="/journey" element={<AppLayout><ClientJourney /></AppLayout>} />
    </Routes>
  )
}
