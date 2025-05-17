import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function createPaymentIntent({
  requestId,
  amount,
  currency = "usd",
}: {
  requestId: string
  amount: number
  currency: string
}) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        requestId,
      },
    })

    return {
      clientSecret: paymentIntent.client_secret,
    }
  } catch (error) {
    console.error("Error creating payment intent:", error)
    throw error
  }
}

export default stripe
