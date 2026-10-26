export type UserRole = 'broker' | 'underwriter'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}