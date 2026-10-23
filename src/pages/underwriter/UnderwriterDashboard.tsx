import Card from '../../components/common/Card'
import ApplicationTable from '../../components/common/ApplicationTable'
import { sampleApplications } from '../../data/sampleApplications'

function UnderwriterDashboard() {
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
          Origination Pipeline
        </h1>

        <p className="mt-2 text-gray-600">
          Review and manage mortgage applications across the lending portfolio.
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
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Application Pipeline
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Applications across the lending portfolio.
          </p>
        </div>

        <ApplicationTable />
      </div>
    </div>
  )
}

export default UnderwriterDashboard