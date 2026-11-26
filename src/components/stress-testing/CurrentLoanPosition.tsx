import Card from '../common/Card'
import type { CurrentLoanPosition as Position } from '../../hooks/useStressTesting'

interface CurrentLoanPositionProps {
  position: Position
}

export default function CurrentLoanPosition({
  position,
}: CurrentLoanPositionProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value)

  const ltvStatus =
    position.ltv <= 80
      ? 'Low'
      : position.ltv <= 90
        ? 'Moderate'
        : 'High'

  const metrics = [
    {
      label: 'Monthly Repayment',
      value: formatCurrency(position.monthlyRepayment),
    },
    {
      label: 'Current LTV',
      value: `${position.ltv.toFixed(1)}%`,
    },
    {
      label: 'Property Equity',
      value: formatCurrency(position.equity),
    },
    {
      label: 'LTV Risk Level',
      value: ltvStatus,
    },
  ]

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-al-navy">
            Current Loan Position
          </h2>
          <p className="text-sm text-gray-500">
            The applicant's current position before stress testing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg bg-gray-50 p-4"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                {metric.label}
              </p>
              <p className="mt-2 text-xl font-bold text-al-navy">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}