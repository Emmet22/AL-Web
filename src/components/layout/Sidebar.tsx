import { Link } from 'react-router'

/**
 * These props ensure that the component requires a role,
 * and that that role can only be broker or underwriter.
 * 
 * This is important as a broker and an underwriter will
 * have different navigation links in their sidebar. 
 */
interface SidebarProps {
  role: 'broker' | 'underwriter'
}

function Sidebar({ role }: SidebarProps) {
  return (
    <aside className="w-60 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-900">AL</h1>
          <p className="text-xs text-gray-500">Agentic Lender</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {role === 'broker' ? (
          <div className="space-y-1">
            <Link
              to="/broker/dashboard"
              className="block px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </Link>

            <Link
              to="/broker/applications"
              className="block px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Applications
            </Link>
          </div>
        ) : (
          <div className="space-y-1">
            <Link
              to="/underwriter/pipeline"
              className="block px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Pipeline
            </Link>

            <Link
              to="/underwriter/stress-testing"
              className="block px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Stress Testing
            </Link>
          </div>
        )}
      </nav>
    </aside>
  )
}

export default Sidebar