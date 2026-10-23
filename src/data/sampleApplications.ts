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
}

export const sampleApplications: SampleApplication[] = [
  {
    id: 'AL-1042',
    applicant: 'Sarah Murphy',
    location: 'Cork',
    property: '3-bed semi-detached',
    status: 'AI Deliberated',
  },
  {
    id: 'AL-1043',
    applicant: 'John Walsh',
    location: 'Cork',
    property: '4-bed detached',
    status: 'Applied',
  },
  {
    id: 'AL-1044',
    applicant: 'Aoife Kelly',
    location: 'Limerick',
    property: '2-bed apartment',
    status: 'Underwriter Approved',
  },
  {
    id: 'AL-1045',
    applicant: 'Liam Byrne',
    location: 'Waterford',
    property: '3-bed terraced',
    status: 'Applied',
  },
  {
    id: 'AL-1046',
    applicant: "Emma O'Brien",
    location: 'Cork',
    property: '3-bed semi-detached',
    status: 'Funded',
  },
]