import { useState } from 'react'
import { Link, useParams } from 'react-router'

/**
 * NOTE
 * This is not integrated with firebase to send on the loan decision yet.
 */

type Decision = 'Approve' | 'Conditionally Approve' | 'Decline'

export default function LoanDecision() {
  const { id } = useParams()

  const [decision, setDecision] = useState<Decision | null>(null)
  const [conditions, setConditions] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const handleConfirm = () => {
    setShowConfirmation(false)
    setConfirmed(true)
  }

  const decisionStyles = {
    Approve: 'border-al-success bg-al-success-bg text-al-success',
    'Conditionally Approve':
      'border-amber-400 bg-amber-50 text-amber-800',
    Decline: 'border-red-400 bg-red-50 text-red-700',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
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
                Decision Confirmed
              </h3>

              <p className="mt-1 text-sm text-green-800">
                The demonstration decision has been confirmed as:{' '}
                <strong>{decision}</strong>.
              </p>

              <p className="mt-2 text-xs text-green-700">
                This is a frontend demonstration. No application records
                have been updated.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Application Summary */}
      <div className="rounded-xl border border-al-border bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Application Summary
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-al-muted">
              Reference
            </p>
            <p className="mt-1 font-semibold text-gray-900">
              {id || 'APP-0001'}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-al-muted">
              Applicant
            </p>
            <p className="mt-1 font-semibold text-gray-900">
              Sample Applicant
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-al-muted">
              Requested Mortgage
            </p>
            <p className="mt-1 font-semibold text-gray-900">
              €300,000
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-al-muted">
              Loan Term
            </p>
            <p className="mt-1 font-semibold text-gray-900">
              30 Years
            </p>
          </div>
        </div>
      </div>

      {/* Financial Assessment */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          Financial Assessment
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: 'Loan-to-Value',
              value: '80%',
              description: 'Mortgage relative to property value',
            },
            {
              label: 'Loan-to-Income',
              value: '3.5x',
              description: 'Mortgage relative to annual income',
            },
            {
              label: 'Property Valuation',
              value: '€375,000',
              description: 'Estimated property value',
            },
            {
              label: 'Monthly Repayment',
              value: '€1,347',
              description: 'Illustrative monthly repayment',
            },
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-al-border bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-al-muted">{metric.label}</p>

              <p className="mt-2 text-2xl font-bold text-al-navy">
                {metric.value}
              </p>

              <p className="mt-2 text-xs text-al-muted">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-amber-800">
              AI Underwriting Recommendation
            </p>

            <h2 className="mt-1 text-xl font-bold text-amber-900">
              Conditionally Approve
            </h2>

            <p className="mt-2 text-sm leading-6 text-amber-800">
              The AI underwriting committee recommends conditional
              approval. The applicant's affordability is acceptable,
              however the property valuation should be independently
              verified.
            </p>
          </div>

          <Link
            to={`/underwriter/applications/${id}/ai-deliberation`}
            className="w-fit shrink-0 rounded-lg border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-100"
          >
            View AI Findings →
          </Link>
        </div>
      </div>

      {/* Final Decision */}
      <div className="rounded-xl border border-al-border bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Underwriter Decision
        </h2>

        <p className="mt-1 text-sm text-al-muted">
          Select the final outcome for this mortgage application.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {(
            ['Approve', 'Conditionally Approve', 'Decline'] as Decision[]
          ).map((option) => {
            const selected = decision === option

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setDecision(option)
                  setConfirmed(false)
                }}
                className={`rounded-xl border-2 p-4 text-left transition ${
                  selected
                    ? decisionStyles[option]
                    : 'border-al-border bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{option}</span>

                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      selected
                        ? 'border-current bg-current text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {selected && <span className="text-xs">✓</span>}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 opacity-80">
                  {option === 'Approve' &&
                    'Approve the mortgage application.'}

                  {option === 'Conditionally Approve' &&
                    'Approve subject to additional requirements.'}

                  {option === 'Decline' &&
                    'Reject the mortgage application.'}
                </p>
              </button>
            )
          })}
        </div>

        {/* Conditions */}
        {decision === 'Conditionally Approve' && (
          <div className="mt-5">
            <label
              htmlFor="conditions"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Approval Conditions
            </label>

            <textarea
              id="conditions"
              rows={4}
              value={conditions}
              onChange={(event) => setConditions(event.target.value)}
              placeholder="Enter the conditions that must be satisfied before approval..."
              className="w-full rounded-lg border border-al-border p-3 text-sm outline-none focus:border-al-navy focus:ring-1 focus:ring-al-navy"
            />

            <p className="mt-1 text-xs text-al-muted">
              Example: Independent property valuation must be completed
              before final approval.
            </p>
          </div>
        )}

        {/* Submit */}
        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-al-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-al-muted">
            Decisions are not saved to the application database.
          </p>

          <button
            type="button"
            disabled={
              !decision ||
              (decision === 'Conditionally Approve' &&
                !conditions.trim())
            }
            onClick={() => setShowConfirmation(true)}
            className="rounded-lg bg-al-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Confirm Decision
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && decision && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900">
              Confirm Loan Decision
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Are you sure you want to record this application as:
            </p>

            <div className="mt-4 rounded-lg bg-gray-50 p-4">
              <p className="font-semibold text-gray-900">{decision}</p>

              {decision === 'Conditionally Approve' && (
                <p className="mt-2 text-sm text-gray-600">
                  Conditions: {conditions}
                </p>
              )}
            </div>

            <p className="mt-3 text-xs text-al-muted">
              This is a demonstration only. No database changes will be
              made.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="rounded-lg border border-al-border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-lg bg-al-navy px-4 py-2 text-sm font-medium text-white hover:bg-blue-900"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}