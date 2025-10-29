import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl p-12 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 text-balance">
              Ready to Understand Your Health Better?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
              Join thousands of users who are taking control of their medical
              information with MediScan AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base px-8">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base px-8 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/80 mt-6">
              Start your free trial today • No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
