/**
 * These props ensure that the component requires a role,
 * and that that role can only be broker or underwriter.
 * 
 * This is important as a broker and an underwriter will
 * have different navigation links in their sidebar. 
 */
import { Link } from 'react-router'

interface SidebarProps {
  role: 'broker' | 'underwriter'
}

function Sidebar({ role }: SidebarProps) {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-gray-200 bg-white md:flex md:min-h-screen md:flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            AL
          </h1>

          <p className="text-xs text-gray-500">
            Agentic Lender
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {role === 'broker' ? (
          <div className="space-y-1">
            <Link
              to="/broker/dashboard"
              className="block rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </Link>

            <Link
              to="/broker/applications"
              className="block rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Applications
            </Link>
          </div>
        ) : (
          <div className="space-y-1">
            <Link
              to="/underwriter/pipeline"
              className="block rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Pipeline
            </Link>
          </div>
        )}
      </nav>
    </aside>
  )
}

export default Sidebar