import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/layout/Layout'

import BrokerApplicationDetails from './pages/broker/BrokerApplicationDetails'
import BrokerApplications from './pages/broker/BrokerApplications'
import BrokerDashboard from './pages/broker/BrokerDashboard'

function App() {
  return (
    <BrowserRouter>
      <Layout role="broker">
        <Routes>
          <Route path="/broker/dashboard" element={<BrokerDashboard />} />
          <Route path="/broker/applications" element={<BrokerApplications />} />
          <Route path="/broker/applications/:id" element={<BrokerApplicationDetails />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App