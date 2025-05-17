"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Copy, Loader2, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { updateRequestPaymentStatus } from "@/lib/firebase/requests"

interface RequestPaymentProps {
  requestId: string
}

export function RequestPayment({ requestId }: RequestPaymentProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isMarking, setIsMarking] = useState(false)
  const [paymentLink, setPaymentLink] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const generatePaymentLink = async () => {
    setIsGenerating(true)
    try {
      // Generate a payment link
      const link = `${window.location.origin}/payment/${requestId}`
      setPaymentLink(link)
      toast({
        title: "Payment link generated",
        description: "The payment link has been generated successfully.",
      })
    } catch (error) {
      console.error("Error generating payment link:", error)
      toast({
        title: "Error generating payment link",
        description: "There was an error generating the payment link.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const sendPaymentLink = async () => {
    setIsSending(true)
    try {
      // Send payment link via email
      // This would typically call an API endpoint to send an email
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      toast({
        title: "Payment link sent",
        description: "The payment link has been sent to the customer.",
      })
    } catch (error) {
      console.error("Error sending payment link:", error)
      toast({
        title: "Error sending payment link",
        description: "There was an error sending the payment link.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  const markAsPaid = async () => {
    setIsMarking(true)
    try {
      await updateRequestPaymentStatus(requestId, true)

      toast({
        title: "Marked as paid",
        description: "The request has been marked as paid.",
      })

      router.refresh()
    } catch (error) {
      console.error("Error marking as paid:", error)
      toast({
        title: "Error marking as paid",
        description: "There was an error marking the request as paid.",
        variant: "destructive",
      })
    } finally {
      setIsMarking(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentLink)
    toast({
      title: "Copied to clipboard",
      description: "The payment link has been copied to your clipboard.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Payment Link</h3>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generatePaymentLink} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Payment Link"
            )}
          </Button>
        </div>
      </div>

      {paymentLink && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Payment URL</h3>
          <div className="flex gap-2">
            <Input value={paymentLink} readOnly />
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" onClick={sendPaymentLink} disabled={isSending} className="mt-2">
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Send to Customer
              </>
            )}
          </Button>
        </div>
      )}

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium mb-2">Manual Payment Processing</h3>
        <p className="text-sm text-muted-foreground mb-4">
          If the customer has paid through another method, you can manually mark this request as paid.
        </p>
        <Button variant="default" onClick={markAsPaid} disabled={isMarking}>
          {isMarking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Mark as Paid"
          )}
        </Button>
      </div>
    </div>
  )
}
