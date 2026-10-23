import { Link } from 'react-router'

import Card from '../../components/common/Card'
import ApplicationTable from '../../components/common/ApplicationTable'
import { sampleApplications } from '../../data/sampleApplications'

function BrokerDashboard() {
  const totalApplications = sampleApplications.length

  const awaitingReview = sampleApplications.filter(
    (application) =>
      application.status === 'Applied'
  ).length

  const approvedApplications = sampleApplications.filter(
    (application) =>
      application.status === 'Underwriter Approved'
  ).length

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Broker Dashboard
        </h1>

        <p className="mt-2 text-al-muted">
          Overview of your mortgage applications.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        <Card>
          <p className="text-sm font-medium text-al-muted">
            Total Applications
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {totalApplications}
          </p>
        </Card>

        <Card>
          <p className="text-sm font-medium text-al-muted">
            Awaiting Review
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {awaitingReview}
          </p>
        </Card>

        <Card>
          <p className="text-sm font-medium text-al-muted">
            Approved
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {approvedApplications}
          </p>
        </Card>
      </div>

      <div className="mt-8">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Applications
            </h2>

            <p className="mt-1 text-sm text-al-muted">
              Recently submitted mortgage applications.
            </p>
          </div>

          <Link
            to="/broker/applications"
            className="text-sm font-medium text-al-navy hover:underline"
          >
            View all applications
          </Link>
        </div>

        <ApplicationTable
          clickableRows
          getApplicationLink={(id) =>
            `/broker/applications/${id}`
          }
        />
      </div>
    </div>
  )
}

export default BrokerDashboard