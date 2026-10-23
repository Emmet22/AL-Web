import { sampleApplications } from '../../data/sampleApplications'
import StatusBadge from '../common/StatusBadge'

/**
 * Sample pipeline data for Sprint 1.
 *
 * This will eventually be replaced with
 * Firestore application data.
 */

function PipelinePreview() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                Application
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                Applicant
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                Location
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {sampleApplications.map((application) => (
              <tr
                key={application.id}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {application.id}
                </td>

                <td className="px-6 py-4 text-sm text-gray-700">
                  {application.applicant}
                </td>

                <td className="px-6 py-4 text-sm text-gray-700">
                  {application.location}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={application.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-gray-200 md:hidden">
        {sampleApplications.map((application) => (
          <div
            key={application.id}
            className="p-4"
          >
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

            <div className="mt-3">
              <p className="text-xs text-gray-500">
                Property
              </p>

              <p className="mt-1 text-sm text-gray-700">
                {application.property}
              </p>
            </div>

            <div className="mt-3">
              <p className="text-xs text-gray-500">
                Location
              </p>

              <p className="mt-1 text-sm text-gray-700">
                {application.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PipelinePreview