import { NextResponse } from "next/server"
import { headers } from "next/headers"
import type Stripe from "stripe"

import stripe from "@/lib/stripe"
import { updateRequestPaymentStatus } from "@/lib/firebase/requests"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error: any) {
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 })
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    const requestId = paymentIntent.metadata.requestId

    if (requestId) {
      try {
        await updateRequestPaymentStatus(requestId, true)
      } catch (error) {
        console.error("Error updating request payment status:", error)
        return NextResponse.json({ error: "Error updating request payment status" }, { status: 500 })
      }
    }
  }

  return NextResponse.json({ received: true })
}
