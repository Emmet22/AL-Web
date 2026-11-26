import { useNavigate } from 'react-router-dom'

import Card from '../../components/common/Card'

import ApplicationSummary from '../../components/stress-testing/ApplicationSummery'
import LoanParameters from '../../components/stress-testing/LoanParameters'
import CurrentLoanPosition from '../../components/stress-testing/CurrentLoanPosition'
import PropertyStressTest from '../../components/stress-testing/PropertyStressTest'
import InterestRateScenarios from '../../components/stress-testing/InterestRateScenarios'
import StressTestSummary from '../../components/stress-testing/StressTestSummary'

import { useStressTesting } from '../../hooks/useStressTesting'

export default function MacroStressTesting() {
  const navigate = useNavigate()

  const {
    application,
    loading,
    error,
    inputs,
    updateInput,
    currentPosition,
    scenarios,
  } = useStressTesting()

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading application and stress testing data...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-red-700">
            Unable to Load Stress Test
          </h2>

          <p className="text-sm text-gray-600">
            {error}
          </p>

          <button
            onClick={() => navigate('/underwriter/pipeline')}
            className="rounded-lg bg-al-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-al-navy/90"
          >
            Back to Pipeline
          </button>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-al-navy">
            Macro Stress Testing
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Analyse the impact of changing interest rates and property values
            on mortgage affordability and lending risk.
          </p>
        </div>

        {application && (
          <button
            onClick={() =>
              navigate(`/underwriter/applications/${application.id}`)
            }
            className="rounded-lg border border-al-navy px-4 py-2.5 text-sm font-semibold text-al-navy transition hover:bg-al-navy-light"
          >
            Back to Application
          </button>
        )}
      </div>

      {/* Application Context */}
      {application && (
        <ApplicationSummary application={application} />
      )}

      {/* Editable Loan Inputs */}
      <LoanParameters
        inputs={inputs}
        onUpdate={updateInput}
      />

      {/* Current Loan Position */}
      <CurrentLoanPosition position={currentPosition} />

      {/* Property Value Stress */}
      <PropertyStressTest
        inputs={inputs}
        onUpdate={updateInput}
      />

      {/* Interest Rate Scenarios */}
      <InterestRateScenarios scenarios={scenarios} />

      {/* Overall Summary */}
      <StressTestSummary scenarios={scenarios} />
    </div>
  )
}