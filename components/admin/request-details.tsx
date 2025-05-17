import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

interface RequestDetailsProps {
  request: any
}

export function RequestDetails({ request }: RequestDetailsProps) {
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A"
    const date = new Date(timestamp.seconds * 1000)
    return format(date, "PPP")
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Request ID</h3>
          <p className="mt-1">{request.id}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
          <div className="mt-1">
            <Badge
              variant={
                request.status === "pending"
                  ? "outline"
                  : request.status === "in-progress"
                    ? "secondary"
                    : request.status === "completed"
                      ? "default"
                      : "destructive"
              }
            >
              {request.status || "pending"}
            </Badge>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Date Submitted</h3>
          <p className="mt-1">{formatDate(request.createdAt)}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Request Type</h3>
          <p className="mt-1 capitalize">{request.requestType}</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-muted-foreground">Customer Information</h3>
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h4 className="text-xs font-medium text-muted-foreground">Name</h4>
            <p>{request.name}</p>
          </div>
          <div>
            <h4 className="text-xs font-medium text-muted-foreground">Email</h4>
            <p>{request.email}</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-muted-foreground">Request Details</h3>
        <div className="mt-2 space-y-4">
          <div>
            <h4 className="text-xs font-medium text-muted-foreground">Description</h4>
            <p className="mt-1 whitespace-pre-line">{request.description}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-xs font-medium text-muted-foreground">Budget</h4>
              <p>{request.budget}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-muted-foreground">Timeline</h4>
              <p>{request.timeline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-muted-foreground">Payment Status</h3>
        <div className="mt-2">
          <Badge variant={request.isPaid ? "default" : "outline"}>{request.isPaid ? "Paid" : "Unpaid"}</Badge>
          {request.isPaid && request.paymentDate && (
            <p className="mt-1 text-sm">Paid on {formatDate(request.paymentDate)}</p>
          )}
        </div>
      </div>
    </div>
  )
}
