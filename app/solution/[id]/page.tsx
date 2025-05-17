import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Download, FileText, CheckCircle2, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getRequestById } from "@/lib/firebase/requests"

export default async function SolutionPage({ params }: { params: { id: string } }) {
  const request = await getRequestById(params.id)

  if (!request || !request.isPaid) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-10">
      <div className="container max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Home
          </Button>
        </Link>
        <Card className="border-indigo-100 shadow-sm overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-violet-600"></div>
          <CardHeader className="border-b border-indigo-50 bg-gradient-to-r from-white to-indigo-50/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-emerald-50 p-1 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                  <span className="text-sm font-medium text-emerald-600">Solution Ready</span>
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-gray-900 via-indigo-800 to-violet-900 bg-clip-text text-transparent">
                  Your Business Solution
                </CardTitle>
                <CardDescription>Thank you for your payment. Here is your personalized solution.</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-indigo-900">
                {request.solutionTitle || "Business Solution"}
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-indigo-50/50 p-3 rounded-lg">
                  <p className="text-indigo-600 font-medium">Request Type</p>
                  <p className="font-medium text-gray-800 capitalize">{request.requestType}</p>
                </div>
                <div className="bg-indigo-50/50 p-3 rounded-lg">
                  <p className="text-indigo-600 font-medium">Date</p>
                  <p className="font-medium text-gray-800">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <div className="border-t border-indigo-100 pt-4">
              <h3 className="font-semibold mb-3 text-indigo-900 flex items-center">
                <span className="bg-indigo-100 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">
                  1
                </span>
                Solution Overview
              </h3>
              <p className="text-gray-700 bg-white p-4 rounded-lg border border-indigo-50 shadow-sm">
                {request.solutionDescription || "Your personalized business solution details will appear here."}
              </p>
            </div>
            <div className="border-t border-indigo-100 pt-4">
              <h3 className="font-semibold mb-3 text-indigo-900 flex items-center">
                <span className="bg-indigo-100 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">
                  2
                </span>
                Detailed Steps
              </h3>
              <div className="bg-white p-4 rounded-lg border border-indigo-50 shadow-sm">
                <ol className="list-none space-y-3">
                  {request.solutionSteps ? (
                    request.solutionSteps.map((step: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-indigo-50 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start">
                        <div className="bg-indigo-50 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          1
                        </div>
                        <span className="text-gray-700">Research and identify potential partners or resources</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-indigo-50 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          2
                        </div>
                        <span className="text-gray-700">Develop a strategic implementation plan</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-indigo-50 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          3
                        </div>
                        <span className="text-gray-700">Create necessary documentation and templates</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-indigo-50 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          4
                        </div>
                        <span className="text-gray-700">Establish metrics for measuring success</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-indigo-50 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          5
                        </div>
                        <span className="text-gray-700">Implement the solution with ongoing support</span>
                      </li>
                    </>
                  )}
                </ol>
              </div>
            </div>
            {request.solutionResources && (
              <div className="border-t border-indigo-100 pt-4">
                <h3 className="font-semibold mb-3 text-indigo-900 flex items-center">
                  <span className="bg-indigo-100 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">
                    3
                  </span>
                  Resources
                </h3>
                <div className="grid gap-2">
                  {request.solutionResources.map((resource: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center p-3 border border-indigo-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                      <span className="text-gray-700">{resource.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto h-8 w-8 p-0 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 bg-gradient-to-r from-indigo-50/50 to-violet-50/50 border-t border-indigo-100">
            <div className="w-full pt-4">
              <h3 className="font-semibold mb-2 text-indigo-900">Need Further Assistance?</h3>
              <p className="text-sm text-gray-600">
                If you have any questions about your solution or need additional support, please contact us at{" "}
                <a
                  href="mailto:support@businesssupport.com"
                  className="text-indigo-600 hover:text-indigo-700 underline flex items-center inline-flex"
                >
                  support@businesssupport.com
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
