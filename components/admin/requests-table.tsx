"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Eye, MoreHorizontal, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useRequests } from "@/hooks/use-requests"

export function RequestsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const { requests, isLoading } = useRequests()

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="font-medium text-gray-500 text-xs">{row.getValue("id").substring(0, 8)}...</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-indigo-50 hover:text-indigo-600"
          >
            Name
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium text-indigo-900">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "requestType",
      header: "Type",
      cell: ({ row }) => <div className="capitalize text-gray-700">{row.getValue("requestType")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant={
              status === "pending"
                ? "outline"
                : status === "in-progress"
                  ? "secondary"
                  : status === "completed"
                    ? "default"
                    : "destructive"
            }
            className={
              status === "pending"
                ? "border-amber-200 text-amber-700 bg-amber-50"
                : status === "in-progress"
                  ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-100"
                  : status === "completed"
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                    : "bg-red-100 text-red-700 hover:bg-red-100"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-indigo-50 hover:text-indigo-600"
          >
            Date
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const timestamp = row.getValue("createdAt") as { seconds: number; nanoseconds: number }
        if (!timestamp) return "N/A"

        const date = new Date(timestamp.seconds * 1000)
        return <div className="text-gray-600">{format(date, "MMM d, yyyy")}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const request = row.original

        return (
          <div className="flex items-center justify-end gap-2">
            <Link href={`/admin/requests/${request.id}`}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">View details</span>
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-indigo-50">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/requests/${request.id}`} className="cursor-pointer">
                    View details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <span className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    Send email
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Update status</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: requests,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  if (isLoading) {
    return <div>Loading requests...</div>
  }

  return (
    <div>
      <div className="rounded-md">
        <Table>
          <TableHeader className="bg-indigo-50/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-indigo-50/80 border-indigo-100">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-indigo-900 font-medium">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-indigo-50/50 border-indigo-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                  No requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-gray-500">{table.getFilteredRowModel().rows.length} request(s) total.</div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
