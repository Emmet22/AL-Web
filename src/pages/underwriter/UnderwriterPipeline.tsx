import { useMemo } from 'react'

import { useAuth } from '../../context/AuthContext'
import { useApplications } from '../../hooks/useApplications'

import Card from '../../components/common/Card'
import ApplicationTable from '../../components/common/ApplicationTable'
import PipelineSummary from '../../components/pipeline/PipelineSummary'
import PipelineGroup from '../../components/pipeline/PipelineGroup'

import { getApplicationStatistics } from '../../utils/applicationStatistics'

import type { ApplicationStatus } from '../../types/application'

const pipelineStatuses: ApplicationStatus[] = [
  'Applied',
  'AI Deliberated',
  'Underwriter Approved',
  'Funded',
  'Closed',
]

export default function UnderwriterPipeline() {
  const { user } = useAuth()

  const {
    applications,
    loading,
    error,
  } = useApplications(user?.role, user?.id)

  const statistics = getApplicationStatistics(applications)

  const groupedApplications = useMemo(
    () =>
      pipelineStatuses.map(status => ({
        status,
        applications: applications.filter(
          app => app.status === status,
        ),
      })),
    [applications],
  )

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500">
        Loading underwriting pipeline...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <p className="font-medium text-red-800">
          Unable to load applications: {error}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">

      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Underwriting Pipeline
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Monitor and review loan applications across the lending process.
        </p>
      </div>

      {/* Summary */}
      <PipelineSummary statistics={statistics} />

      {/* Applications by Status */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Applications by Status
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Select an application to review its details.
          </p>
        </div>

        {applications.length === 0 ? (
          <Card>
            <p className="py-6 text-center text-sm text-gray-500">
              No applications are currently available.
            </p>
          </Card>
        ) : (
          groupedApplications.map(group => (
            <PipelineGroup
              key={group.status}
              status={group.status}
              applications={group.applications}
            />
          ))
        )}
      </div>

      {/* All Applications */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          All Applications
        </h2>

        <ApplicationTable
          applications={applications}
          clickableRows
          getApplicationLink={id =>
            `/underwriter/applications/${id}`
          }
        />
      </section>
    </div>
  )
}