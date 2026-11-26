interface RecommendationCardProps {
  title: string
  outcome: string
  description: string
}

export default function RecommendationCard({
  title,
  outcome,
  description,
}: RecommendationCardProps) {
  const isConditional =
    outcome === 'Conditionally Approve'

  const isDeclined =
    outcome === 'Decline'

  const styling = isDeclined
    ? 'border-red-200 bg-red-50 text-red-900'
    : isConditional
      ? 'border-amber-200 bg-amber-50 text-amber-900'
      : 'border-green-200 bg-green-50 text-green-900'

  return (
    <div className={`rounded-xl border p-5 ${styling}`}>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <p className="text-sm font-medium opacity-80">
            {title}
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            {outcome}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 opacity-80">
            {description}
          </p>

        </div>

        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/60 text-3xl font-bold">
          {isDeclined ? '×' : isConditional ? '!' : '✓'}
        </div>

      </div>

    </div>
  )
}