import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ROICalculator } from "@/components/roi-calculator"

export default function ROICalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Calculate Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                AI ROI
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover how much your business could save with our 30-day AI implementation.
              Get personalized projections based on your industry and company size.
            </p>
          </div>
          <ROICalculator />
        </div>
      </main>
      <Footer />
    </div>
  )
}