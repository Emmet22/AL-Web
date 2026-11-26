import Card from '../common/Card'
import type { StressScenario } from '../../hooks/useStressTesting'

interface StressTestSummaryProps {
  scenarios: StressScenario[]
}

export default function StressTestSummary({
  scenarios,
}: StressTestSummaryProps) {
  const highestScenario = scenarios[scenarios.length - 1]

  if (!highestScenario) return null

  const result = highestScenario.result

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-al-navy">
            Stress Test Summary
          </h2>
          <p className="text-sm text-gray-500">
            Overview of the impact under the most severe simulated scenario.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Highest Scenario
            </p>
            <p className="mt-2 text-xl font-bold text-al-navy">
              +3%
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              New Monthly Repayment
            </p>
            <p className="mt-2 text-xl font-bold text-al-navy">
              {formatCurrency(result.monthlyRepayment)}
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Repayment Increase
            </p>
            <p className="mt-2 text-xl font-bold text-al-navy">
              +{formatCurrency(result.repaymentIncrease)}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <h3 className="text-sm font-semibold text-yellow-900">
            Important Disclaimer
          </h3>
          <p className="mt-1 text-sm text-yellow-800">
            These stress test results are illustrative estimates based on
            the supplied loan and property information. They are intended
            to support underwriting analysis and should not be treated as
            a final lending decision or financial advice.
          </p>
        </div>
      </div>
    </Card>
  )
}