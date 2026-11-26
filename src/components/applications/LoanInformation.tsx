import Card from '../common/Card'

import type { Application } from '../../types/application'

import { formatCurrency } from '../../utils/applicationFormatting'

interface LoanInformationProps {
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

export default function LoanInformation({
  application,
}: LoanInformationProps) {
  return (
    <Card>
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Loan Information
      </h2>

      <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
        <DetailRow
          label="Requested Mortgage"
          value={formatCurrency(application.requestedMortgage)}
        />

        <DetailRow
          label="Loan Term"
          value={`${application.loanTerm} years`}
        />

        <DetailRow
          label="Asking Price"
          value={formatCurrency(application.askingPrice)}
        />

        <DetailRow
          label="ML Property Valuation"
          value={
            application.mlValuation !== undefined
              ? formatCurrency(application.mlValuation)
              : 'Not available'
          }
        />
      </div>
    </Card>
  )
}