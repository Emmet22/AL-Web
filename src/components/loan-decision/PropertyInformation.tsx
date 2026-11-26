import type { Application } from '../../types/application'
import { formatCurrency } from '../../utils/loanDecisionUtils'

interface Props {
  application: Application
}

export default function PropertyInformation({ application }: Props) {
  const propertyInformation = [
    {
      label: 'Property Type',
      value: application.propertyType,
    },
    {
      label: 'Property Size',
      value: `${application.propertySize} m²`,
    },
    {
      label: 'BER Rating',
      value: application.berRating,
    },
    {
      label: 'Asking Price',
      value: formatCurrency(application.askingPrice),
    },
  ]

  return (
    <div className="rounded-xl border border-al-border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        Property Information
      </h2>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {propertyInformation.map((item) => (
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