import type { Application } from '../../types/application'

import {
  calculateLoanAssessment,
} from '../../utils/loanCalculations'

interface FinancialAssessmentProps {
  application: Application
}

function FinancialAssessment({
  application,
}: FinancialAssessmentProps) {

  const assessment = calculateLoanAssessment(application)

  function formatCurrency(value: number) {
    return new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value)
  }

  function getLTVStatus(ltv: number) {

    if (ltv <= 80) {
      return {
        label: 'Lower LTV',
        colour: 'text-green-700 bg-green-50',
      }
    }

    if (ltv <= 90) {
      return {
        label: 'Elevated LTV',
        colour: 'text-yellow-700 bg-yellow-50',
      }
    }

    return {
      label: 'High LTV',
      colour: 'text-red-700 bg-red-50',
    }
  }

  const ltvStatus = getLTVStatus(assessment.loanToValue)

  return (
    <section className="rounded-lg border border-al-border bg-white p-6">

      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Financial Assessment
        </h2>

        <p className="mt-1 text-sm text-al-muted">
          Preliminary financial and property assessment.
        </p>
      </div>

      {/* Main metrics */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {/* LTV */}
        <div className="rounded-lg border border-al-border p-4">

          <p className="text-sm text-al-muted">
            Loan-to-Value (LTV)
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {assessment.loanToValue.toFixed(2)}%
          </p>

          <span
            className={`mt-3 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${ltvStatus.colour}`}
          >
            {ltvStatus.label}
          </span>

        </div>

        {/* LTI */}
        <div className="rounded-lg border border-al-border p-4">

          <p className="text-sm text-al-muted">
            Loan-to-Income (LTI)
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {assessment.loanToIncome.toFixed(2)}x
          </p>

          <p className="mt-3 text-xs text-al-muted">
            Mortgage relative to gross annual income.
          </p>

        </div>

        {/* Equity */}
        <div className="rounded-lg border border-al-border p-4">

          <p className="text-sm text-al-muted">
            Estimated Equity
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {formatCurrency(assessment.equity)}
          </p>

          <p className="mt-3 text-xs text-al-muted">
            Estimated property value minus mortgage.
          </p>

        </div>

      </div>

      {/* Property valuation */}
      <div className="mt-6 border-t border-al-border pt-5">

        <h3 className="text-sm font-semibold text-gray-900">
          Property Valuation
        </h3>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div>
            <p className="text-xs text-al-muted">
              Asking Price
            </p>

            <p className="mt-1 font-medium text-gray-900">
              {formatCurrency(application.askingPrice)}
            </p>
          </div>

          <div>
            <p className="text-xs text-al-muted">
              ML Valuation
            </p>

            <p className="mt-1 font-medium text-gray-900">
              {application.mlValuation !== undefined
                ? formatCurrency(application.mlValuation)
                : 'Not available'}
            </p>
          </div>

          <div>
            <p className="text-xs text-al-muted">
              Assessment Value Used
            </p>

            <p className="mt-1 font-medium text-gray-900">
              {formatCurrency(assessment.propertyValue)}
            </p>
          </div>

        </div>
      </div>

      {/* Financial information */}
      <div className="mt-6 border-t border-al-border pt-5">

        <h3 className="text-sm font-semibold text-gray-900">
          Applicant Financial Information
        </h3>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div>
            <p className="text-xs text-al-muted">
              Gross Annual Income
            </p>

            <p className="mt-1 font-medium text-gray-900">
              {formatCurrency(application.grossIncome)}
            </p>
          </div>

          <div>
            <p className="text-xs text-al-muted">
              Existing Debt Balance
            </p>

            <p className="mt-1 font-medium text-gray-900">
              {formatCurrency(application.existingDebt)}
            </p>
          </div>

          <div>
            <p className="text-xs text-al-muted">
              Deposit
            </p>

            <p className="mt-1 font-medium text-gray-900">
              {formatCurrency(application.deposit)}
            </p>
          </div>

        </div>
      </div>

      <p className="mt-6 rounded-md bg-al-soft p-3 text-xs text-al-muted">
        These figures are preliminary calculations using the
        available application data. They do not represent a
        final lending decision.
      </p>

    </section>
  )
}

export default FinancialAssessment