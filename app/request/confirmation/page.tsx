import Link from "next/link"
import { CheckCircle, ArrowRight, Clock, Mail, FileCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center py-20">
      <div className="container max-w-md">
        <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-8">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-violet-50 p-4 rounded-full">
              <CheckCircle className="h-12 w-12 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-violet-900 bg-clip-text text-transparent">
              Request Submitted!
            </h1>
            <p className="text-gray-600">
              Thank you for submitting your request. Our team will review it and get back to you shortly.
            </p>
            <div className="border rounded-lg p-6 bg-gradient-to-br from-indigo-50 via-white to-violet-50 w-full">
              <h2 className="font-semibold mb-4 text-indigo-800">What happens next?</h2>
              <ol className="text-sm text-left space-y-4">
                <li className="flex items-start">
                  <div className="bg-white p-2 rounded-full shadow-sm border border-indigo-100 mr-3 mt-0.5">
                    <Clock className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span className="text-gray-700">Our team will review your request within 24-48 hours.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white p-2 rounded-full shadow-sm border border-indigo-100 mr-3 mt-0.5">
                    <Mail className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span className="text-gray-700">You'll receive an email with a personalized solution proposal.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white p-2 rounded-full shadow-sm border border-indigo-100 mr-3 mt-0.5">
                    <FileCheck className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span className="text-gray-700">
                    Once you make the payment, you'll get access to your complete solution.
                  </span>
                </li>
              </ol>
            </div>
            <Link href="/" className="w-full">
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md shadow-indigo-200 hover:shadow-lg transition-all duration-200 group">
                Return to Home
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
