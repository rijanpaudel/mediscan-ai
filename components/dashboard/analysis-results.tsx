"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  Download,
  Save,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Brain,
  TrendingUp,
  Activity,
  RotateCcw,
} from "lucide-react"
import { LabValuesChart } from "@/components/dashboard/lab-values-chart"

interface AnalysisResultsProps {
  fileName: string
  onReset: () => void
}

// Mock data for demonstration
const extractedText = `LABORATORY REPORT
Patient: John Doe
Date: January 15, 2024
Test: Complete Blood Count (CBC)

RESULTS:
Hemoglobin: 13.2 g/dL
White Blood Cell Count: 11,500 /μL
Platelet Count: 180,000 /μL
Red Blood Cell Count: 4.5 million/μL
Glucose (Fasting): 126 mg/dL`

const labValues = [
  {
    name: "Hemoglobin",
    value: "13.2 g/dL",
    normalRange: "13.5-17.5 g/dL",
    status: "normal",
    icon: Activity,
  },
  {
    name: "White Blood Cell Count",
    value: "11,500 /μL",
    normalRange: "4,000-11,000 /μL",
    status: "abnormal",
    icon: AlertTriangle,
  },
  {
    name: "Platelet Count",
    value: "180,000 /μL",
    normalRange: "150,000-400,000 /μL",
    status: "normal",
    icon: Activity,
  },
  {
    name: "Glucose (Fasting)",
    value: "126 mg/dL",
    normalRange: "70-100 mg/dL",
    status: "abnormal",
    icon: AlertTriangle,
  },
]

const recommendations = [
  "Consult with your healthcare provider about elevated white blood cell count",
  "Monitor fasting glucose levels - may indicate prediabetes",
  "Consider lifestyle modifications including diet and exercise",
  "Schedule follow-up blood work in 3 months",
]

export function AnalysisResults({ fileName, onReset }: AnalysisResultsProps) {
  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <FileText className="size-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Analysis Complete</h2>
            <p className="text-sm text-muted-foreground">{fileName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Save className="size-4" />
            Save to History
          </Button>
          <Button className="gap-2">
            <Download className="size-4" />
            Download PDF
          </Button>
          <Button variant="ghost" size="icon" onClick={onReset}>
            <RotateCcw className="size-4" />
          </Button>
        </div>
      </div>

      {/* Urgency Indicator */}
      <Alert className="border-destructive/50 bg-destructive/5">
        <AlertTriangle className="size-4 text-destructive" />
        <AlertDescription className="text-sm">
          <span className="font-semibold">Urgent:</span> Some values require medical attention. Please consult with your
          healthcare provider.
        </AlertDescription>
      </Alert>

      {/* AI Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="size-5 text-primary" />
            AI Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Your blood test results show mostly normal values with two areas requiring attention. Your white blood cell
            count is slightly elevated at 11,500 /μL (normal range: 4,000-11,000 /μL), which could indicate an infection
            or inflammatory response. Additionally, your fasting glucose level of 126 mg/dL is above the normal range
            (70-100 mg/dL), suggesting prediabetes.
          </p>
          <Separator />
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="gap-1">
              <AlertTriangle className="size-3" />2 Abnormal Values
            </Badge>
            <Badge variant="default" className="gap-1">
              <CheckCircle2 className="size-3" />2 Normal Values
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Lab Values with Visual Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Laboratory Values</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {labValues.map((lab, index) => (
            <div key={index}>
              <div className="flex items-start gap-3">
                <div
                  className={`rounded-lg p-2 ${
                    lab.status === "abnormal" ? "bg-destructive/10 text-destructive" : "bg-secondary/10 text-secondary"
                  }`}
                >
                  <lab.icon className="size-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium text-sm">{lab.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">Normal range: {lab.normalRange}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${lab.status === "abnormal" ? "text-destructive" : "text-secondary"}`}
                      >
                        {lab.value}
                      </p>
                      {lab.status === "abnormal" ? (
                        <Badge variant="destructive" className="mt-1 gap-1">
                          <AlertTriangle className="size-3" />
                          Abnormal
                        </Badge>
                      ) : (
                        <Badge variant="default" className="mt-1 gap-1">
                          <CheckCircle2 className="size-3" />
                          Normal
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {index < labValues.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Data Visualization */}
      <LabValuesChart />

      {/* Extracted Text Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Extracted Text</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-4">
            <pre className="text-xs font-mono whitespace-pre-wrap leading-relaxed">{extractedText}</pre>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-5 text-primary" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-1 text-primary mt-0.5">
                  <CheckCircle2 className="size-3" />
                </div>
                <p className="text-sm leading-relaxed flex-1">{rec}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
