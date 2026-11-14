import {
  doc,
  getDoc,
  type DocumentData,
} from 'firebase/firestore'

import { db } from './firebase'

import type {
  Application,
  FirestoreApplication,
} from '../types/application'

// Convert a Firestore document into the structure
// used by the AL-Web interface.
export function mapApplication(
  id: string,
  data: DocumentData
): Application {

  const application: FirestoreApplication = {
    id,
    ...data,
  } as FirestoreApplication

  return {
    id: application.id,

    referenceNumber: application.referenceNumber,

    applicant: application.applicantName ?? 'Unknown Applicant',

    location: [
      application.area,
      application.county,
    ].filter(Boolean).join(', '),

    property: application.propertyAddress,

    status: application.status,

    propertyType: application.propertyType,

    propertySize: application.propertySize,

    berRating: application.berRating,

    requestedMortgage: application.loanAmount,

    grossIncome: application.grossIncome,

    existingDebt: application.existingDebt,

    deposit: application.deposit,

    loanTerm: application.loanTerm,

    askingPrice: application.askingPrice,

    // AI valuation may not exist yet.
    // Do not substitute propertyValue for it.
    mlValuation: application.valuation,
  }
}

// Retrieve one application using its Firestore document ID.
export async function getApplicationById(
  id: string
): Promise<Application | undefined> {

  const applicationRef = doc(db, 'applications', id)

  const snapshot = await getDoc(applicationRef)

  if (!snapshot.exists()) {
    return undefined
  }

  return mapApplication(snapshot.id, snapshot.data())
}