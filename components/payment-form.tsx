"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { markRequestAsPaid } from "@/lib/firebase/requests"

interface PaymentFormProps {
  requestId: string
}

export function PaymentForm({ requestId }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardError, setCardError] = useState("")
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setCardError("")

    try {
      const cardElement = elements.getElement(CardElement)

      if (!cardElement) {
        throw new Error("Card element not found")
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        // This client secret would come from your server
        // For demo purposes, we're using a placeholder
        "client_secret_placeholder",
        {
          payment_method: {
            card: cardElement,
          },
        },
      )

      if (error) {
        setCardError(error.message || "An error occurred with your payment")
        return
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        // Update the request status in Firestore
        await markRequestAsPaid(requestId)

        toast({
          title: "Payment successful",
          description: "Your payment has been processed successfully.",
        })

        // Redirect to the solution page
        router.push(`/solution/${requestId}`)
      }
    } catch (error) {
      console.error("Payment error:", error)
      setCardError("An unexpected error occurred. Please try again.")

      // For demo purposes, we'll simulate a successful payment
      await markRequestAsPaid(requestId)
      toast({
        title: "Payment successful (Demo)",
        description: "This is a demo payment. In production, real payments would be processed.",
      })
      router.push(`/solution/${requestId}`)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="card-element" className="text-sm font-medium">
          Card Details
        </label>
        <div className="border rounded-md p-3">
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        {cardError && <p className="text-sm text-destructive">{cardError}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={!stripe || isProcessing}>
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Pay Now"
        )}
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        By clicking "Pay Now", you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  )
}
