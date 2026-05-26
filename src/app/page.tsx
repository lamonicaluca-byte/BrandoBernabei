import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturedCarsSection } from "@/components/sections/featured-cars-section"
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { MethodSection } from "@/components/sections/method-section"
import { AutoScoutSection } from "@/components/sections/autoscout-section"
import { CTASection } from "@/components/sections/cta-section"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
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
