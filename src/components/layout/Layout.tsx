import { useState } from 'react'
import { NavLink } from 'react-router'

import Sidebar from './Sidebar'
import UserMenu from './UserMenu'
import Footer from './Footer'

interface LayoutProps {
  role: 'broker' | 'underwriter'
  children: React.ReactNode
}

function Layout({ role, children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-al-page">
      {/* Desktop navigation */}
      <header className="hidden h-16 items-center border-b border-al-border bg-white px-6 md:flex lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-900">
            <span className="text-sm font-bold text-white">
              AL
            </span>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">
              Agentic Lender
            </p>

            <p className="text-xs text-al-muted">
              AL-Web
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="ml-8 flex h-full items-center gap-1">
          {role === 'broker' ? (
            <>
              <DesktopNavLink to="/broker/dashboard">
                Dashboard
              </DesktopNavLink>

              <DesktopNavLink to="/broker/applications">
                Applications
              </DesktopNavLink>
            </>
          ) : (
            <DesktopNavLink to="/underwriter/pipeline">
              Pipeline
            </DesktopNavLink>
          )}
        </nav>

        {/* User menu */}
        <div className="ml-auto">
          <UserMenu />
        </div>
      </header>

      {/* Mobile header */}
      <header className="flex h-16 items-center justify-between border-b border-al-border bg-white px-4 md:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-md p-2 text-gray-700 hover:bg-al-soft"
            aria-label="Open navigation"
          >
            ☰
          </button>

          <div>
            <p className="text-sm font-semibold text-gray-900">
              Agentic Lender
            </p>

            <p className="text-xs text-al-muted">
              AL-Web
            </p>
          </div>
        </div>

        <UserMenu />
      </header>

      {/* Mobile navigation */}
      <Sidebar
        role={role}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Page content */}
      <div className="flex min-h-[calc(100vh-4rem)] flex-col">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  )
}

interface DesktopNavLinkProps {
  to: string
  children: React.ReactNode
}

function DesktopNavLink({
  to,
  children,
}: DesktopNavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-al-navy-light text-al-navy'
            : 'text-al-muted hover:bg-al-soft hover:text-gray-900'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export default Layout