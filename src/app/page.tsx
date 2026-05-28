import type { Metadata } from "next"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Bernabei Automobili | Auto Premium Selezionate a Roma",
  description:
    "Selezione esclusiva di auto premium e sportive usate a Roma. Porsche, Ferrari, BMW M, Mercedes-AMG. 97% recensioni positive su AutoScout24. Oltre 500 clienti soddisfatti.",
}
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturedCarsSection } from "@/components/sections/featured-cars-section"
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { MethodSection } from "@/components/sections/method-section"
import { AutoScoutSection } from "@/components/sections/autoscout-section"
import { CTASection } from "@/components/sections/cta-section"
import { BrandStripSection } from "@/components/sections/brand-strip-section"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BrandStripSection />
        <FeaturedCarsSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <MethodSection />
        <AutoScoutSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
