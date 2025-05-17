import { Suspense } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RequestsTable } from "@/components/admin/requests-table"
import { RequestsTableSkeleton } from "@/components/admin/requests-table-skeleton"
import { RequestsFilter } from "@/components/admin/requests-filter"

export default function RequestsPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Requests</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Requests</CardTitle>
          <CardDescription>View and manage all business support requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <RequestsFilter />
          <Suspense fallback={<RequestsTableSkeleton />}>
            <RequestsTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
