import SummaryCard from '../dashboard/SummaryCard'

import type { ApplicationStatistics } from '../../utils/applicationStatistics'

interface PipelineSummaryProps {
  statistics: ApplicationStatistics
}

export default function PipelineSummary({
  statistics,
}: PipelineSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      <SummaryCard
        title="Total Applications"
        value={statistics.total}
      />

      <SummaryCard
        title="Applied"
        value={statistics.applied}
      />

      <SummaryCard
        title="AI Deliberated"
        value={statistics.aiDeliberated}
      />

      <SummaryCard
        title="Approved"
        value={statistics.approved}
      />

      <SummaryCard
        title="Funded"
        value={statistics.funded}
      />
    </div>
  )
}