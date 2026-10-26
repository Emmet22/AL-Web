import {
  useEffect,
  useState,
  type FormEvent,
} from 'react'

import { useNavigate } from 'react-router'

import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { user, loading, login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] =
    useState(false)

  useEffect(() => {
    if (loading || !user) {
      return
    }

    if (user.role === 'broker') {
      navigate('/broker/dashboard', {
        replace: true,
      })
    } else {
      navigate('/underwriter/pipeline', {
        replace: true,
      })
    }
  }, [user, loading, navigate])

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setError('')
    setIsSubmitting(true)

    try {
      const authenticatedUser = await login(
        email,
        password,
      )

      if (authenticatedUser.role === 'broker') {
        navigate('/broker/dashboard')
      } else {
        navigate('/underwriter/pipeline')
      }
    } catch (error) {
      console.error('Login failed:', error)

      setError(
        'Unable to sign in. Check your email and password.',
      )
    } finally {
      setIsSubmitting(false)
    }
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
            Sign in to access the AL-Web portal.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              autoComplete="email"
              className="w-full rounded-md border border-al-border px-3 py-2.5 text-sm outline-none focus:border-al-navy focus:ring-1 focus:ring-al-navy"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              autoComplete="current-password"
              className="w-full rounded-md border border-al-border px-3 py-2.5 text-sm outline-none focus:border-al-navy focus:ring-1 focus:ring-al-navy"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-al-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? 'Signing in...'
              : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login