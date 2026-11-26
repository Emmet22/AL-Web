import Card from '../common/Card'
import type { Application } from '../../types/application'

interface ApplicationSummaryProps {
  application: Application
}

export default function ApplicationSummary({
  application,
}: ApplicationSummaryProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value)

  const details = [
    {
      label: 'Applicant',
      value: application.applicant,
    },
    {
      label: 'Reference',
      value: application.referenceNumber ?? application.id,
    },
    {
      label: 'Property',
      value: application.property,
    },
    {
      label: 'Location',
      value: application.location || 'Not provided',
    },
    {
      label: 'Requested Mortgage',
      value: formatCurrency(application.requestedMortgage),
    },
    {
      label: 'Property Value',
      value: formatCurrency(application.propertyValue),
    },
    {
      label: 'Loan Term',
      value: `${application.loanTerm} years`,
    },
    {
      label: 'Property Type',
      value: application.propertyType,
    },
  ]

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-al-navy">
            Application Details
          </h2>
          <p className="text-sm text-gray-500">
            Stress testing is prepopulated using this applicant's information.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((detail) => (
            <div key={detail.label}>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                {detail.label}
              </p>
              <p className="mt-1 break-words text-sm font-semibold text-gray-900">
                {detail.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}