import Card from '../../components/common/Card'

function BrokerDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Broker Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Overview of mortgage applications.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        <Card>
          <p className="text-sm text-gray-500">
            Total Applications
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            24
          </p>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">
            Pending
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            9
          </p>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">
            Approved
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            11
          </p>
        </Card>
      </div>
    </div>
  )
}

export default BrokerDashboard