import { Card, CardContent } from "@/components/ui/card"
import { FileText, Clock, AlertTriangle } from "lucide-react"

const stats = [
  {
    title: "Total Reports",
    value: "24",
    icon: FileText,
    description: "+3 from last month",
    color: "text-primary",
  },
  {
    title: "Pending Reviews",
    value: "5",
    icon: Clock,
    description: "Awaiting analysis",
    color: "text-secondary",
  },
  {
    title: "Urgent Alerts",
    value: "2",
    icon: AlertTriangle,
    description: "Requires attention",
    color: "text-destructive",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="flex items-center gap-4 p-6">
            <div className={`rounded-lg bg-muted p-3 ${stat.color}`}>
              <stat.icon className="size-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
