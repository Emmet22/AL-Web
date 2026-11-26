export type AIAgentStatus =
  | 'Completed'
  | 'Pending'
  | 'Failed'

export type AIAgentRecommendation =
  | 'Acceptable'
  | 'Review Required'
  | 'Conditionally Approve'
  | 'Decline'
  | 'Pending'

export interface AIAgentResult {
  name: string
  role: string
  status: AIAgentStatus
  recommendation: AIAgentRecommendation
  description: string
  findings: string[]
}

export interface DeliberationStep {
  step: string
  title: string
  detail: string
}