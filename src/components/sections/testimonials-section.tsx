"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { Button } from "@/components/ui/Button"

const testimonials = [
  {
    id: 1,
    name: "Adriano",
    location: "Bari",
    rating: 5,
    text: "Ho acquistato a distanza, pagata anticipatamente e consegnata a domicilio a Bari. L'auto era meglio di quanto descritta. Oggi la fiducia è difficile da trovare, ma loro ne hanno da vendere.",
    car: "",
    date: "",
  },
  {
    id: 2,
    name: "Giorgio",
    location: "Torino",
    rating: 5,
    text: "Ho acquistato una Porsche 997 da Torino in totale serenità. Brando ha gestito ogni mia richiesta con video e perizia meccanica indipendente. Ne sono felicissimo.",
    car: "Porsche 997",
    date: "",
  },
  {
    id: 3,
    name: "Alessandra",
    location: "Roma",
    rating: 5,
    text: "Prima di essere venditori di auto sono persone. Qualità rarissima in questo settore.",
    car: "",
    date: "",
  },
  {
    id: 4,
    name: "Prof. Dr. A.K.",
    location: "Germania",
    rating: 5,
    text: "Ein besonders vertrauenswürdiger Händler, ein junges Team der alten Schule, das die Leidenschaft spürt.",
    car: "",
    date: "",
  },
]

interface TestimonialsDict {
  overline: string
  title: string
  autoscoutLink: string
  autoscoutPositive: string
  prevLabel: string
  nextLabel: string
  goToReview: string
}

export function TestimonialsSection({ dict }: { dict: TestimonialsDict }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  const current = testimonials[currentIndex]

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium tracking-widest uppercase text-gold-brand">
            {dict.overline}
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight">
            {dict.title}
          </h2>
        </div>

        {/* Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-sm border border-border p-8 lg:p-12">
            <Quote className="absolute top-8 left-8 h-12 w-12 text-accent/20" />

            <div className="relative z-10">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold-brand text-gold-brand" />
                ))}
              </div>

              <blockquote className="font-serif text-xl lg:text-2xl text-foreground leading-relaxed font-light italic">
                &ldquo;{current.text}&rdquo;
              </blockquote>

              <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="font-semibold text-foreground">{current.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {[current.location, current.car].filter(Boolean).join(' · ')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="border-border hover:border-accent hover:bg-accent/10"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">{dict.prevLabel}</span>
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? "w-8 bg-accent" : "w-2 bg-border hover:bg-muted-foreground"
                  }`}
                >
                  <span className="sr-only">{dict.goToReview} {index + 1}</span>
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="border-border hover:border-accent hover:bg-accent/10"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">{dict.nextLabel}</span>
            </Button>
          </div>
        </div>

        {/* AutoScout link */}
        <div className="mt-12 text-center">
          <a
            href="https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei/recensioni"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>{dict.autoscoutLink}</span>
            <span className="font-semibold">AutoScout24</span>
            <span className="text-accent font-semibold">{dict.autoscoutPositive}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
