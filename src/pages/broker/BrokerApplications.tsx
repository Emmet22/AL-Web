import { useMemo, useState } from 'react'

import { useAuth } from '../../context/AuthContext'
import { useApplications } from '../../hooks/useApplications'

import ApplicationTable from '../../components/common/ApplicationTable'

import type { ApplicationStatus } from '../../types/application'

const statusOptions: ApplicationStatus[] = [
  'Applied',
  'AI Deliberated',
  'Underwriter Approved',
  'Funded',
  'Closed',
]

export default function BrokerApplications() {
  const { user } = useAuth()

  const {
    applications,
    loading,
    error,
  } = useApplications(user?.role, user?.id)

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    ApplicationStatus | 'all'
  >('all')

  const filteredApplications = useMemo(() => {
    const search = searchTerm.toLowerCase().trim()

    return applications.filter(application => {
      const matchesSearch =
        application.id.toLowerCase().includes(search) ||
        application.applicant.toLowerCase().includes(search) ||
        application.property.toLowerCase().includes(search) ||
        application.location.toLowerCase().includes(search)

      const matchesStatus =
        statusFilter === 'all' ||
        application.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [applications, searchTerm, statusFilter])

  function clearFilters() {
    setSearchTerm('')
    setStatusFilter('all')
  }

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Applications
        </h1>

        <p className="mt-2 text-al-muted">
          View and manage your mortgage applications.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="rounded-lg border border-al-border bg-white p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <label
              htmlFor="application-search"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Search
            </label>

            <input
              id="application-search"
              type="text"
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
              placeholder="Search by applicant, ID, property or location..."
              className="w-full rounded-md border border-al-border px-3 py-2 text-sm outline-none placeholder:text-al-muted focus:border-al-navy focus:ring-1 focus:ring-al-navy"
            />
          </div>

          <div className="sm:w-48">
            <label
              htmlFor="status-filter"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Status
            </label>

            <select
              id="status-filter"
              value={statusFilter}
              onChange={event =>
                setStatusFilter(
                  event.target.value as ApplicationStatus | 'all',
                )
              }
              className="w-full rounded-md border border-al-border bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-al-navy focus:ring-1 focus:ring-al-navy"
            >
              <option value="all">All statuses</option>

              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-al-muted">
            Showing {filteredApplications.length} of {applications.length} applications
          </p>

          {(searchTerm || statusFilter !== 'all') && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-al-navy hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div>
        {loading ? (
          <div className="rounded-lg border border-al-border bg-white py-12 text-center">
            <p className="text-sm text-al-muted">
              Loading applications...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <p className="text-sm text-al-error">
              Unable to load applications: {error}
            </p>
          </div>
        ) : (
          <ApplicationTable
            applications={filteredApplications}
            clickableRows
            getApplicationLink={id =>
              `/broker/applications/${id}`
            }
          />
        )}
      </div>
    </div>
  )
}