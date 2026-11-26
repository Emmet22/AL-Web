import Card from '../common/Card'
import type { StressTestingInputs } from '../../hooks/useStressTesting'

interface PropertyStressTestProps {
  inputs: StressTestingInputs
  onUpdate: (field: keyof StressTestingInputs, value: number) => void
}

export default function PropertyStressTest({
  inputs,
  onUpdate,
}: PropertyStressTestProps) {
  const stressedValue =
    inputs.propertyValue * (1 - inputs.propertyDecrease / 100)

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <Card>
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-al-navy">
            Property Market Stress
          </h2>
          <p className="text-sm text-gray-500">
            Simulate a decline in the property's market value.
          </p>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <label
              htmlFor="propertyDecrease"
              className="text-sm font-medium text-gray-700"
            >
              Property Value Decrease
            </label>

            <span className="text-lg font-bold text-al-navy">
              {inputs.propertyDecrease}%
            </span>
          </div>

          <input
            id="propertyDecrease"
            type="range"
            min={0}
            max={30}
            step={1}
            value={inputs.propertyDecrease}
            onChange={(event) =>
              onUpdate('propertyDecrease', Number(event.target.value))
            }
            className="w-full cursor-pointer accent-al-navy"
          />

          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>0%</span>
            <span>15%</span>
            <span>30%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Original Property Value
            </p>
            <p className="mt-2 text-xl font-bold text-al-navy">
              {formatCurrency(inputs.propertyValue)}
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Stressed Property Value
            </p>
            <p className="mt-2 text-xl font-bold text-al-navy">
              {formatCurrency(stressedValue)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}