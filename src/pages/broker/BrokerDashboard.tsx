import Card from "../../components/common/Card"

function BrokerDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Broker Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Overview of mortgage applications.
      </p>

      {/* testing card component */}
      <Card>
        <h2>Total Applications</h2>
        <p>24</p>
      </Card>
    </div>
  )
}

export default BrokerDashboard