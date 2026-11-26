import Card from '../common/Card'
import type { StressScenario } from '../../hooks/useStressTesting'

interface StressScenarioCardProps {
  scenario: StressScenario
}

export default function StressScenarioCard({
  scenario,
}: StressScenarioCardProps) {
  const { result } = scenario

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value)

  const ltvStatus =
    result.stressedLTV <= 80
      ? 'Low'
      : result.stressedLTV <= 90
        ? 'Moderate'
        : 'High'

  const metrics = [
    {
      label: 'Stressed Interest Rate',
      value: `${result.stressedInterestRate.toFixed(2)}%`,
    },
    {
      label: 'Monthly Repayment',
      value: formatCurrency(result.monthlyRepayment),
    },
    {
      label: 'Repayment Increase',
      value: `+${formatCurrency(result.repaymentIncrease)}`,
    },
    {
      label: 'Repayment Increase (%)',
      value: `${result.repaymentPercentageIncrease.toFixed(1)}%`,
    },
    {
      label: 'Stressed Property Value',
      value: formatCurrency(result.stressedPropertyValue),
    },
    {
      label: 'Stressed LTV',
      value: `${result.stressedLTV.toFixed(1)}%`,
    },
  ]

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold text-al-navy">
            {scenario.label}
          </h3>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              ltvStatus === 'Low'
                ? 'bg-green-100 text-green-700'
                : ltvStatus === 'Moderate'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
            }`}
          >
            {ltvStatus} LTV
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg bg-gray-50 p-3"
            >
              <p className="text-xs text-gray-500">
                {metric.label}
              </p>
              <p className="mt-1 font-semibold text-gray-900">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}