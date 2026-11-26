import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { getApplicationById } from '../../services/applicationService'

import type { Application } from '../../types/application'

import StatusBadge from '../common/StatusBadge'
import FinancialAssessment from '../assessment/FinancialAssessment'

import ApplicationWorkflowActions from './ApplicationWorkflowActions'
import ApplicationInformation from './ApplicationInformation'
import LoanInformation from './LoanInformation'

interface ApplicationDetailsProps {
  backPath: string
  backLabel: string
  showWorkflowActions?: boolean
}

export default function ApplicationDetails({
  backPath,
  backLabel,
  showWorkflowActions = false,
}: ApplicationDetailsProps) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    async function loadApplication() {
      if (!id) {
        setError('No application ID was provided.')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        setApplication(null)

        const result = await getApplicationById(id)

        if (!isActive) return
        if (!result) {
          setError('Application not found.')
          return
        }

        setApplication(result)
      } catch {
        if (!isActive) return

        setError('Unable to load this application. Please try again.')
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    loadApplication()

    return () => {
      isActive = false
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <p className="text-gray-500">
          Loading application...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-800">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-red-700">
          {error}
        </p>

        <button
          onClick={() => navigate(backPath)}
          className="mt-4 text-sm font-medium text-red-800 underline"
        >
          {backLabel}
        </button>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Application not found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          The application you're looking for does not exist.
        </p>

        <button
          onClick={() => navigate(backPath)}
          className="mt-5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          {backLabel}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <button
          onClick={() => navigate(backPath)}
          className="mb-4 text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          ← {backLabel}
        </button>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-gray-500">
              Application {application.referenceNumber ?? application.id}
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-900">
              {application.applicant}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {application.location}
            </p>
          </div>

          <StatusBadge status={application.status} />
        </div>
      </div>

      {/* Underwriter Actions */}
      {showWorkflowActions && (
        <ApplicationWorkflowActions
          applicationId={application.id}
        />
      )}

      {/* Applicant and Property Information */}
      <ApplicationInformation application={application} />

      {/* Loan Information */}
      <LoanInformation application={application} />

      {/* Financial Assessment */}
      <FinancialAssessment application={application} />

    </div>
  )
}