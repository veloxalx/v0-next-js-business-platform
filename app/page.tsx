import Link from "next/link"
import { ArrowRight, CheckCircle2, Sparkles, Users, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Business
            </span>
            <span>Support</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Services
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-indigo-600 transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/request">
              <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md shadow-indigo-200 hover:shadow-lg transition-all duration-200">
                Submit Request
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button
                variant="outline"
                className="border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
              >
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 z-0"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm text-indigo-700 shadow-sm mb-2">
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  <span>Personalized Business Solutions</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-gray-900 via-indigo-800 to-violet-900 bg-clip-text text-transparent">
                  Business Support Solutions for Your Growth
                </h1>
                <p className="text-gray-600 md:text-xl max-w-[600px]">
                  Get personalized solutions for finding suppliers, developing startup ideas, connecting with
                  freelancers, and more. We help your business thrive.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                  <Link href="/request">
                    <Button
                      size="lg"
                      className="gap-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md shadow-indigo-200 hover:shadow-lg transition-all duration-200"
                    >
                      Submit a Request <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 opacity-30 blur-xl"></div>
                  <img
                    src="/placeholder.svg?height=500&width=500"
                    alt="Business Support"
                    className="relative rounded-xl object-cover shadow-2xl"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm text-indigo-700 shadow-sm mb-2">
                <Zap className="h-3.5 w-3.5 mr-1" />
                <span>Simple Process</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-gray-900 via-indigo-800 to-violet-900 bg-clip-text text-transparent">
                  How It Works
                </h2>
                <p className="text-gray-600 md:text-xl max-w-[800px] mx-auto">
                  Our simple process to help you get the business support you need
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center space-y-4 p-8 rounded-xl border border-indigo-100 bg-white shadow-sm hover:shadow-md transition-shadow group">
                <div className="p-3 rounded-full bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-600 group-hover:scale-110 transition-transform duration-200">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Submit Your Request</h3>
                <p className="text-center text-gray-600">Fill out our detailed request form with your business needs</p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-8 rounded-xl border border-indigo-100 bg-white shadow-sm hover:shadow-md transition-shadow group">
                <div className="p-3 rounded-full bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-600 group-hover:scale-110 transition-transform duration-200">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">Get a Personalized Solution</h3>
                <p className="text-center text-gray-600">
                  Our experts will create a tailored solution for your specific needs
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-8 rounded-xl border border-indigo-100 bg-white shadow-sm hover:shadow-md transition-shadow group">
                <div className="p-3 rounded-full bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-600 group-hover:scale-110 transition-transform duration-200">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Implement and Grow</h3>
                <p className="text-center text-gray-600">
                  Unlock your solution and start implementing it to grow your business
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-gradient-to-br from-indigo-50 via-white to-violet-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm text-indigo-700 shadow-sm mb-2">
                <Users className="h-3.5 w-3.5 mr-1" />
                <span>Trusted by Businesses</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-gray-900 via-indigo-800 to-violet-900 bg-clip-text text-transparent">
                  What Our Clients Say
                </h2>
                <p className="text-gray-600 md:text-xl max-w-[800px] mx-auto">
                  Hear from businesses that have transformed with our support
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col p-6 bg-white rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="mr-4 rounded-full bg-indigo-100 p-2">
                    <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500">CEO, TechStart</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The supplier connections we received were exactly what we needed to scale our production. Highly
                  recommended!"
                </p>
              </div>
              <div className="flex flex-col p-6 bg-white rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="mr-4 rounded-full bg-indigo-100 p-2">
                    <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Michael Chen</h4>
                    <p className="text-sm text-gray-500">Founder, GrowthLabs</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Their startup idea validation saved us months of work and thousands of dollars. The insights were
                  invaluable."
                </p>
              </div>
              <div className="flex flex-col p-6 bg-white rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="mr-4 rounded-full bg-indigo-100 p-2">
                    <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Jessica Martinez</h4>
                    <p className="text-sm text-gray-500">Director, CreativeHub</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Finding quality freelancers was always a challenge until we used Business Support. Now we have a
                  reliable talent pool."
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <Link href="/request">
                <Button
                  size="lg"
                  className="gap-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md shadow-indigo-200 hover:shadow-lg transition-all duration-200"
                >
                  Get Started Today <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8 md:py-12 bg-white">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Business
            </span>
            <span>Support</span>
          </div>
          <p className="text-center text-sm text-gray-500 md:text-left">© 2025 BusinessSupport. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6 md:ml-auto">
            <Link href="/terms" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
