"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Loader2 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentForm } from "@/components/payment-form"
import { getRequestById } from "@/lib/firebase/requests"
import { createPaymentIntent } from "@/lib/stripe"

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PaymentPage({ params }: { params: { id: string } }) {
  const [request, setRequest] = useState<any>(null)
  const [clientSecret, setClientSecret] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch request details
        const requestData = await getRequestById(params.id)
        if (!requestData) {
          setError("Request not found")
          setLoading(false)
          return
        }
        setRequest(requestData)

        // Create payment intent
        const { clientSecret } = await createPaymentIntent({
          requestId: params.id,
          amount: requestData.solutionPrice || 5000, // Default to $50 if not set
          currency: "usd",
        })
        setClientSecret(clientSecret)
      } catch (err) {
        console.error("Error loading payment page:", err)
        setError("Failed to load payment information")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  if (loading) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Loading payment information...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>There was a problem loading the payment page</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Payment</CardTitle>
          <CardDescription>Pay to unlock your personalized business solution</CardDescription>
        </CardHeader>
        <CardContent>
          {request && (
            <div className="mb-6 space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Request Type:</span>
                <span>{request.requestType}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Solution:</span>
                <span>{request.solutionTitle || "Personalized Business Solution"}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${((request.solutionPrice || 5000) / 100).toFixed(2)}</span>
              </div>
            </div>
          )}
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "stripe",
                },
              }}
            >
              <PaymentForm requestId={params.id} />
            </Elements>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
