"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const chartData = [
  {
    name: "Hemoglobin",
    value: 13.2,
    normalMin: 13.5,
    normalMax: 17.5,
  },
  {
    name: "WBC",
    value: 11.5,
    normalMin: 4.0,
    normalMax: 11.0,
  },
  {
    name: "Platelets",
    value: 180,
    normalMin: 150,
    normalMax: 400,
  },
  {
    name: "Glucose",
    value: 126,
    normalMin: 70,
    normalMax: 100,
  },
]

export function LabValuesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Values Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius-md)",
              }}
            />
            <Legend />
            <Bar dataKey="value" fill="hsl(var(--primary))" name="Your Value" radius={[4, 4, 0, 0]} />
            <Bar dataKey="normalMin" fill="hsl(var(--secondary))" name="Normal Min" radius={[4, 4, 0, 0]} />
            <Bar dataKey="normalMax" fill="hsl(var(--secondary))" name="Normal Max" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
