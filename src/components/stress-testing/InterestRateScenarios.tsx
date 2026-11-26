import type { StressScenario } from '../../hooks/useStressTesting'
import StressScenarioCard from './StressScenarioCard'

interface InterestRateScenariosProps {
  scenarios: StressScenario[]
}

export default function InterestRateScenarios({
  scenarios,
}: InterestRateScenariosProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-al-navy">
          Interest Rate Stress Scenarios
        </h2>
        <p className="text-sm text-gray-500">
          Compare the impact of increasing interest rates by 1%, 2% and 3%.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {scenarios.map((scenario) => (
          <StressScenarioCard
            key={scenario.label}
            scenario={scenario}
          />
        ))}
      </div>
    </section>
  )
}