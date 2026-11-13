import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getApplicationById } from '../../services/applicationService'
import type { SampleApplication } from '../../data/sampleApplications'
import Card from '../common/Card'
import StatusBadge from '../common/StatusBadge'
import FinancialAssessment from '../assessment/FinancialAssessment'

interface ApplicationDetailsProps {
  backPath: string
  backLabel: string
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function DetailRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-gray-100 py-3 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-right">
        {value}
      </span>
    </div>
  )
}

export default function ApplicationDetails({
  backPath,
  backLabel,
}: ApplicationDetailsProps) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [application, setApplication] =
    useState<SampleApplication | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadApplication() {
      if (!id) {
        setError('No application ID was provided.')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const result = await getApplicationById(id)

        if (!result) {
          setApplication(null)
          return
        }

        setApplication(result)
      } catch {
        setError('Unable to load this application. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadApplication()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <p className="text-gray-500">Loading application...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-800">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-red-700">{error}</p>

        <button
          onClick={() => navigate(backPath)}
          className="mt-4 text-sm font-medium text-red-800 underline"
        >
          {backLabel}
        </button>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Application not found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          The application you're looking for does not exist.
        </p>

        <button
          onClick={() => navigate(backPath)}
          className="mt-5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          {backLabel}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <button
          onClick={() => navigate(backPath)}
          className="mb-4 text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          ← {backLabel}
        </button>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-gray-500">
              Application {application.id}
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-900">
              {application.applicant}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {application.location}
            </p>
          </div>

          <StatusBadge status={application.status} />
        </div>
      </div>

      {/* Applicant and property information */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <Card>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Applicant Information
          </h2>

          <DetailRow
            label="Applicant"
            value={application.applicant}
          />

          <DetailRow
            label="Annual Gross Income"
            value={formatCurrency(application.grossIncome)}
          />

          <DetailRow
            label="Existing Debt"
            value={formatCurrency(application.existingDebt)}
          />

          <DetailRow
            label="Deposit"
            value={formatCurrency(application.deposit)}
          />
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Property Information
          </h2>

          <DetailRow
            label="Property"
            value={application.property}
          />

          <DetailRow
            label="Location"
            value={application.location}
          />

          <DetailRow
            label="Property Type"
            value={application.propertyType}
          />

          <DetailRow
            label="Property Size"
            value={`${application.propertySize} m²`}
          />

          <DetailRow
            label="BER Rating"
            value={application.berRating}
          />
        </Card>
      </div>

      {/* Loan information */}
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Loan Information
        </h2>

        <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
          <DetailRow
            label="Requested Mortgage"
            value={formatCurrency(application.requestedMortgage)}
          />

          <DetailRow
            label="Loan Term"
            value={`${application.loanTerm} years`}
          />

          <DetailRow
            label="Asking Price"
            value={formatCurrency(application.askingPrice)}
          />

          <DetailRow
            label="ML Property Valuation"
            value={formatCurrency(application.mlValuation)}
          />
        </div>
      </Card>

      {/* Financial assessment */}
      <FinancialAssessment application={application} />

    </div>
  )
}