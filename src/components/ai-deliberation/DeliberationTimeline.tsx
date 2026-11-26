import type {
  DeliberationStep,
} from '../../types/aiDeliberation'

interface DeliberationTimelineProps {
  steps: DeliberationStep[]
}

export default function DeliberationTimeline({
  steps,
}: DeliberationTimelineProps) {
  return (
    <div className="rounded-xl border border-al-border bg-white p-5 shadow-sm">

      <h2 className="text-lg font-semibold text-gray-900">
        Deliberation Summary
      </h2>

      <div className="mt-4 space-y-4">

        {steps.map(item => (
          <div
            key={item.step}
            className="flex gap-4"
          >

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-al-navy-light text-sm font-semibold text-al-navy">
              {item.step}
            </div>

            <div>

              <h3 className="text-sm font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-al-muted">
                {item.detail}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}