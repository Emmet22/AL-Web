/**
 * This file is a sample file for sprint 1
 * to display a sample origination pipeline
 * with sample data.
 */

interface PipelineApplication {
  id: string
  applicant: string
  location: string
  status: string
}

const applications: PipelineApplication[] = [
  {
    id: 'AL-1042',
    applicant: 'Sarah Murphy',
    location: 'Cork',
    status: 'AI Deliberated',
  },
  {
    id: 'AL-1043',
    applicant: 'John Walsh',
    location: 'Cork',
    status: 'Applied',
  },
  {
    id: 'AL-1044',
    applicant: 'Aoife Kelly',
    location: 'Limerick',
    status: 'Underwriter Approved',
  },
  {
    id: 'AL-1045',
    applicant: 'Liam Byrne',
    location: 'Waterford',
    status: 'Applied',
  },
]

function PipelinePreview() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
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
          {applications.map((application) => (
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

              <td className="px-6 py-4 text-sm text-gray-700">
                {application.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PipelinePreview