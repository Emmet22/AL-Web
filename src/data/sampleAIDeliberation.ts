import type {
  AIAgentResult,
  DeliberationStep,
} from '../types/aiDeliberation'

export const sampleAgents: AIAgentResult[] = [
  {
    name: 'Affordability Agent',
    role: 'Financial Assessment',
    status: 'Completed',
    recommendation: 'Acceptable',
    description:
      'Evaluates the applicant’s income, existing debt and ability to afford mortgage repayments.',
    findings: [
      'Applicant income supports the requested mortgage.',
      'Existing debt levels are within acceptable limits.',
      'Estimated disposable income remains positive after repayments.',
    ],
  },
  {
    name: 'Valuation Agent',
    role: 'Property Assessment',
    status: 'Completed',
    recommendation: 'Review Required',
    description:
      'Compares the asking price against the machine learning property valuation and assesses collateral risk.',
    findings: [
      'Property asking price is slightly above the estimated ML valuation.',
      'Loan-to-value ratio requires additional consideration.',
      'Property remains suitable as potential mortgage security.',
    ],
  },
  {
    name: 'Market & Macro Researcher',
    role: 'Economic Analysis',
    status: 'Completed',
    recommendation: 'Acceptable',
    description:
      'Considers current economic conditions, mortgage interest rates and wider market trends.',
    findings: [
      'Current interest rate environment presents moderate risk.',
      'Mortgage affordability should be tested against potential rate increases.',
      'No significant market concerns identified in this assessment.',
    ],
  },
  {
    name: 'Underwriting Strategist',
    role: 'Final AI Recommendation',
    status: 'Completed',
    recommendation: 'Conditionally Approve',
    description:
      'Combines the findings from the other agents to generate an overall lending recommendation.',
    findings: [
      'Affordability assessment is generally positive.',
      'Property valuation requires further review.',
      'Recommend approval subject to valuation verification.',
    ],
  },
]

export const sampleOverallRecommendation = {
  outcome: 'Conditionally Approve',
  title: 'Underwriting Strategist Recommendation',
  description:
    'The AI committee recommends conditional approval. The affordability assessment is positive, but the property valuation should be verified before final approval.',
}

export const sampleDeliberationSteps: DeliberationStep[] = [
  {
    step: '01',
    title: 'Affordability Assessment',
    detail: 'Applicant repayment capacity assessed.',
  },
  {
    step: '02',
    title: 'Property Valuation',
    detail: 'Property value and collateral risk evaluated.',
  },
  {
    step: '03',
    title: 'Market & Macro Analysis',
    detail: 'Economic conditions and interest rate risks reviewed.',
  },
  {
    step: '04',
    title: 'Strategist Recommendation',
    detail:
      'Agent findings combined into a conditional approval recommendation.',
  },
]