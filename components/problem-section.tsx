import { Card } from "@/components/ui/card"

const statistics = [
  {
    value: "73%",
    label: "of patients struggle to understand medical reports",
    source: "Healthcare Literacy Study 2023",
  },
  {
    value: "2.4 weeks",
    label: "average wait time for doctor follow-up appointments",
    source: "Medical Access Report 2024",
  },
  {
    value: "68%",
    label: "of medical errors stem from miscommunication",
    source: "Patient Safety Foundation",
  },
  {
    value: "$4.1B",
    label: "annual cost of healthcare miscommunication",
    source: "Healthcare Economics Journal",
  },
]

export function ProblemSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Healthcare Accessibility Is a <span className="text-primary">Growing Challenge</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Millions struggle to understand their medical reports, leading to delayed care and increased anxiety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-3">{stat.value}</div>
              <p className="text-sm font-medium text-foreground mb-2 text-balance">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.source}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
