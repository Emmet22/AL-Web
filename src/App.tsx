import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router'

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Layout from './components/layout/Layout'

import Login from './pages/Login'

import BrokerDashboard from './pages/broker/BrokerDashboard'
import BrokerApplications from './pages/broker/BrokerApplications'
import BrokerApplicationDetails from './pages/broker/BrokerApplicationDetails'

import UnderwriterDashboard from './pages/underwriter/UnderwriterDashboard'
import UnderwriterApplicationDetails from './pages/underwriter/UnderwriterApplicationDetails'
import AIDeliberation from './pages/underwriter/AIDeliberation'
import LoanDecision from './pages/underwriter/LoanDecision'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Login */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Broker Dashboard */}
          <Route
            path="/broker/dashboard"
            element={
              <ProtectedRoute allowedRole="broker">
                <Layout role="broker">
                  <BrokerDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Broker Applications */}
          <Route
            path="/broker/applications"
            element={
              <ProtectedRoute allowedRole="broker">
                <Layout role="broker">
                  <BrokerApplications />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Broker Application Details */}
          <Route
            path="/broker/applications/:id"
            element={
              <ProtectedRoute allowedRole="broker">
                <Layout role="broker">
                  <BrokerApplicationDetails />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Underwriter Dashboard */}
          <Route
            path="/underwriter/pipeline"
            element={
              <ProtectedRoute allowedRole="underwriter">
                <Layout role="underwriter">
                  <UnderwriterDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/underwriter/applications/:id"
            element={
              <ProtectedRoute allowedRole="underwriter">
                <Layout role="underwriter">
                  <UnderwriterApplicationDetails />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* AI Deliberation Console */}
          <Route
            path="/underwriter/applications/:id/ai-deliberation"
            element={
              <ProtectedRoute allowedRole="underwriter">
                <Layout role="underwriter">
                  <AIDeliberation />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Loan Decision */}
          <Route
            path="/underwriter/applications/:id/decision"
            element={
              <ProtectedRoute allowedRole="underwriter">
                <Layout role="underwriter">
                  <LoanDecision />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Default */}
          <Route
            path="/"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />

          {/* Unknown routes */}
          <Route
            path="*"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App