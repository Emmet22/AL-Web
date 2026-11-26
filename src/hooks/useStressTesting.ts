import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getApplicationById } from '../services/applicationService'
import type { Application } from '../types/application'

import {
  calculateMonthlyRepayment,
  calculateStressTest,
} from '../utils/stressTestingCalculations'

export interface StressTestingInputs {
  loanAmount: number
  propertyValue: number
  interestRate: number
  loanTerm: number
  propertyDecrease: number
}

export interface StressScenario {
  label: string
  result: ReturnType<typeof calculateStressTest>
}

export interface CurrentLoanPosition {
  monthlyRepayment: number
  ltv: number
  equity: number
}

const DEFAULT_INPUTS: StressTestingInputs = {
  loanAmount: 300000,
  propertyValue: 375000,
  interestRate: 3.5,
  loanTerm: 30,
  propertyDecrease: 10,
}

export function useStressTesting() {
  const { applicationId } = useParams<{ applicationId: string }>()

  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(Boolean(applicationId))
  const [error, setError] = useState<string | null>(null)

  const [inputs, setInputs] = useState<StressTestingInputs>(
    DEFAULT_INPUTS
  )

  // Load application details when an application ID is present.
  useEffect(() => {
    let isMounted = true

    async function loadApplication() {
      if (!applicationId) {
        setApplication(null)
        setInputs(DEFAULT_INPUTS)
        setLoading(false)
        setError(null)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const result = await getApplicationById(applicationId)

        if (!isMounted) return

        if (!result) {
          setError('The requested application could not be found.')
          setApplication(null)
          return
        }

        setApplication(result)

        const propertyValue =
          result.propertyValue > 0
            ? result.propertyValue
            : result.askingPrice

        setInputs({
          loanAmount: result.requestedMortgage,
          propertyValue,
          interestRate: 3.5,
          loanTerm: result.loanTerm,
          propertyDecrease: 10,
        })
      } catch (err) {
        console.error('Failed to load application:', err)

        if (isMounted) {
          setError('Unable to load the application. Please try again.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadApplication()

    return () => {
      isMounted = false
    }
  }, [applicationId])

  // Update simulator inputs with validation.
  function updateInput(
    field: keyof StressTestingInputs,
    value: number
  ) {
    if (!Number.isFinite(value)) return

    let validatedValue = value

    switch (field) {
      case 'loanAmount':
      case 'propertyValue':
        validatedValue = Math.max(1, value)
        break

      case 'interestRate':
        validatedValue = Math.min(30, Math.max(0, value))
        break

      case 'loanTerm':
        validatedValue = Math.min(40, Math.max(1, Math.round(value)))
        break

      case 'propertyDecrease':
        validatedValue = Math.min(30, Math.max(0, value))
        break
    }

    setInputs((previous) => ({
      ...previous,
      [field]: validatedValue,
    }))
  }

  // Current loan position.
  const currentPosition = useMemo<CurrentLoanPosition>(() => {
    const monthlyRepayment = calculateMonthlyRepayment(
      inputs.loanAmount,
      inputs.interestRate,
      inputs.loanTerm
    )

    const ltv =
      inputs.propertyValue > 0
        ? (inputs.loanAmount / inputs.propertyValue) * 100
        : 0

    const equity = inputs.propertyValue - inputs.loanAmount

    return {
      monthlyRepayment,
      ltv,
      equity,
    }
  }, [inputs])

  // Generate +1%, +2% and +3% interest rate scenarios.
  const scenarios = useMemo<StressScenario[]>(() => {
    return [1, 2, 3].map((increase) => ({
      label: `+${increase}% Interest Rate`,
      result: calculateStressTest(
        {
          loanAmount: inputs.loanAmount,
          propertyValue: inputs.propertyValue,
          annualInterestRate: inputs.interestRate,
          loanTerm: inputs.loanTerm,
          propertyValueDecrease: inputs.propertyDecrease,
        },
        increase
      ),
    }))
  }, [inputs])

  return {
    application,
    loading,
    error,
    inputs,
    updateInput,
    currentPosition,
    scenarios,
  }
}