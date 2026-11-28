import type { Timestamp } from 'firebase/firestore'

export type Role = 'borrower' | 'broker' | 'underwriter'

export type ApplicationStatus =
  | 'Draft'
  | 'Applied'
  | 'AI Deliberated'
  | 'Underwriter Approved'
  | 'Conditionally Approved'
  | 'Declined'
  | 'Funded'
  | 'Closed'

  
// Structure used by the frontend.
export interface Application {
  id: string
  referenceNumber?: string

  applicant: string
  location: string
  property: string
  status: ApplicationStatus

  propertyType: string
  propertySize: number
  berRating: string

  grossIncome: number
  existingDebt: number
  deposit: number

  requestedMortgage: number
  loanTerm: number
  askingPrice: number
  propertyValue: number
  mlValuation?: number
  monthlyDebtRepayments: number
}

// Structure received from Firestore.
export interface FirestoreApplication {
  id: string

  // User information
  borrowerId: string
  brokerId?: string
  applicantName?: string
  referenceNumber?: string

  // Application status
  status: ApplicationStatus
  firstTimeBuyer?: boolean

  // Property information
  county?: string
  area?: string
  propertyAddress: string
  propertyType: string
  bedrooms?: number
  bathrooms?: number
  propertySize: number
  berRating: string
  askingPrice: number
  propertyValue: number

  // Financial information
  loanAmount: number
  deposit: number
  grossIncome: number
  existingDebt: number
  monthlyDebtRepayments: number
  loanTerm: number

  // Additional information
  createdAt: Timestamp
  valuation?: number
  decision?: string
  sampleData?: boolean
}