import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back! Here's an overview of your medical reports.</p>
      </div>
      <Button size="lg" className="gap-2">
        <Upload className="size-4" />
        Upload New Report
      </Button>
    </div>
  )
}
