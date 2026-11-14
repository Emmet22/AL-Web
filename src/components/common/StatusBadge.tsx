import type { ApplicationStatus } from '../../types/application'

interface StatusBadgeProps {
  status: ApplicationStatus
}

const statusStyles: Record<ApplicationStatus, string> = {
  Draft: 'bg-gray-100 text-gray-700',

  Applied: 'bg-blue-100 text-blue-700',

  'AI Deliberated': 'bg-purple-100 text-purple-700',

  'Underwriter Approved': 'bg-green-100 text-green-700',

  Funded: 'bg-emerald-100 text-emerald-700',

  Closed: 'bg-red-100 text-red-700',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  )
}