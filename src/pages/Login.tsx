import { useNavigate } from 'react-router'

import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  function loginAsBroker() {
    setUser({
      id: 'broker-demo',
      name: 'Demo Broker',
      email: 'broker@demo.ie',
      role: 'broker',
    })

    navigate('/broker/dashboard')
  }

  function loginAsUnderwriter() {
    setUser({
      id: 'underwriter-demo',
      name: 'Demo Underwriter',
      email: 'underwriter@demo.ie',
      role: 'underwriter',
    })

    navigate('/underwriter/pipeline')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-al-page p-4">
      <div className="w-full max-w-md rounded-lg border border-al-border bg-white p-8">
        <div className="mb-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-gray-900">
            <span className="text-base font-bold text-white">
              AL
            </span>
          </div>

          <p className="mt-3 text-sm font-medium text-gray-900">
            Agentic Lender
          </p>

          <h1 className="mt-6 text-xl font-semibold text-gray-900">
            Sign in
          </h1>

          <p className="mt-2 text-sm text-al-muted">
            Select a demo account to continue.
          </p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={loginAsBroker}
            className="w-full rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Continue as Mortgage Broker
          </button>

          <button
            type="button"
            onClick={loginAsUnderwriter}
            className="w-full rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Continue as Bank Underwriter
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-al-muted">
          Demo authentication for AL-Web development.
        </p>
      </div>
    </div>
  )
}

export default Login