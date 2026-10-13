/**
 * Modify this when recieving the API
 */

export type UserRole = 'broker' | 'underwriter'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}