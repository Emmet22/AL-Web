import type { Application } from '../../types/application'

import {
  calculateFinancialMetrics,
} from '../../utils/loanDecisionUtils'

interface Props {
  application: Application
}

export default function FinancialAssessment({ application }: Props) {
  const metrics = calculateFinancialMetrics(application)

  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold text-gray-900">
        Financial Assessment
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-al-border bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-al-muted">
              {metric.label}
            </p>

            <p className="mt-2 text-2xl font-bold text-al-navy">
              {metric.value}
            </p>

            <p className="mt-2 text-xs text-al-muted">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}