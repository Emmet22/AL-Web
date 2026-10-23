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

        <p className="mt-2 text-gray-600">
          Overview of your mortgage applications.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        <Card>
          <p className="text-sm font-medium text-gray-500">
            Total Applications
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {totalApplications}
          </p>
        </Card>

        <Card>
          <p className="text-sm font-medium text-gray-500">
            Awaiting Review
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {awaitingReview}
          </p>
        </Card>

        <Card>
          <p className="text-sm font-medium text-gray-500">
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

            <p className="mt-1 text-sm text-gray-500">
              Recently submitted mortgage applications.
            </p>
          </div>

          <Link
            to="/broker/applications"
            className="text-sm font-medium text-gray-900 hover:underline"
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