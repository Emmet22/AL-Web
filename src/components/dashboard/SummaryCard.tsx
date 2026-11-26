import Card from '../common/Card'

interface SummaryCardProps {
  title: string
  value: number
  description?: string
}

export default function SummaryCard({
  title,
  value,
  description,
}: SummaryCardProps) {
  return (
    <Card>
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-gray-900">
        {value}
      </p>

      {description && (
        <p className="mt-1 text-xs text-gray-400">
          {description}
        </p>
      )}
    </Card>
  )
}