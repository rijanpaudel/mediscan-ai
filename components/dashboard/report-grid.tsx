import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const reports = [
  {
    id: 1,
    name: "Blood Test Results",
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: 2,
    name: "X-Ray Chest Report",
    date: "2024-01-14",
    status: "completed",
  },
  {
    id: 3,
    name: "MRI Scan Brain",
    date: "2024-01-12",
    status: "pending",
  },
  {
    id: 4,
    name: "ECG Report",
    date: "2024-01-10",
    status: "urgent",
  },
  {
    id: 5,
    name: "Lipid Profile",
    date: "2024-01-08",
    status: "completed",
  },
  {
    id: 6,
    name: "Thyroid Function Test",
    date: "2024-01-05",
    status: "completed",
  },
]

const statusConfig = {
  completed: { label: "Completed", variant: "default" as const },
  pending: { label: "Pending", variant: "secondary" as const },
  urgent: { label: "Urgent", variant: "destructive" as const },
}

export function ReportGrid() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <FileText className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-sm leading-tight line-clamp-1">{report.name}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" className="shrink-0">
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{report.date}</p>
                <Badge variant={statusConfig[report.status as keyof typeof statusConfig].variant} className="mt-2">
                  {statusConfig[report.status as keyof typeof statusConfig].label}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
