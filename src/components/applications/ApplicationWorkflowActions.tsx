import { useNavigate } from 'react-router'

import Card from '../common/Card'

interface ApplicationWorkflowActionsProps {
  applicationId: string
}

export default function ApplicationWorkflowActions({
  applicationId,
}: ApplicationWorkflowActionsProps) {
  const navigate = useNavigate()

  return (
    <Card>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Underwriting Actions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Review the AI assessment, run financial stress tests or proceed to a loan decision.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() =>
              navigate(`/underwriter/applications/${applicationId}/ai-deliberation`)
            }
            className="rounded-lg border border-al-navy px-4 py-2.5 text-sm font-semibold text-al-navy transition hover:bg-al-navy-light"
          >
            View AI Findings
          </button>

          <button
            onClick={() =>
              navigate(`/underwriter/stress-testing/${applicationId}`)
            }
            className="rounded-lg border border-al-navy px-4 py-2.5 text-sm font-semibold text-al-navy transition hover:bg-al-navy-light"
          >
            Run Macro Stress Test
          </button>

          <button
            onClick={() =>
              navigate(`/underwriter/applications/${applicationId}/decision`)
            }
            className="rounded-lg bg-al-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900"
          >
            Make Loan Decision
          </button>
        </div>
      </div>
    </Card>
  )
}