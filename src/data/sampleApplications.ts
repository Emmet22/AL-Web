export type ApplicationStatus =
  | 'Applied'
  | 'AI Deliberated'
  | 'Underwriter Approved'
  | 'Funded'
  | 'Closed'

export interface SampleApplication {
  id: string
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
  mlValuation: number
}

export const sampleApplications: SampleApplication[] = [
  {
    id: 'AL-1042',
    applicant: 'Sarah Murphy',
    location: 'Cork',
    property: '3-bed semi-detached',
    status: 'AI Deliberated',

    propertyType: 'Semi-detached house',
    propertySize: 110,
    berRating: 'B2',

    grossIncome: 85000,
    existingDebt: 15000,
    deposit: 50000,

    requestedMortgage: 300000,
    loanTerm: 30,
    askingPrice: 350000,
    mlValuation: 335000,
  },

  {
    id: 'AL-1043',
    applicant: 'John Walsh',
    location: 'Cork',
    property: '4-bed detached',
    status: 'Applied',

    propertyType: 'Detached house',
    propertySize: 145,
    berRating: 'B3',

    grossIncome: 92000,
    existingDebt: 10000,
    deposit: 65000,

    requestedMortgage: 360000,
    loanTerm: 30,
    askingPrice: 425000,
    mlValuation: 415000,
  },

  {
    id: 'AL-1044',
    applicant: 'Aoife Kelly',
    location: 'Limerick',
    property: '2-bed apartment',
    status: 'Underwriter Approved',

    propertyType: 'Apartment',
    propertySize: 82,
    berRating: 'A3',

    grossIncome: 78000,
    existingDebt: 5000,
    deposit: 45000,

    requestedMortgage: 250000,
    loanTerm: 30,
    askingPrice: 295000,
    mlValuation: 300000,
  },

  {
    id: 'AL-1045',
    applicant: 'Liam Byrne',
    location: 'Waterford',
    property: '3-bed terraced',
    status: 'Applied',

    propertyType: 'Terraced house',
    propertySize: 96,
    berRating: 'C1',

    grossIncome: 72000,
    existingDebt: 12000,
    deposit: 40000,

    requestedMortgage: 270000,
    loanTerm: 30,
    askingPrice: 310000,
    mlValuation: 305000,
  },

  {
    id: 'AL-1046',
    applicant: "Emma O'Brien",
    location: 'Cork',
    property: '3-bed semi-detached',
    status: 'Funded',

    propertyType: 'Semi-detached house',
    propertySize: 118,
    berRating: 'B2',

    grossIncome: 105000,
    existingDebt: 8000,
    deposit: 70000,

    requestedMortgage: 310000,
    loanTerm: 30,
    askingPrice: 380000,
    mlValuation: 375000,
  },
]