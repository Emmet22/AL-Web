import { useMemo } from 'react'
import { Link } from 'react-router'

import { useAuth } from '../../context/AuthContext'
import { useApplications } from '../../hooks/useApplications'

import Card from '../../components/common/Card'
import ApplicationTable from '../../components/common/ApplicationTable'
import StatusBadge from '../../components/common/StatusBadge'

import type { ApplicationStatus } from '../../data/sampleApplications'

const pipelineStatuses: ApplicationStatus[] = [
  'Applied',
  'AI Deliberated',
  'Underwriter Approved',
  'Funded',
  'Closed',
]

const euro = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

export default function UnderwriterDashboard() {
  const { user } = useAuth()

  const {
    applications,
    loading,
    error,
  } = useApplications(user?.role, user?.id)

  const summary = useMemo(() => ({
    total: applications.length,

    applied: applications.filter(
      app => app.status === 'Applied'
    ).length,

    aiDeliberated: applications.filter(
      app => app.status === 'AI Deliberated'
    ).length,

    approved: applications.filter(
      app => app.status === 'Underwriter Approved'
    ).length,

    funded: applications.filter(
      app => app.status === 'Funded'
    ).length,

  }), [applications])

  const groupedApplications = useMemo(() =>
    pipelineStatuses.map(status => ({
      status,
      applications: applications.filter(
        app => app.status === status
      ),
    }))
  , [applications])

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500">
        Loading underwriting pipeline...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <p className="font-medium text-red-800">
          Unable to load applications: {error}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">

      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Underwriting Pipeline
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Monitor and review loan applications across the lending process.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <SummaryCard title="Total Applications" value={summary.total} />
        <SummaryCard title="Applied" value={summary.applied} />
        <SummaryCard title="AI Deliberated" value={summary.aiDeliberated} />
        <SummaryCard title="Approved" value={summary.approved} />
        <SummaryCard title="Funded" value={summary.funded} />
      </div>

      {/* Application pipeline */}
      <div className="space-y-6">

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Applications by Status
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Select an application to review its details.
          </p>
        </div>

        {applications.length === 0 ? (
          <Card>
            <p className="py-6 text-center text-sm text-gray-500">
              No applications are currently available.
            </p>
          </Card>
        ) : (
          groupedApplications.map(group => (
            <Card key={group.status}>

              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <StatusBadge status={group.status} />

                  <span className="text-sm text-gray-500">
                    {group.applications.length} applications
                  </span>
                </div>
              </div>

              {group.applications.length === 0 ? (
                <p className="py-4 text-sm text-gray-400">
                  No applications at this stage.
                </p>
              ) : (
                <div className="space-y-3">
                  {group.applications.map(application => (
                    <div
                      key={application.id}
                      className="flex flex-col justify-between gap-4 rounded-lg border border-gray-100 p-4 transition hover:border-gray-300 hover:bg-gray-50 sm:flex-row sm:items-center"
                    >
                      {/* Application Information */}
                      <Link
                        to={`/underwriter/applications/${application.id}`}
                        className="min-w-0 flex-1"
                      >
                        <p className="font-medium text-gray-900">
                          {application.applicant}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {application.id} · {application.property}
                        </p>
                      </Link>

                      {/* Mortgage Amount */}
                      <div className="sm:text-right">
                        <p className="font-medium text-gray-900">
                          {euro.format(application.requestedMortgage)}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Requested mortgage
                        </p>
                      </div>

                      {/* Quick Actions */}
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
          ))
        )}

      </div>

      {/* All applications */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          All Applications
        </h2>

        <ApplicationTable
          applications={applications}
          clickableRows
          getApplicationLink={id =>
            `/underwriter/applications/${id}`
          }
        />
      </section>

    </div>
  )
}

function SummaryCard({
  title,
  value,
}: {
  title: string
  value: number
}) {
  return (
    <Card>
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-gray-900">
        {value}
      </p>
    </Card>
  )
}