import { Link, useParams } from 'react-router'
import StatusBadge from '../../components/common/StatusBadge'
import { sampleApplications } from '../../data/sampleApplications'

function BrokerApplicationDetails() {
  const { id } = useParams()

  const application = sampleApplications.find(
    (item) => item.id === id
  )

  if (!application) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Application not found
        </h1>

        <p className="mt-2 text-gray-600">
          The requested application could not be found.
        </p>

        <Link
          to="/broker/applications"
          className="mt-4 inline-block text-sm font-medium text-gray-900 hover:underline"
        >
          Back to applications
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link
        to="/broker/applications"
        className="text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        ← Back to applications
      </Link>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {application.id}
          </p>

          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            {application.applicant}
          </h1>

          <p className="mt-1 text-gray-600">
            {application.location}
          </p>
        </div>

        <StatusBadge status={application.status} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Applicant
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <DetailItem
              label="Name"
              value={application.applicant}
            />

            <DetailItem
              label="Location"
              value={application.location}
            />

            <DetailItem
              label="Gross income"
              value={`€${application.grossIncome.toLocaleString()}`}
            />

            <DetailItem
              label="Existing debt"
              value={`€${application.existingDebt.toLocaleString()}`}
            />

            <DetailItem
              label="Deposit"
              value={`€${application.deposit.toLocaleString()}`}
            />
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Property
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <DetailItem
              label="Property"
              value={application.property}
            />

            <DetailItem
              label="Property type"
              value={application.propertyType}
            />

            <DetailItem
              label="Size"
              value={`${application.propertySize} m²`}
            />

            <DetailItem
              label="BER rating"
              value={application.berRating}
            />

          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900">
            Loan
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <DetailItem
              label="Requested mortgage"
              value={`€${application.requestedMortgage.toLocaleString()}`}
            />

            <DetailItem
              label="Loan term"
              value={`${application.loanTerm} years`}
            />

            <DetailItem
              label="Asking price"
              value={`€${application.askingPrice.toLocaleString()}`}
            />

            <DetailItem
              label="ML valuation"
              value={`€${application.mlValuation.toLocaleString()}`}
            />
          </div>
        </section>
      </div>

      <div className="mt-8 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Application assessment
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Detailed application assessment and AI results will be
          implemented in a later sprint.
        </p>
      </div>
    </div>
  )
}

interface DetailItemProps {
  label: string
  value: string
}

function DetailItem({
  label,
  value,
}: DetailItemProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-900">
        {value}
      </p>
    </div>
  )
}

export default BrokerApplicationDetails