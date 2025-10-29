import { Card } from "@/components/ui/card"
import { ScanText, Brain, History } from "lucide-react"

const features = [
  {
    icon: ScanText,
    title: "OCR Scanning",
    description: "Advanced optical character recognition extracts text from any medical document with 99.9% accuracy.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "Our AI engine analyzes your reports using the latest medical knowledge and provides clear explanations.",
  },
  {
    icon: History,
    title: "Report History",
    description: "Track your health journey over time with secure cloud storage and easy access to all your reports.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Powerful Features for <span className="text-primary">Better Health Understanding</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Everything you need to take control of your medical information and make informed decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
