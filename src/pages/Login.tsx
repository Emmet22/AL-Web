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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            AL
          </h1>

          <p className="text-sm text-gray-500">
            Agentic Lender
          </p>

          <h2 className="mt-6 text-xl font-semibold text-gray-900">
            Sign in
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Select a demo account to continue.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={loginAsBroker}
            className="w-full rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            Continue as Mortgage Broker
          </button>

          <button
            onClick={loginAsUnderwriter}
            className="w-full rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            Continue as Bank Underwriter
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-500 text-center">
          Demo authentication for AL-Web development.
        </p>
      </div>
    </div>
  )
}

export default Login