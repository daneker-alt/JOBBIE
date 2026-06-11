import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import LegalScan from './pages/LegalScan'
import IPRegistry from './pages/IPRegistry'
import DataAI from './pages/DataAI'
import AstanaHub from './pages/AstanaHub'
import ContractsHub from './pages/ContractsHub'
import InvestorRoom from './pages/InvestorRoom'
import ClientJourney from './pages/ClientJourney'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scan" element={<LegalScan />} />
        <Route path="/ip" element={<IPRegistry />} />
        <Route path="/data" element={<DataAI />} />
        <Route path="/hub" element={<AstanaHub />} />
        <Route path="/contracts" element={<ContractsHub />} />
        <Route path="/investor" element={<InvestorRoom />} />
        <Route path="/journey" element={<ClientJourney />} />
      </Routes>
    </BrowserRouter>
  )
}
