import { useState } from 'react'
import { useNavigate } from 'react-router'

import { useAuth } from '../../context/AuthContext'

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return null
  }

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  const initial = user.name.charAt(0).toUpperCase()

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-al-soft sm:gap-3"
      >
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-gray-900">
            {user.name}
          </p>

          <p className="text-xs text-al-muted">
            {user.role === 'broker'
              ? 'Mortgage Broker'
              : 'Bank Underwriter'}
          </p>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-al-navy-light">
          <span className="text-sm font-medium text-al-navy">
            {initial}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-56 rounded-lg border border-al-border bg-white shadow-lg">
          <div className="border-b border-al-border px-4 py-3">
            <p className="text-sm font-medium text-gray-900">
              {user.name}
            </p>

            <p className="mt-1 text-xs text-al-muted">
              {user.email}
            </p>
          </div>

          <div className="p-2">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-al-soft hover:text-al-navy"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu