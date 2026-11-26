import { Link } from 'react-router'

/**
 * N.B. pending until the AI API endpoint
 * is ready.
 */

interface Props {
  applicationId: string
}

export default function AIRecommendation({ applicationId }: Props) {
  return (
    <div className="rounded-xl border border-al-border bg-gray-50 p-5">
      <p className="text-sm font-medium text-al-muted">
        AI Underwriting Recommendation
      </p>

      <h2 className="mt-1 text-lg font-semibold text-gray-800">
        AI Assessment Pending
      </h2>

      <p className="mt-2 text-sm leading-6 text-al-muted">
        The AI underwriting recommendation will appear here once the
        assessment has been completed.
      </p>

      <Link
        to={`/underwriter/applications/${applicationId}/ai-deliberation`}
        className="mt-4 inline-block text-sm font-medium text-al-navy hover:underline"
      >
        View AI Findings →
      </Link>
    </div>
  )
}