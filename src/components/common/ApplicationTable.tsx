import { Link, useNavigate } from 'react-router'

import { sampleApplications } from '../../data/sampleApplications'

import StatusBadge from './StatusBadge'

interface ApplicationTableProps {
  showActions?: boolean
  clickableRows?: boolean
  getApplicationLink?: (id: string) => string
}

function ApplicationTable({
  showActions = false,
  clickableRows = false,
  getApplicationLink,
}: ApplicationTableProps) {
  const navigate = useNavigate()

  return (
    <div className="overflow-hidden rounded-lg border border-al-border bg-white">
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead className="bg-al-soft">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-al-muted">
                Application
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-al-muted">
                Applicant
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-al-muted">
                Property
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-al-muted">
                Location
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-al-muted">
                Status
              </th>

              {showActions && (
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-al-muted">
                  Action
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-al-border">
            {sampleApplications.map((application) => {
              const rowContent = (
                <>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {application.id}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {application.applicant}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {application.property}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {application.location}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={application.status} />
                  </td>

                  {showActions && (
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/broker/applications/${application.id}`}
                        className="text-sm font-medium text-al-navy hover:underline"
                        onClick={(event) => event.stopPropagation()}
                      >
                        View
                      </Link>
                    </td>
                  )}
                </>
              )

              if (clickableRows && getApplicationLink) {
                return (
                  <tr
                    key={application.id}
                    className="cursor-pointer hover:bg-al-navy-light"
                    onClick={() => {
                      navigate(getApplicationLink(application.id))
                    }}
                  >
                    {rowContent}
                  </tr>
                )
              }

              return (
                <tr
                  key={application.id}
                  className="hover:bg-al-soft"
                >
                  {rowContent}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-al-border md:hidden">
        {sampleApplications.map((application) => {
          const card = (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {application.id}
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {application.applicant}
                  </p>
                </div>

                <StatusBadge status={application.status} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-al-muted">
                    Property
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {application.property}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-al-muted">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {application.location}
                  </p>
                </div>
              </div>

              {showActions && (
                <Link
                  to={`/broker/applications/${application.id}`}
                  className="mt-4 block text-sm font-medium text-al-navy hover:underline"
                >
                  View application
                </Link>
              )}
            </>
          )

          if (clickableRows && getApplicationLink) {
            return (
              <Link
                key={application.id}
                to={getApplicationLink(application.id)}
                className="block p-4 hover:bg-al-navy-light"
              >
                {card}
              </Link>
            )
          }

          return (
            <div
              key={application.id}
              className="p-4"
            >
              {card}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ApplicationTable