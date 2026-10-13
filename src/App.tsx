import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/layout/Layout'

import BrokerApplicationDetails from './pages/broker/BrokerApplicationDetails'
import BrokerApplications from './pages/broker/BrokerApplications'
import BrokerDashboard from './pages/broker/BrokerDashboard'

import UnderwriterDashboard from './pages/underwriter/UnderwriterDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/broker/dashboard"
          element={
            <Layout role="broker">
              <BrokerDashboard />
            </Layout>
          }
        />

        <Route
          path="/broker/applications"
          element={
            <Layout role="broker">
              <BrokerApplications />
            </Layout>
          }
        />

        <Route
          path="/broker/applications/:id"
          element={
            <Layout role="broker">
              <BrokerApplicationDetails />
            </Layout>
          }
        />

        <Route
          path="/underwriter/pipeline"
          element={
            <Layout role="underwriter">
              <UnderwriterDashboard />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
export default App