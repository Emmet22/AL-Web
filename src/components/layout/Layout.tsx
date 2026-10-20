import Sidebar from './Sidebar'
import UserMenu from './UserMenu'

interface LayoutProps {
  role: 'broker' | 'underwriter'
  children: React.ReactNode
}

function Layout({ role, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar role={role} />

      <div className="flex-1">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-gray-900">
            AL – Agentic Lender
          </h2>

          <UserMenu />
        </header>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout