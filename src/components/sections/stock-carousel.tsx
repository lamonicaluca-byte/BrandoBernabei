"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { VehicleCard, type VehicleCardLabels } from "@/components/vehicle-card"
import type { Vettura } from "@/data/vetture"

export interface StockCarouselLabels {
  region: string
  slide: string
  previous: string
  next: string
  seeAll: string
}

interface StockCarouselProps {
  cars: Vettura[]
  lang: string
  cardLabels: VehicleCardLabels
  labels: StockCarouselLabels
  /** Quante auto ci sono in tutto: compare sulla scheda finale */
  totalCount: number
}

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? String(values[k]) : m))

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Fila di schede che si fa scorrere di lato (scroll-snap nativo). Su telefono la scheda successiva è sempre in parte visibile. */
export function StockCarousel({ cars, lang, cardLabels, labels, totalCount }: StockCarouselProps) {
  const track = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const slideCount = cars.length + 1 // l'ultima è "Vedi tutte"

  // inizio e fine della fila: la prima e l'ultima scheda sono interamente visibili (IntersectionObserver)
  useEffect(() => {
    const root = track.current
    if (!root) return
    const first = root.firstElementChild
    const last = root.lastElementChild
    if (!first || !last) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const visible = entry.intersectionRatio >= 0.98
          if (entry.target === first) setAtStart(visible)
          if (entry.target === last) setAtEnd(visible)
        }
      },
      { root, threshold: [0, 0.98, 1] },
    )
    observer.observe(first)
    observer.observe(last)
    return () => observer.disconnect()
  }, [slideCount])

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const root = track.current
    const [a, b] = [root?.children[0] as HTMLElement | undefined, root?.children[1] as HTMLElement | undefined]
    if (!root || !a || !b) return
    root.scrollBy({ left: direction * (b.offsetLeft - a.offsetLeft), behavior: reducedMotion() ? "auto" : "smooth" })
  }, [])

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      scrollByCard(1)
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      scrollByCard(-1)
    }
  }

  const slide =
    "shrink-0 snap-start basis-[85%] sm:basis-[46%] lg:basis-[calc((100%-3rem)/3)]"

  return (
    // min-w-0: la fila è più larga della colonna e non deve allargare la pagina
    <div className="relative min-w-0 max-w-full">
      <div
        ref={track}
        role="region"
        aria-roledescription="carousel"
        aria-label={labels.region}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 md:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cars.map((car, i) => (
          <div
            key={car.id}
            role="group"
            aria-roledescription="slide"
            aria-label={fill(labels.slide, { n: i + 1, total: slideCount })}
            className={`${slide} flex`}
          >
            <div className="w-full">
              <VehicleCard
                car={car}
                lang={lang}
                labels={cardLabels}
                priority={i === 0}
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 46vw, 33vw"
              />
            </div>
          </div>
        ))}

        <div
          role="group"
          aria-roledescription="slide"
          aria-label={fill(labels.slide, { n: slideCount, total: slideCount })}
          className={`${slide} flex`}
        >
          <Link
            href={`/${lang}/vetture`}
            className="group flex w-full flex-col items-center justify-center gap-4 border border-border bg-primary px-6 py-12 text-center text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
          >
            <span className="font-serif text-2xl font-light sm:text-3xl">{fill(labels.seeAll, { n: totalCount })}</span>
            <ArrowRight className="h-6 w-6 transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        aria-label={labels.previous}
        disabled={atStart}
        className="absolute -left-3 top-[calc(50%-2rem)] hidden h-11 w-11 items-center justify-center bg-black/70 text-white transition-opacity duration-200 hover:bg-black/85 disabled:pointer-events-none disabled:opacity-0 md:flex lg:-left-5"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => scrollByCard(1)}
        aria-label={labels.next}
        disabled={atEnd}
        className="absolute -right-3 top-[calc(50%-2rem)] hidden h-11 w-11 items-center justify-center bg-black/70 text-white transition-opacity duration-200 hover:bg-black/85 disabled:pointer-events-none disabled:opacity-0 md:flex lg:-right-5"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}
