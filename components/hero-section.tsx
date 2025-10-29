import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="container mx-auto relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            AI-Powered Medical Analysis
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
            Understand Your Medical Reports <span className="text-primary">Instantly</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
            Transform complex medical reports into clear, actionable insights with advanced AI technology. Get instant
            analysis and personalized explanations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-base px-8">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 bg-transparent">
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">No credit card required • Free 14-day trial</p>
        </div>
      </div>
    </section>
  )
}
