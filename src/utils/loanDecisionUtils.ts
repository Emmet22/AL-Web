import type { Application } from '../types/application'

export type Decision =
  | 'Approve'
  | 'Conditionally Approve'
  | 'Decline'

export interface FinancialMetric {
  label: string
  value: string
  description: string
}

export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) {
    return 'Unavailable'
  }

  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}

export function calculateFinancialMetrics(
  application: Application
): FinancialMetric[] {
  const loanToValue =
    application.propertyValue > 0
      ? (application.requestedMortgage / application.propertyValue) * 100
      : null

  const loanToIncome =
    application.grossIncome > 0
      ? application.requestedMortgage / application.grossIncome
      : null

  return [
    {
      label: 'Loan-to-Value',
      value:
        loanToValue !== null
          ? formatPercentage(loanToValue)
          : 'Unavailable',
      description: 'Mortgage relative to property value',
    },
    {
      label: 'Loan-to-Income',
      value:
        loanToIncome !== null
          ? `${loanToIncome.toFixed(2)}x`
          : 'Unavailable',
      description: 'Mortgage relative to annual income',
    },
    {
      label: 'Property Valuation',
      value: formatCurrency(application.propertyValue),
      description: 'Recorded property valuation',
    },
    {
      label: 'Monthly Repayment',
      value: 'Unavailable',
      description: 'Interest rate not currently available',
    },
  ]
}

export function validateDecision(
  decision: Decision | null,
  conditions: string
): string | null {
  if (!decision) {
    return 'Please select a lending decision before continuing.'
  }

  if (
    decision === 'Conditionally Approve' &&
    !conditions.trim()
  ) {
    return 'Please provide the conditions required for approval.'
  }

  if (conditions.length > 1000) {
    return 'Approval conditions cannot exceed 1,000 characters.'
  }

  return null
}