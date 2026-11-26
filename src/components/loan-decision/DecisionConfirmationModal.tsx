import type { Decision } from '../../utils/loanDecisionUtils'

interface Props {
  decision: Decision
  conditions: string
  onCancel: () => void
  onConfirm: () => void
}

export default function DecisionConfirmationModal({
  decision,
  conditions,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold text-gray-900">
          Confirm Loan Decision
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Are you sure you want to record this application as:
        </p>

        <div className="mt-4 rounded-lg bg-gray-50 p-4">
          <p className="font-semibold text-gray-900">
            {decision}
          </p>

          {decision === 'Conditionally Approve' && (
            <p className="mt-2 text-sm text-gray-600">
              Conditions: {conditions}
            </p>
          )}
        </div>

        <p className="mt-3 text-xs text-al-muted">
          This is currently a demonstration. No database changes will be made.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-al-border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-al-navy px-4 py-2 text-sm font-medium text-white hover:bg-blue-900"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}