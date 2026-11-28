import { Link, useParams } from 'react-router'

import { useLoanDecision } from '../../hooks/useLoanDecision'

import ApplicationSummary from '../../components/loan-decision/ApplicationSummary'
import FinancialAssessment from '../../components/loan-decision/FinancialAssessment'
import ApplicantFinancialInformation from '../../components/loan-decision/ApplicantFinancialInformation'
import PropertyInformation from '../../components/loan-decision/PropertyInformation'
import AIRecommendation from '../../components/loan-decision/AIRecommendation'
import DecisionForm from '../../components/loan-decision/DecisionForm'
import DecisionConfirmationModal from '../../components/loan-decision/DecisionConfirmationModal'

export default function LoanDecision() {
  const { id } = useParams()

  const {
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
  } = useLoanDecision(id)

  // Loading state.
  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-al-muted">
          Loading application details...
        </p>
      </div>
    )
  }

  // Error state.
  if (error || !application) {
    return (
      <div className="space-y-4">
        <Link
          to="/underwriter/pipeline"
          className="text-sm font-medium text-al-navy hover:underline"
        >
          ← Back to Pipeline
        </Link>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <h2 className="font-semibold text-red-900">
            Unable to Load Application
          </h2>

          <p className="mt-2 text-sm text-red-700">
            {error || 'Application details are unavailable.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <Link
          to={`/underwriter/applications/${id}`}
          className="text-sm font-medium text-al-navy hover:underline"
        >
          ← Back to Application
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          Loan Decision & Approval
        </h1>

        <p className="mt-1 text-sm text-al-muted">
          Review the application and record the underwriter's final lending
          decision.
        </p>
      </div>

      {/* Confirmation Message */}
      {confirmed && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-lg text-green-700">
              ✓
            </div>

            <div>
              <h3 className="font-semibold text-green-900">
                Decision Successfully Recorded
              </h3>

              <p className="mt-1 text-sm text-green-800">
                The application decision has been submitted successfully as:{' '}
                <strong>{decision}</strong>.
              </p>

              <p className="mt-2 text-xs text-green-700">
                The application status has been updated.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Application Information */}
      <ApplicationSummary application={application} />

      {/* Financial Assessment */}
      <FinancialAssessment application={application} />

      {/* Applicant Financial Information */}
      <ApplicantFinancialInformation application={application} />

      {/* Property Information */}
      <PropertyInformation application={application} />

      {/* AI Recommendation */}
      <AIRecommendation applicationId={application.id} />

      {/* Underwriter Decision */}
      <DecisionForm
        decision={decision}
        conditions={conditions}
        validationError={validationError}
        onSelectDecision={selectDecision}
        onConditionsChange={setConditions}
        onSubmit={openConfirmation}
      />

      {/* Confirmation Modal */}
      {showConfirmation && decision && (
        <DecisionConfirmationModal
          decision={decision}
          conditions={conditions}
          submitting={submitting}
          submissionError={submissionError}
          onCancel={closeConfirmation}
          onConfirm={confirmDecision}
        />
      )}

    </div>
  )
}