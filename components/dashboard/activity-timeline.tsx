import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileCheck, AlertCircle, Download } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "upload",
    title: "Blood Test Results uploaded",
    time: "2 hours ago",
    icon: Upload,
    color: "text-primary",
  },
  {
    id: 2,
    type: "completed",
    title: "X-Ray analysis completed",
    time: "5 hours ago",
    icon: FileCheck,
    color: "text-secondary",
  },
  {
    id: 3,
    type: "alert",
    title: "Urgent: ECG requires attention",
    time: "1 day ago",
    icon: AlertCircle,
    color: "text-destructive",
  },
  {
    id: 4,
    type: "download",
    title: "MRI report downloaded",
    time: "2 days ago",
    icon: Download,
    color: "text-muted-foreground",
  },
  {
    id: 5,
    type: "completed",
    title: "Lipid Profile analysis done",
    time: "3 days ago",
    icon: FileCheck,
    color: "text-secondary",
  },
]

export function ActivityTimeline() {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex gap-3">
              <div className="relative flex flex-col items-center">
                <div className={`rounded-full bg-muted p-2 ${activity.color}`}>
                  <activity.icon className="size-3" />
                </div>
                {index < activities.length - 1 && <div className="h-full w-px bg-border mt-2" />}
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm font-medium leading-tight">{activity.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
