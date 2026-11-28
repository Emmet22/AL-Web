import { auth } from './firebase'

const CORE_API_URL = import.meta.env.VITE_CORE_API_URL

export type CoreDecisionOutcome =
  | 'approved'
  | 'conditionally_approved'
  | 'declined'

interface DecisionResponse {
  id: string
  status: string
  decision: {
    outcome: CoreDecisionOutcome
    conditions: string | null
  }
  message: string
}

export async function submitApplicationDecision(
  applicationId: string,
  outcome: CoreDecisionOutcome,
  conditions: string | null = null
): Promise<DecisionResponse> {
  if (!CORE_API_URL) {
    throw new Error('Core API URL is not configured.')
  }

  const currentUser = auth.currentUser

  if (!currentUser) {
    throw new Error('You must be signed in to submit a decision.')
  }

  // Get the Firebase ID token for the authenticated underwriter.
  const token = await currentUser.getIdToken()

  const response = await fetch(
    `${CORE_API_URL}/applications/${encodeURIComponent(applicationId)}/decision`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        outcome,
        conditions,
      }),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`)
  }

  return data as DecisionResponse
}