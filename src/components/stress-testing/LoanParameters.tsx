import Card from '../common/Card'
import type { StressTestingInputs } from '../../hooks/useStressTesting'

interface LoanParametersProps {
  inputs: StressTestingInputs
  onUpdate: (field: keyof StressTestingInputs, value: number) => void
}

export default function LoanParameters({
  inputs,
  onUpdate,
}: LoanParametersProps) {
  const fields = [
    {
      label: 'Mortgage Amount (€)',
      field: 'loanAmount' as const,
      value: inputs.loanAmount,
      min: 1,
      max: undefined,
      step: 1000,
    },
    {
      label: 'Property Value (€)',
      field: 'propertyValue' as const,
      value: inputs.propertyValue,
      min: 1,
      max: undefined,
      step: 1000,
    },
    {
      label: 'Interest Rate (%)',
      field: 'interestRate' as const,
      value: inputs.interestRate,
      min: 0,
      max: 30,
      step: 0.1,
    },
    {
      label: 'Loan Term (Years)',
      field: 'loanTerm' as const,
      value: inputs.loanTerm,
      min: 1,
      max: 40,
      step: 1,
    },
  ]

  return (
    <Card>
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-al-navy">
            Loan Parameters
          </h2>
          <p className="text-sm text-gray-500">
            Adjust the values below to explore different lending scenarios.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.field}>
              <label
                htmlFor={field.field}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>

              <input
                id={field.field}
                type="number"
                value={field.value}
                min={field.min}
                max={field.max}
                step={field.step}
                onChange={(event) => {
                  const value = event.target.valueAsNumber

                  if (Number.isFinite(value)) {
                    onUpdate(field.field, value)
                  }
                }}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-al-navy focus:ring-2 focus:ring-al-navy/10"
              />

              {field.field === 'loanTerm' && (
                <p className="mt-1 text-xs text-gray-500">
                  Between 1 and 40 years.
                </p>
              )}

              {field.field === 'interestRate' && (
                <p className="mt-1 text-xs text-gray-500">
                  Between 0% and 30%.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}