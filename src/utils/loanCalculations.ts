import type { SampleApplication } from '../data/sampleApplications'

export interface LoanAssessment {
  loanToValue: number
  loanToIncome: number
  propertyValue: number
  equity: number
}

/**
 * Calculates the Loan-to-Value ratio.
 *
 * LTV = Mortgage Amount / Property Value × 100
 *
 * Uses the lower of the asking price and ML valuation
 * as the property value for this preliminary assessment.
 */
export function calculateLTV(
  application: SampleApplication,
): number {
  const propertyValue = Math.min(
    application.askingPrice,
    application.mlValuation,
  )

  if (propertyValue <= 0) {
    return 0
  }

  return (
    (application.requestedMortgage / propertyValue) * 100
  )
}

/**
 * Calculates the Loan-to-Income ratio.
 *
 * LTI = Mortgage Amount / Gross Annual Income
 */
export function calculateLTI(
  application: SampleApplication,
): number {
  if (application.grossIncome <= 0) {
    return 0
  }

  return (
    application.requestedMortgage / application.grossIncome
  )
}

/**
 * Calculates the estimated property equity.
 */
export function calculateEquity(
  application: SampleApplication,
): number {
  const propertyValue = Math.min(
    application.askingPrice,
    application.mlValuation,
  )

  return propertyValue - application.requestedMortgage
}

/**
 * Returns all preliminary loan assessment metrics.
 */
export function calculateLoanAssessment(
  application: SampleApplication,
): LoanAssessment {
  const propertyValue = Math.min(
    application.askingPrice,
    application.mlValuation,
  )

  return {
    loanToValue: calculateLTV(application),
    loanToIncome: calculateLTI(application),
    propertyValue,
    equity: calculateEquity(application),
  }
}