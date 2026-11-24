import { useMemo } from 'react'
import { Link } from 'react-router'

import { useAuth } from '../../context/AuthContext'
import { useApplications } from '../../hooks/useApplications'

import Card from '../../components/common/Card'
import StatusBadge from '../../components/common/StatusBadge'

import type { ApplicationStatus } from '../../types/application'

const euro = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

export default function UnderwriterDashboard() {
  const { user } = useAuth()

  const { applications, loading, error } = useApplications(
    user?.role,
    user?.id
  )

  const statistics = useMemo(() => {
    return {
      total: applications.length,

      awaitingReview: applications.filter(
        (app) => app.status === 'Applied'
      ).length,

      aiCompleted: applications.filter(
        (app) => app.status === 'AI Deliberated'
      ).length,

      approved: applications.filter(
        (app) => app.status === 'Underwriter Approved'
      ).length,

      funded: applications.filter(
        (app) => app.status === 'Funded'
      ).length,
    }
  }, [applications])

  const recentApplications = applications.slice(0, 5)

  const reviewApplications = applications
    .filter(
      (app) =>
        app.status === 'Applied' ||
        app.status === 'AI Deliberated'
    )
    .slice(0, 5)

  const formatStatus = (status: ApplicationStatus) => status

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        Loading dashboard...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-800">
          Unable to load dashboard
        </h2>

        <p className="mt-2 text-sm text-red-700">
          {error}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">

      {/* Dashboard Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Underwriter Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {user?.name || 'Underwriter'}. Here's an overview
          of your lending activity.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

        <Card>
          <p className="text-sm text-gray-500">
            Total Applications
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {statistics.total}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">
            Awaiting Review
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {statistics.awaitingReview}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">
            AI Deliberated
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {statistics.aiCompleted}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">
            Approved
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {statistics.approved}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">
            Funded
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {statistics.funded}
          </p>
        </Card>

      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Applications Requiring Attention */}
        <div className="xl:col-span-2">
          <Card>
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Applications Requiring Attention
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Applications awaiting underwriting review.
                </p>
              </div>

              <Link
                to="/underwriter/pipeline"
                className="text-sm font-semibold text-al-navy hover:underline"
              >
                View Pipeline →
              </Link>

            </div>

            {reviewApplications.length === 0 ? (
              <div className="rounded-lg bg-gray-50 p-6 text-center">
                <p className="text-sm text-gray-500">
                  No applications currently require attention.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">

                {reviewApplications.map((application) => (
                  <div
                    key={application.id}
                    className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center"
                  >

                    <div>
                      <Link
                        to={`/underwriter/applications/${application.id}`}
                        className="font-semibold text-gray-900 hover:text-al-navy"
                      >
                        {application.applicant}
                      </Link>

                      <p className="mt-1 text-sm text-gray-500">
                        {application.referenceNumber || application.id}
                        {' · '}
                        {application.location}
                      </p>

                      <p className="mt-1 text-sm font-medium text-gray-700">
                        {euro.format(application.requestedMortgage)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <StatusBadge status={application.status} />

                      <Link
                        to={`/underwriter/applications/${application.id}`}
                        className="text-sm font-semibold text-al-navy hover:underline"
                      >
                        Review →
                      </Link>
                    </div>

                  </div>
                ))}

              </div>
            )}
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>

            <div className="space-y-3">

              <Link
                to="/underwriter/pipeline"
                className="block rounded-lg border border-gray-200 p-4 transition hover:border-al-navy hover:bg-al-navy-light"
              >
                <h3 className="font-semibold text-gray-900">
                  Origination Pipeline
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  View and manage mortgage applications.
                </p>

                <span className="mt-3 block text-sm font-semibold text-al-navy">
                  Open Pipeline →
                </span>
              </Link>

              <Link
                to="/underwriter/stress-testing"
                className="block rounded-lg border border-gray-200 p-4 transition hover:border-al-navy hover:bg-al-navy-light"
              >
                <h3 className="font-semibold text-gray-900">
                  Macro Stress Testing
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Explore the impact of interest-rate and property-value changes.
                </p>

                <span className="mt-3 block text-sm font-semibold text-al-navy">
                  Open Stress Testing →
                </span>
              </Link>

            </div>
          </Card>
        </div>

      </div>

      {/* Recent Applications */}
      <Card>
        <div className="mb-5 flex items-center justify-between">

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Applications
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              The latest mortgage applications received.
            </p>
          </div>

          <Link
            to="/underwriter/pipeline"
            className="text-sm font-semibold text-al-navy hover:underline"
          >
            View All →
          </Link>

        </div>

        {recentApplications.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-500">
            No applications available.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">

              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="pb-3 pr-4 font-medium">
                    Applicant
                  </th>

                  <th className="pb-3 pr-4 font-medium">
                    Reference
                  </th>

                  <th className="pb-3 pr-4 font-medium">
                    Mortgage
                  </th>

                  <th className="pb-3 pr-4 font-medium">
                    Status
                  </th>

                  <th className="pb-3 font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentApplications.map((application) => (
                  <tr
                    key={application.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="py-4 pr-4 font-medium text-gray-900">
                      {application.applicant}
                    </td>

                    <td className="py-4 pr-4 text-gray-500">
                      {application.referenceNumber || application.id}
                    </td>

                    <td className="py-4 pr-4 font-medium text-gray-700">
                      {euro.format(application.requestedMortgage)}
                    </td>

                    <td className="py-4 pr-4">
                      <StatusBadge status={application.status} />
                    </td>

                    <td className="py-4">
                      <Link
                        to={`/underwriter/applications/${application.id}`}
                        className="font-semibold text-al-navy hover:underline"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </Card>

    </div>
  )
}