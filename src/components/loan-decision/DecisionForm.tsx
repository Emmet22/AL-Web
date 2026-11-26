import type { Decision } from '../../utils/loanDecisionUtils'

interface Props {
  decision: Decision | null
  conditions: string
  validationError: string | null
  onSelectDecision: (decision: Decision) => void
  onConditionsChange: (value: string) => void
  onSubmit: () => void
}

const decisionStyles: Record<Decision, string> = {
  Approve: 'border-al-success bg-al-success-bg text-al-success',
  'Conditionally Approve':
    'border-amber-400 bg-amber-50 text-amber-800',
  Decline: 'border-red-400 bg-red-50 text-red-700',
}

const decisions: Decision[] = [
  'Approve',
  'Conditionally Approve',
  'Decline',
]

export default function DecisionForm({
  decision,
  conditions,
  validationError,
  onSelectDecision,
  onConditionsChange,
  onSubmit,
}: Props) {
  return (
    <div className="rounded-xl border border-al-border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        Underwriter Decision
      </h2>

      <p className="mt-1 text-sm text-al-muted">
        Select the final outcome for this mortgage application.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {decisions.map((option) => {
          const selected = decision === option

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelectDecision(option)}
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
            maxLength={1000}
            value={conditions}
            onChange={(event) => onConditionsChange(event.target.value)}
            placeholder="Enter the conditions that must be satisfied before approval..."
            className="w-full rounded-lg border border-al-border p-3 text-sm outline-none focus:border-al-navy focus:ring-1 focus:ring-al-navy"
          />

          <div className="mt-1 flex justify-between text-xs text-al-muted">
            <span>
              Example: Independent property valuation must be completed
              before final approval.
            </span>

            <span>{conditions.length}/1000</span>
          </div>
        </div>
      )}

      {validationError && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-700">
            {validationError}
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-al-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-al-muted">
          Backend decision submission will be connected once the Core API
          endpoint is available.
        </p>

        <button
          type="button"
          onClick={onSubmit}
          className="rounded-lg bg-al-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-900"
        >
          Confirm Decision
        </button>
      </div>
    </div>
  )
}