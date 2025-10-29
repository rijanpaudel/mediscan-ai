import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, Brain, CheckCircle2 } from "lucide-react"

interface ProcessingIndicatorProps {
  fileName: string
}

export function ProcessingIndicator({ fileName }: ProcessingIndicatorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Loader2 className="size-5 animate-spin text-primary" />
          Processing Report
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">File: {fileName}</p>
          <Progress value={66} className="h-2" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <CheckCircle2 className="size-4" />
            </div>
            <div>
              <p className="text-sm font-medium">File uploaded successfully</p>
              <p className="text-xs text-muted-foreground">Preparing for analysis</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Loader2 className="size-4 animate-spin" />
            </div>
            <div>
              <p className="text-sm font-medium">Extracting text with OCR</p>
              <p className="text-xs text-muted-foreground">Reading document content</p>
            </div>
          </div>

          <div className="flex items-center gap-3 opacity-50">
            <div className="rounded-full bg-muted p-2 text-muted-foreground">
              <Brain className="size-4" />
            </div>
            <div>
              <p className="text-sm font-medium">AI Analysis in progress</p>
              <p className="text-xs text-muted-foreground">Analyzing medical data</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
