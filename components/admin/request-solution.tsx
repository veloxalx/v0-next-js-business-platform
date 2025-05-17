"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { updateRequestSolution } from "@/lib/firebase/requests"

const solutionFormSchema = z.object({
  solutionTitle: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  solutionDescription: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  solutionPrice: z.string().min(1, {
    message: "Price is required.",
  }),
  solutionSteps: z.array(z.string().min(1, { message: "Step cannot be empty." })),
})

type SolutionFormValues = z.infer<typeof solutionFormSchema>

interface RequestSolutionProps {
  requestId: string
}

export function RequestSolution({ requestId }: RequestSolutionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<SolutionFormValues>({
    resolver: zodResolver(solutionFormSchema),
    defaultValues: {
      solutionTitle: "",
      solutionDescription: "",
      solutionPrice: "50.00",
      solutionSteps: ["", ""],
    },
  })

  async function onSubmit(data: SolutionFormValues) {
    setIsSubmitting(true)
    try {
      // Convert price from dollars to cents for Stripe
      const priceInCents = Math.round(Number.parseFloat(data.solutionPrice) * 100)

      await updateRequestSolution(requestId, {
        ...data,
        solutionPrice: priceInCents,
      })

      toast({
        title: "Solution saved",
        description: "The solution has been saved successfully.",
      })
    } catch (error) {
      console.error("Error saving solution:", error)
      toast({
        title: "Error saving solution",
        description: "There was an error saving the solution.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const addStep = () => {
    const currentSteps = form.getValues("solutionSteps")
    form.setValue("solutionSteps", [...currentSteps, ""])
  }

  const removeStep = (index: number) => {
    const currentSteps = form.getValues("solutionSteps")
    if (currentSteps.length > 1) {
      form.setValue(
        "solutionSteps",
        currentSteps.filter((_, i) => i !== index),
      )
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="solutionTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solution Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Comprehensive Supplier Network" {...field} />
              </FormControl>
              <FormDescription>A concise title for the solution you're providing.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="solutionDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solution Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide a detailed description of the solution..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>Provide a comprehensive explanation of the solution you're offering.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="solutionPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solution Price (USD)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" min="0" {...field} />
              </FormControl>
              <FormDescription>The price the customer will pay to access this solution.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>Solution Steps</FormLabel>
          <FormDescription className="mb-2">Break down the solution into clear, actionable steps.</FormDescription>
          {form.watch("solutionSteps").map((_, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`solutionSteps.${index}`}
              render={({ field }) => (
                <FormItem className="mb-2">
                  <div className="flex gap-2">
                    <FormControl>
                      <Input placeholder={`Step ${index + 1}`} {...field} />
                    </FormControl>
                    <Button type="button" variant="outline" size="icon" onClick={() => removeStep(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addStep}>
            <Plus className="mr-2 h-4 w-4" />
            Add Step
          </Button>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Solution"
          )}
        </Button>
      </form>
    </Form>
  )
}
