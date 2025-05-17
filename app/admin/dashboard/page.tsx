import { Suspense } from "react"
import { Clock, DollarSign, Inbox, Users, ArrowUpRight, BarChart3, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RequestsTable } from "@/components/admin/requests-table"
import { RequestsTableSkeleton } from "@/components/admin/requests-table-skeleton"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-6 bg-gray-50/50">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-violet-900 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white p-2 rounded-full shadow-sm border border-indigo-100">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
          </div>
          <span className="text-sm font-medium text-indigo-600">Analytics Overview</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Requests</CardTitle>
            <div className="bg-indigo-50 p-2 rounded-full">
              <Inbox className="h-4 w-4 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
              <p className="text-xs text-emerald-500 font-medium">+5.4% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Requests</CardTitle>
            <div className="bg-amber-50 p-2 rounded-full">
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-red-500 mr-1 rotate-45" />
              <p className="text-xs text-red-500 font-medium">-2.1% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <div className="bg-emerald-50 p-2 rounded-full">
              <DollarSign className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,543</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
              <p className="text-xs text-emerald-500 font-medium">+10.2% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
            <div className="bg-violet-50 p-2 rounded-full">
              <Users className="h-4 w-4 text-violet-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
              <p className="text-xs text-emerald-500 font-medium">+7.8% from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-indigo-100 shadow-sm">
        <CardHeader className="border-b border-indigo-50 bg-gradient-to-r from-white to-indigo-50/30">
          <CardTitle className="text-indigo-900">Recent Requests</CardTitle>
          <CardDescription>Manage and respond to recent business support requests.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Suspense fallback={<RequestsTableSkeleton />}>
            <RequestsTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
