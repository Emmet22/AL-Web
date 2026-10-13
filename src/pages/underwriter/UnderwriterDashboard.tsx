import Card from '../../components/common/Card'
import PipelinePreview from '../../components/underwriter/PipelinePreview'

function UnderwriterDashboard() {
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

      <div className="mt-6 grid grid-cols-3 gap-6">
        <Card>
          <p className="text-sm text-gray-500">
            Total Applications
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            32
          </p>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">
            Awaiting Review
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            8
          </p>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">
            AI Deliberated
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            6
          </p>
        </Card>
      </div>

      <div className="mt-8">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Application Pipeline
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Recent applications requiring underwriting review.
          </p>
        </div>

        <PipelinePreview />
      </div>
    </div>
  )
}

export default UnderwriterDashboard