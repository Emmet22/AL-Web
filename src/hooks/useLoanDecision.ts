import { useEffect, useState } from 'react'

import { getApplicationById } from '../services/applicationService'
import { submitApplicationDecision } from '../services/api'

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
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [submitting, setSubmitting] = useState(false)

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
    setSubmissionError(null)
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
    setSubmissionError(null)
    setShowConfirmation(true)
  }

  // Close the confirmation modal.
  function closeConfirmation() {
    if (submitting) return

    setShowConfirmation(false)
    setSubmissionError(null)
  }

  // Submit the decision to the Core API.
  async function confirmDecision() {
    if (!id || !decision || submitting) return

    try {
      setSubmitting(true)
      setSubmissionError(null)

      const outcomeMap = {
        Approve: 'approved',
        'Conditionally Approve': 'conditionally_approved',
        Decline: 'declined',
      } as const

      const outcome = outcomeMap[decision]

      const result = await submitApplicationDecision(
        id,
        outcome,
        decision === 'Conditionally Approve'
          ? conditions.trim()
          : null
      )

      // Update the application with the backend's confirmed status.
      setApplication((current) =>
        current
          ? { ...current, status: result.status as Application['status'] }
          : current
      )

      setShowConfirmation(false)
      setConfirmed(true)

    } catch (err) {
      console.error('Failed to submit loan decision:', err)

      setSubmissionError(
        err instanceof Error
          ? err.message
          : 'Failed to submit the decision. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return {
    application,
    loading,
    error,

    decision,
    conditions,
    validationError,
    submissionError,

    showConfirmation,
    confirmed,
    submitting,

    selectDecision,
    setConditions,

    openConfirmation,
    closeConfirmation,
    confirmDecision,
  }
}