import { Navigate } from 'react-router'

import { useAuth } from '../../context/AuthContext'
import type { UserRole } from '../../types/auth'

interface ProtectedRouteProps {
  allowedRole: UserRole
  children: React.ReactNode
}

function ProtectedRoute({
  allowedRole,
  children,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-al-page">
        <p className="text-sm text-al-muted">
          Loading...
        </p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== allowedRole) {
    const dashboard =
      user.role === 'broker'
        ? '/broker/dashboard'
        : '/underwriter/pipeline'

    return <Navigate to={dashboard} replace />
  }

  return children
}

export default ProtectedRoute