import {
  sampleApplications,
  type SampleApplication,
} from '../data/sampleApplications'

import type { ApplicationStatus } from '../data/sampleApplications'

export async function getApplications(): Promise<SampleApplication[]> {
  return [...sampleApplications]
}

export async function getApplicationById(
  id: string
): Promise<SampleApplication | undefined> {
  return sampleApplications.find(
    application => application.id === id
  )
}

export async function getApplicationsByStatus(
  status: ApplicationStatus | 'all'
): Promise<SampleApplication[]> {
  const applications = await getApplications()

  if (status === 'all') {
    return applications
  }

  return applications.filter(
    application => application.status === status
  )
}