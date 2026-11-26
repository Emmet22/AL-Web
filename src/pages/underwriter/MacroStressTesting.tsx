import { useMemo, useState } from 'react'
import Card from '../../components/common/Card'
import {
  calculateMonthlyRepayment,
  calculateStressTest,
} from '../../utils/stressTestingCalculations'

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)

const formatPercentage = (value: number) =>
  `${value.toFixed(1)}%`

// Keeps numeric inputs within their permitted range.
const clampValue = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export default function MacroStressTesting() {
  const [loanAmount, setLoanAmount] = useState(300000)
  const [propertyValue, setPropertyValue] = useState(375000)
  const [interestRate, setInterestRate] = useState(3.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [propertyDecrease, setPropertyDecrease] = useState(10)

  const currentRepayment = useMemo(
    () => calculateMonthlyRepayment(loanAmount, interestRate, loanTerm),
    [loanAmount, interestRate, loanTerm]
  )

  const scenarios = useMemo(
    () =>
      [1, 2, 3].map((increase) =>
        calculateStressTest(
          {
            loanAmount,
            propertyValue,
            annualInterestRate: interestRate,
            loanTerm,
            propertyValueDecrease: propertyDecrease,
          },
          increase
        )
      ),
    [loanAmount, propertyValue, interestRate, loanTerm, propertyDecrease]
  )

  const currentLTV = (loanAmount / propertyValue) * 100

  const getLTVStatus = (ltv: number) => {
    if (ltv <= 80) {
      return {
        label: 'Low Risk',
        className: 'bg-green-100 text-green-700',
      }
    }

    if (ltv <= 90) {
      return {
        label: 'Moderate Risk',
        className: 'bg-yellow-100 text-yellow-700',
      }
    }

    return {
      label: 'High Risk',
      className: 'bg-red-100 text-red-700',
    }
  }

  const currentLTVStatus = getLTVStatus(currentLTV)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Macro Stress Testing
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Evaluate mortgage affordability under changing economic conditions.
        </p>
      </div>

      {/* Input Section */}
      <Card>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Loan Parameters
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Adjust the mortgage details to simulate different economic scenarios.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Mortgage Amount */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Mortgage Amount (€)
            </label>
            <input
              type="number"
              min="1"
              step="1"
              value={loanAmount}
              onChange={(e) => {
                const value = Number(e.target.value)
                if (Number.isFinite(value)) {
                  setLoanAmount(Math.max(1, value))
                }
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-al-navy focus:ring-1 focus:ring-al-navy"
            />
            <p className="mt-1 text-xs text-gray-400">
              Must be greater than €0.
            </p>
          </div>

          {/* Property Value */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Property Value (€)
            </label>
            <input
              type="number"
              min="1"
              step="1"
              value={propertyValue}
              onChange={(e) => {
                const value = Number(e.target.value)
                if (Number.isFinite(value)) {
                  setPropertyValue(Math.max(1, value))
                }
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-al-navy focus:ring-1 focus:ring-al-navy"
            />
            <p className="mt-1 text-xs text-gray-400">
              Must be greater than €0.
            </p>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              min="0"
              max="30"
              step="0.1"
              value={interestRate}
              onChange={(e) => {
                const value = Number(e.target.value)
                if (Number.isFinite(value)) {
                  setInterestRate(clampValue(value, 0, 30))
                }
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-al-navy focus:ring-1 focus:ring-al-navy"
            />
            <p className="mt-1 text-xs text-gray-400">
              Between 0% and 30%.
            </p>
          </div>

          {/* Loan Term */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Loan Term (Years)
            </label>
            <input
              type="number"
              min="1"
              max="40"
              step="1"
              value={loanTerm}
              onChange={(e) => {
                const value = Number(e.target.value)
                if (Number.isFinite(value)) {
                  setLoanTerm(
                    clampValue(Math.round(value), 1, 40)
                  )
                }
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-al-navy focus:ring-1 focus:ring-al-navy"
            />
            <p className="mt-1 text-xs text-gray-400">
              Whole years only, between 1 and 40.
            </p>
          </div>
        </div>
      </Card>

      {/* Current Position */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          Current Loan Position
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <p className="text-sm text-gray-500">Monthly Repayment</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {formatCurrency(currentRepayment)}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              At {interestRate.toFixed(1)}% interest
            </p>
          </Card>

          <Card>
            <p className="text-sm text-gray-500">Loan-to-Value Ratio</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {formatPercentage(currentLTV)}
            </p>
            <span
              className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${currentLTVStatus.className}`}
            >
              {currentLTVStatus.label}
            </span>
          </Card>

          <Card>
            <p className="text-sm text-gray-500">Property Equity</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {formatCurrency(propertyValue - loanAmount)}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Current property value minus mortgage
            </p>
          </Card>
        </div>
      </div>

      {/* Property Stress Test */}
      <Card>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Property Market Stress
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Simulate a decline in property market values.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <label className="mb-3 block text-sm font-medium text-gray-700">
              Property Value Decrease: {propertyDecrease}%
            </label>

            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={propertyDecrease}
              onChange={(e) =>
                setPropertyDecrease(
                  clampValue(Number(e.target.value), 0, 30)
                )
              }
              className="w-full cursor-pointer accent-al-navy"
            />

            <div className="mt-1 flex justify-between text-xs text-gray-400">
              <span>0%</span>
              <span>15%</span>
              <span>30%</span>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 md:min-w-56">
            <p className="text-xs text-gray-500">
              Stressed Property Value
            </p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              {formatCurrency(propertyValue * (1 - propertyDecrease / 100))}
            </p>
          </div>
        </div>
      </Card>

      {/* Interest Rate Scenarios */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Interest Rate Stress Scenarios
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Compare how increasing interest rates affect monthly repayments
            and the property's Loan-to-Value ratio.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {scenarios.map((scenario) => {
            const ltvStatus = getLTVStatus(scenario.stressedLTV)

            return (
              <Card key={scenario.interestRateIncrease}>
                {/* Scenario Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Stress Scenario
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      +{scenario.interestRateIncrease.toFixed(0)} percentage point
                      {scenario.interestRateIncrease !== 1 ? 's' : ''}
                    </h3>
                  </div>

                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                    Stressed
                  </span>
                </div>

                {/* Interest Rate */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500">
                      New Annual Interest Rate
                    </p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {interestRate.toFixed(1)}% → {scenario.stressedInterestRate.toFixed(1)}%
                    </p>
                  </div>

                  {/* Original vs Stressed Comparison */}
                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="mb-3 text-sm font-semibold text-gray-900">
                      Original vs Stressed Position
                    </h4>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-gray-50 p-3">
                        <p className="mb-2 text-xs font-medium text-gray-500">
                          Original
                        </p>

                        <p className="text-xs text-gray-500">
                          Monthly Repayment
                        </p>
                        <p className="mb-3 font-semibold text-gray-900">
                          {formatCurrency(currentRepayment)}
                        </p>

                        <p className="text-xs text-gray-500">
                          Property Value
                        </p>
                        <p className="mb-3 font-semibold text-gray-900">
                          {formatCurrency(propertyValue)}
                        </p>

                        <p className="text-xs text-gray-500">
                          LTV
                        </p>
                        <p className="font-semibold text-gray-900">
                          {formatPercentage(currentLTV)}
                        </p>
                      </div>

                      <div className="rounded-lg bg-red-50 p-3">
                        <p className="mb-2 text-xs font-medium text-red-700">
                          Stressed
                        </p>

                        <p className="text-xs text-gray-500">
                          Monthly Repayment
                        </p>
                        <p className="mb-3 font-semibold text-gray-900">
                          {formatCurrency(scenario.monthlyRepayment)}
                        </p>

                        <p className="text-xs text-gray-500">
                          Property Value
                        </p>
                        <p className="mb-3 font-semibold text-gray-900">
                          {formatCurrency(scenario.stressedPropertyValue)}
                        </p>

                        <p className="text-xs text-gray-500">
                          LTV
                        </p>
                        <p className="font-semibold text-gray-900">
                          {formatPercentage(scenario.stressedLTV)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Repayment Increase */}
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-500">
                      Monthly Repayment Increase
                    </p>
                    <p className="mt-1 text-xl font-bold text-red-600">
                      +{formatCurrency(scenario.repaymentIncrease)}
                    </p>
                    <p className="mt-1 text-sm font-medium text-red-600">
                      {formatPercentage(scenario.repaymentPercentageIncrease)} increase
                    </p>
                  </div>

                  {/* Stressed LTV Status */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        Stressed LTV Indicator
                      </p>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${ltvStatus.className}`}
                      >
                        {ltvStatus.label}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <p className="mt-3 text-xs text-gray-400">
          LTV risk categories are illustrative indicators only. They do not
          represent actual lender policies or formal lending criteria.
        </p>
      </div>

      {/* Summary */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900">
          Stress Test Summary
        </h2>

        <div className="mt-4 space-y-3">
          {scenarios.map((scenario) => (
            <div
              key={scenario.interestRateIncrease}
              className="flex flex-col gap-2 rounded-lg bg-gray-50 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-gray-900">
                  +{scenario.interestRateIncrease.toFixed(0)} percentage point
                  {scenario.interestRateIncrease !== 1 ? 's' : ''}
                </p>
                <p className="text-xs text-gray-500">
                  Monthly repayment increase
                </p>
              </div>

              <p className="font-semibold text-red-600">
                +{formatCurrency(scenario.repaymentIncrease)} (
                {formatPercentage(scenario.repaymentPercentageIncrease)})
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-4">
          <p className="text-sm font-semibold text-blue-900">
            Important Information
          </p>
          <p className="mt-1 text-sm text-blue-800">
            These calculations are illustrative stress-test scenarios.
            They assume the mortgage balance and remaining loan term stay
            unchanged, and that the interest rate changes immediately.
            They do not represent a formal lending decision or a prediction
            of future economic conditions.
          </p>
        </div>
      </Card>
    </div>
  )
}