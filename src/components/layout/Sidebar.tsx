import { NavLink } from 'react-router'

interface SidebarProps {
  role: 'broker' | 'underwriter'
  isOpen: boolean
  onClose: () => void
}

function Sidebar({
  role,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-xl transition-transform duration-200 md:hidden ${
          isOpen
            ? 'translate-x-0'
            : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-al-border px-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              AL
            </h1>

            <p className="text-xs text-al-muted">
              Agentic Lender
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-al-muted hover:bg-al-soft hover:text-gray-900"
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>

        <nav className="p-4">
          {role === 'broker' ? (
            <div className="space-y-1">
              <MobileNavLink
                to="/broker/dashboard"
                onClick={onClose}
              >
                Dashboard
              </MobileNavLink>

              <MobileNavLink
                to="/broker/applications"
                onClick={onClose}
              >
                Applications
              </MobileNavLink>
            </div>
          ) : (
            <div className="space-y-1">
              <MobileNavLink
                to="/underwriter/pipeline"
                onClick={onClose}
              >
                Pipeline
              </MobileNavLink>
            </div>
          )}
        </nav>
      </aside>
    </>
  )
}

interface MobileNavLinkProps {
  to: string
  onClick: () => void
  children: React.ReactNode
}

function MobileNavLink({
  to,
  onClick,
  children,
}: MobileNavLinkProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block rounded-md px-4 py-3 text-sm font-medium ${
          isActive
            ? 'bg-al-navy-light text-al-navy'
            : 'text-gray-700 hover:bg-al-soft hover:text-gray-900'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export default Sidebar