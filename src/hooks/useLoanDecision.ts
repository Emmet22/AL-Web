import { useEffect, useState } from 'react'

import { getApplicationById } from '../services/applicationService'
import type { Application } from '../types/application'

import {
  validateDecision,
  type Decision,
} from '../utils/loanDecisionUtils'

export function useLoanDecision(id: string | undefined) {
  const [application, setApplication] = useState<Application | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [decision, setDecision] = useState<Decision | null>(null)
  const [conditions, setConditions] = useState('')

  const [validationError, setValidationError] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  // Fetch application data.
  useEffect(() => {
    let cancelled = false

    async function loadApplication() {
      if (!id) {
        setError('No application ID was provided.')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const result = await getApplicationById(id)

        if (!result) {
          throw new Error('Application could not be found.')
        }

        if (!cancelled) {
          setApplication(result)
        }
      } catch (err) {
        console.error('Failed to load application:', err)

        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Failed to load application details.'
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadApplication()

    return () => {
      cancelled = true
    }
  }, [id])

  // Select a decision.
  function selectDecision(value: Decision) {
    setDecision(value)
    setValidationError(null)
    setConfirmed(false)

    if (value !== 'Conditionally Approve') {
      setConditions('')
    }
  }

  // Open confirmation after validating the form.
  function openConfirmation() {
    const validation = validateDecision(decision, conditions)

    if (validation) {
      setValidationError(validation)
      return
    }

    setValidationError(null)
    setShowConfirmation(true)
  }

  // Close the confirmation modal.
  function closeConfirmation() {
    setShowConfirmation(false)
  }

  // Currently demonstration-only.
  function confirmDecision() {
    setShowConfirmation(false)
    setConfirmed(true)
  }

  return {
    application,
    loading,
    error,

    decision,
    conditions,
    validationError,

    showConfirmation,
    confirmed,

    selectDecision,
    setConditions,

    openConfirmation,
    closeConfirmation,
    confirmDecision,
  }
}