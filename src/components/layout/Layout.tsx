import Sidebar from './Sidebar'
import UserMenu from './UserMenu'
import Footer from './Footer'

interface LayoutProps {
  role: 'broker' | 'underwriter'
  children: React.ReactNode
}

function Layout({ role, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar role={role} />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
          <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
            AL – Agentic Lender
          </h2>

          <UserMenu />
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default Layout