"use client"

import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

const heroImages = [
  'https://images.unsplash.com/photo-1756990637536-714b76296a30?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1762873493699-8c0cfe03656e?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1773136666162-a459e44b5d8c?q=80&w=2070&auto=format&fit=crop',
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((url, i) => (
          <div
            key={url}
            className="absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${url}')`,
              backgroundPosition: 'center center',
              opacity: i === current ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/65 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-32 w-full text-center">
        {/* Eyebrow */}
        <span className="text-xs tracking-[0.3em] text-accent/80 uppercase">
          Roma · Auto Premium &amp; Sportive
        </span>

        {/* Headline */}
        <h1 className="mt-6 font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white leading-[1.05]">
          Auto selezionate.
          <br />
          <em className="not-italic text-accent">Fiducia garantita.</em>
        </h1>

        {/* Subheadline */}
        <p className="mt-8 text-lg sm:text-xl text-white/70 max-w-xl mx-auto leading-relaxed">
          Trovare l&apos;auto giusta è una cosa. Trovare qualcuno di cui fidarsi per farlo è un&apos;altra.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 text-base font-medium"
          >
            <Link href="/vetture">
              Scopri le vetture disponibili
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Link
            href="/contatti"
            className="text-sm text-white font-normal opacity-70 hover:opacity-100 hover:underline underline-offset-4 transition-all"
          >
            Contattaci
          </Link>
        </div>

        {/* Trust Stats */}
        <div className="mt-24 flex flex-wrap items-center justify-center gap-10 sm:gap-16">
          <div>
            <div className="font-serif text-3xl font-light text-accent">97%</div>
            <div className="text-[11px] text-white/45 mt-1 tracking-[0.15em] uppercase">Recensioni positive</div>
          </div>
          <div className="w-px h-10 bg-white/15 hidden sm:block" />
          <div>
            <div className="font-serif text-3xl font-light text-accent">25+</div>
            <div className="text-[11px] text-white/45 mt-1 tracking-[0.15em] uppercase">Anni di esperienza</div>
          </div>
          <div className="w-px h-10 bg-white/15 hidden sm:block" />
          <div>
            <div className="font-serif text-3xl font-light text-accent">500+</div>
            <div className="text-[11px] text-white/45 mt-1 tracking-[0.15em] uppercase">Clienti soddisfatti</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-[9px] tracking-[0.25em] text-white/30 uppercase">Scorri</span>
        <div className="w-px h-14 bg-gradient-to-b from-white/30 to-transparent" />
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-10 right-8 z-10 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-accent w-4' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
