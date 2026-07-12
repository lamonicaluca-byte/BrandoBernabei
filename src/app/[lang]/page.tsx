import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturedCarsSection } from "@/components/sections/featured-cars-section"
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { MethodSection } from "@/components/sections/method-section"
import { AutoScoutSection } from "@/components/sections/autoscout-section"
import { CTASection } from "@/components/sections/cta-section"
import { BrandStripSection } from "@/components/sections/brand-strip-section"
import { getDictionary, buildMetadata } from "../i18n"
import type { Locale } from "./layout"

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return buildMetadata({ title: dict.meta.home.title, description: dict.meta.home.description, path: '', lang })
}

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return (
    <>
      <Header lang={lang} dict={dict} />
      <main>
        <HeroSection dict={dict.hero} lang={lang} />
        <BrandStripSection dict={dict.brandStrip} />
        <FeaturedCarsSection dict={dict.featuredCars} carData={dict.carData} lang={lang} />
        <WhyChooseUsSection dict={dict.whyChooseUs} />
        <TestimonialsSection dict={dict.testimonials} />
        <MethodSection dict={dict.method} />
        <AutoScoutSection dict={dict.autoscout} />
        <CTASection dict={dict.cta} lang={lang} />
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  )
}
