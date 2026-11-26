import type { Application } from '../types/application'

export interface ApplicationStatistics {
  total: number
  applied: number
  aiDeliberated: number
  approved: number
  funded: number
  closed: number
}

export function getApplicationStatistics(
  applications: Application[],
): ApplicationStatistics {
  return {
    total: applications.length,

    applied: applications.filter(
      app => app.status === 'Applied',
    ).length,

    aiDeliberated: applications.filter(
      app => app.status === 'AI Deliberated',
    ).length,

    approved: applications.filter(
      app => app.status === 'Underwriter Approved',
    ).length,

    funded: applications.filter(
      app => app.status === 'Funded',
    ).length,

    closed: applications.filter(
      app => app.status === 'Closed',
    ).length,
  }
}