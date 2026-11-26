import type { Application } from '../../types/application'
import { formatCurrency } from '../../utils/loanDecisionUtils'

interface Props {
  application: Application
}

export default function ApplicationSummary({ application }: Props) {
  return (
    <div className="rounded-xl border border-al-border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Application Summary
        </h2>

        <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">
          {application.status}
        </span>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-al-muted">
            Reference
          </p>
          <p className="mt-1 font-semibold text-gray-900">
            {application.referenceNumber || application.id}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-al-muted">
            Applicant
          </p>
          <p className="mt-1 font-semibold text-gray-900">
            {application.applicant}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-al-muted">
            Requested Mortgage
          </p>
          <p className="mt-1 font-semibold text-gray-900">
            {formatCurrency(application.requestedMortgage)}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-al-muted">
            Loan Term
          </p>
          <p className="mt-1 font-semibold text-gray-900">
            {application.loanTerm} Years
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-al-border pt-4">
        <p className="text-xs uppercase tracking-wide text-al-muted">
          Property Address
        </p>

        <p className="mt-1 font-medium text-gray-900">
          {application.property}
        </p>

        <p className="mt-1 text-sm text-al-muted">
          {application.location}
        </p>
      </div>
    </div>
  )
}