"use client"

import { useState, useEffect } from "react"
import { getRequests } from "@/lib/firebase/requests"

export function useRequests() {
  const [requests, setRequests] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRequests() {
      try {
        const data = await getRequests()
        setRequests(data)
      } catch (err) {
        console.error("Error fetching requests:", err)
        setError("Failed to load requests")
      } finally {
        setIsLoading(false)
      }
    }

    fetchRequests()
  }, [])

  return { requests, isLoading, error }
}
