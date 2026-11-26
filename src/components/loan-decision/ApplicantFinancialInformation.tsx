import type { Application } from '../../types/application'
import { formatCurrency } from '../../utils/loanDecisionUtils'

interface Props {
  application: Application
}

export default function ApplicantFinancialInformation({
  application,
}: Props) {
  const financialInformation = [
    {
      label: 'Gross Annual Income',
      value: formatCurrency(application.grossIncome),
    },
    {
      label: 'Existing Debt',
      value: formatCurrency(application.existingDebt),
    },
    {
      label: 'Deposit',
      value: formatCurrency(application.deposit),
    },
    {
      label: 'Monthly Debt Repayments',
      value: formatCurrency(application.monthlyDebtRepayments),
    },
  ]

  return (
    <div className="rounded-xl border border-al-border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        Applicant Financial Information
      </h2>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {financialInformation.map((item) => (
          <div key={item.label}>
            <p className="text-xs uppercase tracking-wide text-al-muted">
              {item.label}
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}