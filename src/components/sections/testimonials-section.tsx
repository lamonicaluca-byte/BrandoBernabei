"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { Button } from "@/components/ui/Button"

const testimonials = [
  {
    id: 1,
    name: "Marco R.",
    location: "Roma",
    rating: 5,
    text: "Esperienza eccellente dall'inizio alla fine. Brando è una persona estremamente professionale e trasparente. L'auto era esattamente come descritta, senza sorprese. Consiglio vivamente!",
    car: "Porsche 911 Carrera",
    date: "Marzo 2024",
  },
  {
    id: 2,
    name: "Giulia M.",
    location: "Milano",
    rating: 5,
    text: "Ho acquistato la mia Mercedes a distanza, ricevendo assistenza impeccabile durante tutto il processo. La consegna è stata puntuale e l'auto in condizioni perfette. Servizio di alto livello.",
    car: "Mercedes-AMG C63",
    date: "Febbraio 2024",
  },
  {
    id: 3,
    name: "Alessandro P.",
    location: "Firenze",
    rating: 5,
    text: "Finalmente un concessionario serio! Nessuna pressione commerciale, solo competenza e onestà. Brando mi ha aiutato a trovare esattamente l'auto che cercavo al giusto prezzo.",
    car: "BMW M4 Competition",
    date: "Gennaio 2024",
  },
  {
    id: 4,
    name: "Francesca L.",
    location: "Napoli",
    rating: 5,
    text: "Assistenza post-vendita eccezionale. Anche dopo mesi dall'acquisto, Brando è sempre disponibile per qualsiasi domanda. Questo è ciò che fa la differenza.",
    car: "Audi RS5 Sportback",
    date: "Dicembre 2023",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  const current = testimonials[currentIndex]

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium tracking-widest uppercase text-accent">
            Testimonianze
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight">
            Le parole dei nostri clienti
          </h2>
        </div>

        {/* Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-sm border border-border p-8 lg:p-12">
            <Quote className="absolute top-8 left-8 h-12 w-12 text-accent/20" />

            <div className="relative z-10">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              <blockquote className="font-serif text-xl lg:text-2xl text-foreground leading-relaxed font-light italic">
                &ldquo;{current.text}&rdquo;
              </blockquote>

              <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="font-semibold text-foreground">{current.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {current.location} · {current.car}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{current.date}</div>
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
              <span className="sr-only">Precedente</span>
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
                  <span className="sr-only">Vai alla recensione {index + 1}</span>
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
              <span className="sr-only">Successivo</span>
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
            <span>Leggi tutte le recensioni su</span>
            <span className="font-semibold">AutoScout24</span>
            <span className="text-accent font-semibold">97% positive</span>
          </a>
        </div>
      </div>
    </section>
  )
}
