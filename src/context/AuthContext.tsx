/**
 * Context to store details
 * about the user auth
 */

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

import type { User } from '../types/auth'

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)

    /* temp user for testing
    const [user, setUser] = useState<User | null>({
        id: 'underwriter-demo',
        name: 'Demo Underwriter',
        email: 'underwriter@demo.ie',
        role: 'underwriter',
    })
    */

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth must be used inside an AuthProvider'
    )
  }

  return context
}