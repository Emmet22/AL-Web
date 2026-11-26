export interface StressTestInputs {
  loanAmount: number
  propertyValue: number
  annualInterestRate: number
  loanTerm: number
  propertyValueDecrease: number
}

export interface StressTestResult {
  interestRateIncrease: number
  stressedInterestRate: number
  monthlyRepayment: number
  repaymentIncrease: number
  repaymentPercentageIncrease: number
  stressedPropertyValue: number
  currentLTV: number
  stressedLTV: number
}

export function calculateMonthlyRepayment(
  principal: number,
  annualInterestRate: number,
  loanTerm: number
): number {
  // Validate inputs before performing calculations.
  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(annualInterestRate) ||
    !Number.isFinite(loanTerm) ||
    principal <= 0 ||
    annualInterestRate < 0 ||
    loanTerm < 1 ||
    loanTerm > 40 ||
    !Number.isInteger(loanTerm)
  ) {
    return 0
  }

  const numberOfPayments = loanTerm * 12
  const monthlyInterestRate = annualInterestRate / 100 / 12

  // Handle a 0% interest rate separately.
  if (monthlyInterestRate === 0) {
    return principal / numberOfPayments
  }

  const repayment =
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)

  return repayment
}

export function calculateStressTest(
  inputs: StressTestInputs,
  interestRateIncrease: number
): StressTestResult {
  // Validate the stress test inputs.
  const validInputs =
    Number.isFinite(inputs.loanAmount) &&
    Number.isFinite(inputs.propertyValue) &&
    Number.isFinite(inputs.annualInterestRate) &&
    Number.isFinite(inputs.loanTerm) &&
    Number.isFinite(inputs.propertyValueDecrease) &&
    Number.isFinite(interestRateIncrease) &&
    inputs.loanAmount > 0 &&
    inputs.propertyValue > 0 &&
    inputs.annualInterestRate >= 0 &&
    inputs.loanTerm >= 1 &&
    inputs.loanTerm <= 40 &&
    Number.isInteger(inputs.loanTerm) &&
    inputs.propertyValueDecrease >= 0 &&
    inputs.propertyValueDecrease <= 30 &&
    interestRateIncrease >= 0

  if (!validInputs) {
    return {
      interestRateIncrease: 0,
      stressedInterestRate: 0,
      monthlyRepayment: 0,
      repaymentIncrease: 0,
      repaymentPercentageIncrease: 0,
      stressedPropertyValue: 0,
      currentLTV: 0,
      stressedLTV: 0,
    }
  }

  const currentRepayment = calculateMonthlyRepayment(
    inputs.loanAmount,
    inputs.annualInterestRate,
    inputs.loanTerm
  )

  const stressedInterestRate =
    inputs.annualInterestRate + interestRateIncrease

  const stressedRepayment = calculateMonthlyRepayment(
    inputs.loanAmount,
    stressedInterestRate,
    inputs.loanTerm
  )

  const stressedPropertyValue =
    inputs.propertyValue * (1 - inputs.propertyValueDecrease / 100)

  const currentLTV =
    (inputs.loanAmount / inputs.propertyValue) * 100

  const stressedLTV =
    stressedPropertyValue > 0
      ? (inputs.loanAmount / stressedPropertyValue) * 100
      : 0

  const repaymentIncrease = stressedRepayment - currentRepayment

  const repaymentPercentageIncrease =
    currentRepayment > 0
      ? (repaymentIncrease / currentRepayment) * 100
      : 0

  return {
    interestRateIncrease,
    stressedInterestRate,
    monthlyRepayment: stressedRepayment,
    repaymentIncrease,
    repaymentPercentageIncrease,
    stressedPropertyValue,
    currentLTV,
    stressedLTV,
  }
}