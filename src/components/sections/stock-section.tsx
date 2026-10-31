import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"
import type { VehicleCardLabels } from "@/components/vehicle-card"
import { StockCarousel } from "@/components/sections/stock-carousel"
import { vetture } from "@/data/vetture"

/** Quante schede mostrare in homepage: sono le prime dell'ordine scelto in /gestione/disponibili. */
const HOME_COUNT = 6

interface StockDict {
  overline: string
  title: string
  subtitle: string
  cta: string
  contactPrompt: string
  contactLink: string
  carouselLabel: string
  slide: string
  previous: string
  next: string
  seeAll: string
}

interface StockSectionProps {
  dict: StockDict
  cardLabels: VehicleCardLabels
  lang: string
}

export function StockSection({ dict, cardLabels, lang }: StockSectionProps) {
  const cars = vetture.slice(0, HOME_COUNT)

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs tracking-[0.25em] uppercase text-gold-brand">{dict.overline}</span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight">
            {dict.title}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{dict.subtitle}</p>
        </div>

        {cars.length > 0 && (
          <div className="mt-16">
            <StockCarousel
              cars={cars}
              lang={lang}
              cardLabels={cardLabels}
              totalCount={vetture.length}
              labels={{ region: dict.carouselLabel, slide: dict.slide, previous: dict.previous, next: dict.next, seeAll: dict.seeAll }}
            />
          </div>
        )}

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href={`/${lang}/vetture`}>
              {dict.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-6 text-sm text-muted-foreground">
            {dict.contactPrompt}{" "}
            <Link href={`/${lang}/contatti`} className="text-foreground underline underline-offset-4 hover:text-accent transition-colors">
              {dict.contactLink}
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
