import type { Application } from '../types/application'

export interface LoanAssessment {
  loanToValue: number
  loanToIncome: number
  propertyValue: number
  equity: number
}

/**
 * Gets the property value used for the assessment.
 *
 * Uses the lower of asking price and ML valuation.
 * Falls back to asking price if no ML valuation exists.
 */
function getAssessmentPropertyValue(
  application: Application
): number {

  if (
    application.mlValuation === undefined ||
    application.mlValuation <= 0
  ) {
    return application.askingPrice
  }

  return Math.min(
    application.askingPrice,
    application.mlValuation
  )
}

/**
 * Calculates the Loan-to-Value ratio.
 *
 * LTV = Mortgage Amount / Property Value × 100
 */
export function calculateLTV(
  application: Application
): number {

  const propertyValue = getAssessmentPropertyValue(application)

  if (propertyValue <= 0) {
    return 0
  }

  return (
    application.requestedMortgage / propertyValue
  ) * 100
}

/**
 * Calculates the Loan-to-Income ratio.
 *
 * LTI = Mortgage Amount / Gross Annual Income
 */
export function calculateLTI(
  application: Application
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
  application: Application
): number {

  const propertyValue = getAssessmentPropertyValue(application)

  return propertyValue - application.requestedMortgage
}

/**
 * Returns all preliminary loan assessment metrics.
 */
export function calculateLoanAssessment(
  application: Application
): LoanAssessment {

  const propertyValue = getAssessmentPropertyValue(application)

  return {
    loanToValue: calculateLTV(application),

    loanToIncome: calculateLTI(application),

    propertyValue,

    equity: calculateEquity(application),
  }
}