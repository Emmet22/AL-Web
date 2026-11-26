import Card from '../common/Card'

import type { Application } from '../../types/application'

import { formatCurrency } from '../../utils/applicationFormatting'

interface ApplicationInformationProps {
  application: Application
}

function DetailRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-gray-100 py-3 last:border-0">
      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-gray-900">
        {value}
      </span>
    </div>
  )
}

export default function ApplicationInformation({
  application,
}: ApplicationInformationProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

      {/* Applicant Information */}
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Applicant Information
        </h2>

        <DetailRow
          label="Applicant"
          value={application.applicant}
        />

        <DetailRow
          label="Annual Gross Income"
          value={formatCurrency(application.grossIncome)}
        />

        <DetailRow
          label="Existing Debt"
          value={formatCurrency(application.existingDebt)}
        />

        <DetailRow
          label="Deposit"
          value={formatCurrency(application.deposit)}
        />
      </Card>

      {/* Property Information */}
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Property Information
        </h2>

        <DetailRow
          label="Property"
          value={application.property}
        />

        <DetailRow
          label="Location"
          value={application.location}
        />

        <DetailRow
          label="Property Type"
          value={application.propertyType}
        />

        <DetailRow
          label="Property Size"
          value={`${application.propertySize} m²`}
        />

        <DetailRow
          label="BER Rating"
          value={application.berRating}
        />
      </Card>
    </div>
  )
}