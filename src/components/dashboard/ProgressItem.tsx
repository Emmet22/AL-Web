import StatusBadge from '../common/StatusBadge'

import type { ApplicationStatus } from '../../types/application'

interface ProgressItemProps {
  label: string
  value: number
  status: ApplicationStatus
}

export default function ProgressItem({
  label,
  value,
  status,
}: ProgressItemProps) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="my-2 text-2xl font-bold text-gray-900">
        {value}
      </p>

      <StatusBadge status={status} />
    </div>
  )
}