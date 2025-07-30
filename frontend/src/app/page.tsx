import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero"
import { ServicesSection } from "@/components/sections/services"
import { SocialProofSection } from "@/components/sections/social-proof"
import { CaseStudyPreviewSection } from "@/components/case-study-preview"
import { TestimonialsSection } from "@/components/testimonials"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <CaseStudyPreviewSection />
        <TestimonialsSection />
        <SocialProofSection />
      </main>
      <Footer />
    </div>
  )
}
