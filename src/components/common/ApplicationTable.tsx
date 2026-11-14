import { Link } from 'react-router'

import type { Application } from '../../types/application'
import StatusBadge from './StatusBadge'

interface ApplicationTableProps {
  applications: Application[]
  clickableRows?: boolean
  getApplicationLink?: (id: string) => string
}

export default function ApplicationTable({
  applications,
  clickableRows = false,
  getApplicationLink,
}: ApplicationTableProps) {

  if (applications.length === 0) {
    return (
      <div className="rounded-lg border border-al-border bg-white p-8 text-center">
        <p className="text-sm text-al-muted">
          No applications found.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-lg border border-al-border bg-white md:block">

        <table className="w-full text-left">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Application
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Applicant
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Property
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Location
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              {clickableRows && (
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

            {applications.map((application) => (
              <tr
                key={application.id}
                className="transition hover:bg-gray-50"
              >

                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {application.referenceNumber ?? application.id}
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

                {clickableRows && (
                  <td className="px-6 py-4">

                    {getApplicationLink && (
                      <Link
                        to={getApplicationLink(application.id)}
                        className="text-sm font-medium text-al-navy hover:underline"
                      >
                        View details →
                      </Link>
                    )}

                  </td>
                )}

              </tr>
            ))}

          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">

        {applications.map((application) => {

          const content = (
            <div className="rounded-lg border border-al-border bg-white p-4 transition hover:border-gray-300 hover:bg-gray-50">

              <div className="flex items-start justify-between gap-3">

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {application.applicant}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {application.referenceNumber ?? application.id}
                  </p>
                </div>

                <StatusBadge status={application.status} />

              </div>

              <div className="mt-4 space-y-1">

                <p className="text-sm text-gray-700">
                  {application.property}
                </p>

                <p className="text-xs text-gray-500">
                  {application.location}
                </p>

              </div>

              {clickableRows && getApplicationLink && (
                <p className="mt-4 text-sm font-medium text-al-navy">
                  View details →
                </p>
              )}

            </div>
          )

          return clickableRows && getApplicationLink ? (
            <Link
              key={application.id}
              to={getApplicationLink(application.id)}
              className="block"
            >
              {content}
            </Link>
          ) : (
            <div key={application.id}>
              {content}
            </div>
          )
        })}

      </div>
    </>
  )
}