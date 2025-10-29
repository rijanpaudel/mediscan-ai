import { Card } from "@/components/ui/card"
import { Upload, Sparkles, FileCheck } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload",
    description: "Simply upload your medical report in any format - PDF, image, or scan.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Analyzes",
    description: "Our advanced AI processes your report and extracts key medical information.",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Get Results",
    description: "Receive clear, easy-to-understand explanations and actionable insights instantly.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">How It Works</h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Get insights from your medical reports in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
                <Card className="p-8 text-center relative bg-card hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-xl font-bold mb-6">
                    {step.number}
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10 mx-auto mb-4">
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
