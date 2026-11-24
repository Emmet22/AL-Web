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
  const numberOfPayments = loanTerm * 12

  if (principal <= 0 || numberOfPayments <= 0) {
    return 0
  }

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
    inputs.propertyValue > 0
      ? (inputs.loanAmount / inputs.propertyValue) * 100
      : 0

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