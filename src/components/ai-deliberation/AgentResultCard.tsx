import type {
  AIAgentResult,
} from '../../types/aiDeliberation'

interface AgentResultCardProps {
  agent: AIAgentResult
}

export default function AgentResultCard({
  agent,
}: AgentResultCardProps) {
  const isReviewRequired =
    agent.recommendation === 'Review Required'

  const isCompleted = agent.status === 'Completed'

  return (
    <div className="rounded-xl border border-al-border bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <p className="text-sm font-medium text-al-muted">
            {agent.role}
          </p>

          <h3 className="mt-1 text-lg font-semibold text-al-navy">
            {agent.name}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              isCompleted
                ? 'bg-al-success-bg text-al-success'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {agent.status}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              isReviewRequired
                ? 'bg-amber-100 text-amber-800'
                : agent.recommendation === 'Decline'
                  ? 'bg-red-100 text-red-800'
                  : agent.recommendation === 'Pending'
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-al-success-bg text-al-success'
            }`}
          >
            {agent.recommendation}
          </span>

        </div>

      </div>

      <p className="mt-3 text-sm leading-6 text-al-muted">
        {agent.description}
      </p>

      <div className="mt-5 border-t border-al-border pt-4">

        <h4 className="mb-3 text-sm font-semibold text-gray-800">
          Key Findings
        </h4>

        <ul className="space-y-2">

          {agent.findings.map((finding, index) => (
            <li
              key={`${agent.name}-${index}`}
              className="flex gap-2 text-sm leading-5 text-gray-600"
            >
              <span className="mt-0.5 text-al-navy">
                •
              </span>

              {finding}
            </li>
          ))}

        </ul>

      </div>

    </div>
  )
}