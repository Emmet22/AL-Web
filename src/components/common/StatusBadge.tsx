import type { ApplicationStatus } from '../../data/sampleApplications'

interface StatusBadgeProps {
  status: ApplicationStatus
}

function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyles: Record<ApplicationStatus, string> = {
    Applied: 'bg-gray-100 text-gray-700',
    'AI Deliberated': 'bg-blue-100 text-blue-700',
    'Underwriter Approved': 'bg-green-100 text-green-700',
    Funded: 'bg-purple-100 text-purple-700',
    Closed: 'bg-gray-200 text-gray-600',
  }

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  )
}

export default StatusBadge