import { Link } from 'react-router'

import Card from '../common/Card'
import StatusBadge from '../common/StatusBadge'

import { formatCurrency } from '../../utils/applicationFormatting'

import type { Application, ApplicationStatus } from '../../types/application'

interface PipelineGroupProps {
  status: ApplicationStatus
  applications: Application[]
}

export default function PipelineGroup({
  status,
  applications,
}: PipelineGroupProps) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <StatusBadge status={status} />

          <span className="text-sm text-gray-500">
            {applications.length} applications
          </span>
        </div>
      </div>

      {applications.length === 0 ? (
        <p className="py-4 text-sm text-gray-400">
          No applications at this stage.
        </p>
      ) : (
        <div className="space-y-3">
          {applications.map(application => (
            <div
              key={application.id}
              className="flex flex-col justify-between gap-4 rounded-lg border border-gray-100 p-4 transition hover:border-gray-300 hover:bg-gray-50 sm:flex-row sm:items-center"
            >
              <Link
                to={`/underwriter/applications/${application.id}`}
                className="min-w-0 flex-1"
              >
                <p className="font-medium text-gray-900">
                  {application.applicant}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {application.referenceNumber || application.id}
                  {' · '}
                  {application.property}
                </p>
              </Link>

              <div className="sm:text-right">
                <p className="font-medium text-gray-900">
                  {formatCurrency(application.requestedMortgage)}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Requested mortgage
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  to={`/underwriter/applications/${application.id}/ai-deliberation`}
                  className="rounded-lg border border-al-border bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  AI Findings
                </Link>

                <Link
                  to={`/underwriter/applications/${application.id}/decision`}
                  className="rounded-lg bg-al-navy px-3 py-2 text-xs font-medium text-white hover:bg-blue-900"
                >
                  Loan Decision
                </Link>

                <Link
                  to={`/underwriter/stress-testing/${application.id}`}
                  className="rounded-lg border border-al-navy bg-white px-3 py-2 text-xs font-medium text-al-navy hover:bg-al-navy-light"
                >
                  Stress Test
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}