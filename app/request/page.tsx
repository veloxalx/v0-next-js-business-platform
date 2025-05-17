"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Loader2, Send, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { submitRequest } from "@/lib/firebase/requests"

const requestFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  requestType: z.string({
    required_error: "Please select a request type.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  budget: z.string().min(1, {
    message: "Please enter your budget.",
  }),
  timeline: z.string().min(1, {
    message: "Please enter your timeline.",
  }),
})

type RequestFormValues = z.infer<typeof requestFormSchema>

export default function RequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      name: "",
      email: "",
      requestType: "",
      description: "",
      budget: "",
      timeline: "",
    },
  })

  async function onSubmit(data: RequestFormValues) {
    setIsSubmitting(true)
    try {
      await submitRequest(data)
      toast({
        title: "Request submitted successfully",
        description: "We'll get back to you soon with a solution.",
      })
      router.push("/request/confirmation")
    } catch (error) {
      console.error("Error submitting request:", error)
      toast({
        title: "Error submitting request",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-10">
      <div className="container max-w-3xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Home
          </Button>
        </Link>
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm text-indigo-700 shadow-sm mb-2">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              <span>Request Form</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-violet-900 bg-clip-text text-transparent">
              Submit a Request
            </h1>
            <p className="text-gray-600 mt-2 max-w-xl mx-auto">
              Fill out the form below to submit your business support request.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-indigo-100">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className="border-indigo-100 focus-visible:ring-indigo-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            className="border-indigo-100 focus-visible:ring-indigo-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="requestType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Request Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-indigo-100 focus-visible:ring-indigo-500">
                            <SelectValue placeholder="Select a request type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="supplier">Find a Supplier</SelectItem>
                          <SelectItem value="startup">Startup Idea</SelectItem>
                          <SelectItem value="freelancer">Find a Freelancer</SelectItem>
                          <SelectItem value="marketing">Marketing Strategy</SelectItem>
                          <SelectItem value="funding">Funding Options</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Select the type of business support you need.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your request in detail..."
                          className="min-h-32 border-indigo-100 focus-visible:ring-indigo-500"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide as much detail as possible to help us understand your needs.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. $1,000 - $5,000"
                            className="border-indigo-100 focus-visible:ring-indigo-500"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Your approximate budget for this project.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="timeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timeline</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. 2 weeks, 1 month"
                            className="border-indigo-100 focus-visible:ring-indigo-500"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Your expected timeline for completion.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md shadow-indigo-200 hover:shadow-lg transition-all duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Request
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
