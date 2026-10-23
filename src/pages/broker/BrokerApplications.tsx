import ApplicationTable from '../../components/common/ApplicationTable'

function BrokerApplications() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Applications
        </h1>

        <p className="mt-2 text-al-muted">
          View and manage your mortgage applications.
        </p>
      </div>

      <div className="mt-6 rounded-lg border border-al-border bg-white p-4 sm:p-6">
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
              placeholder="Search applications..."
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
              className="w-full rounded-md border border-al-border bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-al-navy focus:ring-1 focus:ring-al-navy"
              defaultValue="all"
            >
              <option value="all">All statuses</option>
              <option value="Applied">Applied</option>
              <option value="AI Deliberated">AI Deliberated</option>
              <option value="Underwriter Approved">
                Underwriter Approved
              </option>
              <option value="Funded">Funded</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ApplicationTable
          clickableRows
          getApplicationLink={(id) =>
            `/broker/applications/${id}`
          }
        />
      </div>
    </div>
  )
}

export default BrokerApplications