import { Link } from 'react-router'

import { useAuth } from '../../context/AuthContext'
import { useApplications } from '../../hooks/useApplications'

import Card from '../../components/common/Card'
import StatusBadge from '../../components/common/StatusBadge'
import SummaryCard from '../../components/dashboard/SummaryCard'
import ProgressItem from '../../components/dashboard/ProgressItem'

import { getApplicationStatistics } from '../../utils/applicationStatistics'

export default function BrokerDashboard() {
  const { user } = useAuth()

  const {
    applications,
    loading,
    error,
  } = useApplications(user?.role, user?.id)

  const summary = getApplicationStatistics(applications)

  const recentApplications = applications.slice(0, 5)

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500">
        Loading your dashboard...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <p className="font-medium text-red-800">
          Unable to load your applications: {error}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">

      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Broker Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {user?.name || 'Broker'}.
          Here's an overview of your mortgage applications.
        </p>
      </div>

      {/* Application Overview */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Application Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Monitor the progress of your submitted applications.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <SummaryCard
            title="Total Applications"
            value={summary.total}
            description="Your portfolio"
          />

          <SummaryCard
            title="Submitted"
            value={summary.applied}
            description="Awaiting assessment"
          />

          <SummaryCard
            title="AI Completed"
            value={summary.aiDeliberated}
            description="Awaiting underwriting"
          />

          <SummaryCard
            title="Approved"
            value={summary.approved}
            description="Underwriter approved"
          />

          <SummaryCard
            title="Funded"
            value={summary.funded}
            description="Successfully funded"
          />
        </div>
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Recent Applications */}
        <section className="lg:col-span-2">
          <Card>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Applications
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your latest mortgage applications.
                </p>
              </div>

              <Link
                to="/broker/applications"
                className="text-sm font-medium text-al-navy hover:underline"
              >
                View all applications →
              </Link>
            </div>

            <div className="mt-6">
              {recentApplications.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-500">
                  You haven't submitted any applications yet.
                </p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {recentApplications.map(application => (
                    <Link
                      key={application.id}
                      to={`/broker/applications/${application.id}`}
                      className="flex flex-col justify-between gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {application.applicant}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {application.referenceNumber ?? application.id}
                          {' · '}
                          {application.location}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <StatusBadge status={application.status} />

                        <span className="text-sm font-medium text-al-navy">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </section>

        {/* Quick Access */}
        <section>
          <Card>
            <h2 className="text-lg font-semibold text-gray-900">
              Quick Access
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your application portfolio.
            </p>

            <div className="mt-6 space-y-3">
              <Link
                to="/broker/applications"
                className="block rounded-lg border border-al-border p-4 transition hover:border-al-navy hover:bg-al-soft"
              >
                <p className="text-sm font-semibold text-gray-900">
                  View Applications
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Search and review your submitted applications.
                </p>
              </Link>

              <div className="rounded-lg border border-al-border p-4">
                <p className="text-sm font-semibold text-gray-900">
                  Application Portfolio
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  You currently have {summary.total} applications in the system.
                </p>
              </div>
            </div>
          </Card>
        </section>
      </div>

      {/* Application Progress */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Application Progress
        </h2>

        <Card>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <ProgressItem
              label="Submitted"
              value={summary.applied}
              status="Applied"
            />

            <ProgressItem
              label="AI Deliberated"
              value={summary.aiDeliberated}
              status="AI Deliberated"
            />

            <ProgressItem
              label="Approved"
              value={summary.approved}
              status="Underwriter Approved"
            />

            <ProgressItem
              label="Funded"
              value={summary.funded}
              status="Funded"
            />
          </div>
        </Card>
      </section>
    </div>
  )
}