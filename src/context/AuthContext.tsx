/**
 * Context to store details
 * about the user auth
 * 
 * MODIFIED - to be in line with firebase implementation
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

import { auth } from '../services/firebase'
import type { User, UserRole } from '../types/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
)

interface AuthProviderProps {
  children: ReactNode
}

function isUserRole(role: unknown): role is UserRole {
  return role === 'broker' || role === 'underwriter'
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  async function createUserFromFirebase(
    firebaseUser: import('firebase/auth').User,
  ): Promise<User> {
    const tokenResult = await firebaseUser.getIdTokenResult()
    const role = tokenResult.claims.role

    if (!isUserRole(role)) {
      throw new Error(
        'This account does not have access to AL-Web.',
      )
    }

    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName ?? firebaseUser.email ?? 'User',
      email: firebaseUser.email ?? '',
      role,
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        try {
          if (!firebaseUser) {
            setUser(null)
            return
          }

          const authenticatedUser =
            await createUserFromFirebase(firebaseUser)

          setUser(authenticatedUser)
        } catch (error) {
          console.error(
            'Failed to restore authenticated user:',
            error,
          )

          setUser(null)
          await signOut(auth)
        } finally {
          setLoading(false)
        }
      },
    )

    return unsubscribe
  }, [])

  async function login(
    email: string,
    password: string,
  ): Promise<User> {
    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )

    const authenticatedUser =
      await createUserFromFirebase(credential.user)

    setUser(authenticatedUser)

    return authenticatedUser
  }

  async function logout() {
    await signOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
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
      'useAuth must be used inside an AuthProvider',
    )
  }

  return context
}