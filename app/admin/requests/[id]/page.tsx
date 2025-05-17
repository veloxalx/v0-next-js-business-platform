import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestDetails } from "@/components/admin/request-details"
import { RequestSolution } from "@/components/admin/request-solution"
import { RequestPayment } from "@/components/admin/request-payment"
import { getRequestById } from "@/lib/firebase/requests"

export default async function RequestPage({ params }: { params: { id: string } }) {
  const request = await getRequestById(params.id)

  if (!request) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/requests">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Requests
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Request Details</h1>
      </div>
      <Tabs defaultValue="details">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="solution">Solution</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Request Information</CardTitle>
              <CardDescription>View the details of this business support request.</CardDescription>
            </CardHeader>
            <CardContent>
              <RequestDetails request={request} />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Mark as Reviewed</Button>
              <Button>Contact Customer</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="solution">
          <Card>
            <CardHeader>
              <CardTitle>Solution Management</CardTitle>
              <CardDescription>Create and manage the solution for this request.</CardDescription>
            </CardHeader>
            <CardContent>
              <RequestSolution requestId={params.id} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Status</CardTitle>
              <CardDescription>View and manage payment information for this request.</CardDescription>
            </CardHeader>
            <CardContent>
              <RequestPayment requestId={params.id} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
