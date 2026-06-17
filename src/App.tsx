import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import SocialFloat from './components/SocialFloat'
import Assistant from './components/Assistant'
import Landing from './pages/Landing'
import Login from './pages/Login'
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
        <main className="flex-1 bg-[#F3F5F7] overflow-y-auto p-6">
          {children}
        </main>
      </div>
      <SocialFloat />
      <Assistant />
    </div>
  )
}

function Protected({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/scan" element={<Protected><LegalScan /></Protected>} />
        <Route path="/ip" element={<Protected><IPRegistry /></Protected>} />
        <Route path="/data" element={<Protected><DataAI /></Protected>} />
        <Route path="/hub" element={<Protected><AstanaHub /></Protected>} />
        <Route path="/contracts" element={<Protected><ContractsHub /></Protected>} />
        <Route path="/investor" element={<Protected><InvestorRoom /></Protected>} />
        <Route path="/journey" element={<Protected><ClientJourney /></Protected>} />
      </Routes>
    </AuthProvider>
  )
}
