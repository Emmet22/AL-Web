interface ApplicationSummaryProps {
  applicationId: string
  applicant: string
  agentsCompleted: number
  totalAgents: number
}

export default function ApplicationSummary({
  applicationId,
  applicant,
  agentsCompleted,
  totalAgents,
}: ApplicationSummaryProps) {
  return (
    <div className="rounded-xl border border-al-border bg-white p-5 shadow-sm">

      <div className="grid gap-4 sm:grid-cols-3">

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-al-muted">
            Application Reference
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {applicationId}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-al-muted">
            Applicant
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {applicant}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-al-muted">
            Agents Completed
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {agentsCompleted} / {totalAgents}
          </p>
        </div>

      </div>

    </div>
  )
}