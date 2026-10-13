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
  const { user } = useAuth()

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