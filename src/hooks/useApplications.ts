import { useEffect, useState } from 'react'

import {
  collection,
  onSnapshot,
  query,
  where,
  type Query,
} from 'firebase/firestore'

import { db } from '../services/firebase'
import { mapApplication } from '../services/applicationService'

import type {
  Role,
  Application,
} from '../types/application'

export function useApplications(
  role: Role | undefined,
  uid: string | undefined
) {

  const [applications, setApplications] = useState<Application[]>([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    if (!role || !uid) {
      setApplications([])
      setLoading(false)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    const applicationsRef = collection(db, 'applications')

    let applicationsQuery: Query

    // Underwriters can access every application.
    if (role === 'underwriter') {

      applicationsQuery = query(applicationsRef)

    }

    // Brokers can only access their own applications.
    else if (role === 'broker') {

      applicationsQuery = query(
        applicationsRef,
        where('brokerId', '==', uid)
      )

    }

    // Borrowers can only access their own applications.
    else {

      applicationsQuery = query(
        applicationsRef,
        where('borrowerId', '==', uid)
      )

    }

    const unsubscribe = onSnapshot(

      applicationsQuery,

      (snapshot) => {

        // Sort Firestore documents by creation date.
        const sortedDocuments = [...snapshot.docs].sort((a, b) => {

          const dateA = a.data().createdAt?.toMillis?.() ?? 0

          const dateB = b.data().createdAt?.toMillis?.() ?? 0

          return dateB - dateA

        })

        // Convert Firestore documents into frontend applications.
        const results = sortedDocuments.map((document) =>
          mapApplication(document.id, document.data())
        )

        setApplications(results)

        setError(null)

        setLoading(false)

      },

      (error) => {

        console.error('Failed to retrieve applications:', error)

        setError(error.message)

        setLoading(false)

      }

    )

    return unsubscribe

  }, [role, uid])

  return {
    applications,
    loading,
    error,
  }
}