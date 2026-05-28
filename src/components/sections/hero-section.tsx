"use client"

import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { useState, useEffect } from "react"

const heroImages = [
  '/911_3.jpg',
  '/911_4.jpg',
  '/911_5.jpg',
  '/911_6.jpg',
]

const goldGradient = 'linear-gradient(135deg, #E8C97A 0%, #C9A96E 45%, #A07840 100%)'
const goldTextStyle = {
  background: goldGradient,
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
}

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
        {/* Eyebrow badge */}
        <div className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#C9A96E]/30 backdrop-blur-sm text-xs tracking-[0.3em] text-[#C9A96E] uppercase w-auto"
            style={{ background: 'rgba(201,169,110,0.08)' }}
          >
            Roma · Auto Premium &amp; Sportive
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-2 font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1]">
          <span className="block text-white">La fiducia</span>
          <span className="block italic" style={{ color: '#C9A96E' }}>è difficile</span>
          <span className="block" style={{ color: 'rgba(255,255,255,0.35)', paddingBottom: '0.15em' }}>da trovare.</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-8 text-sm sm:text-base leading-[1.9] max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
          C&apos;è chi l&apos;ha comprata da Bari senza vederla, pagata in anticipo.
          <br />
          Chi da Torino, da Berlino, senza stringerci la mano.
          <br />
          <span className="font-normal" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Dal 1946, la nostra parola vale più di qualsiasi garanzia scritta.
          </span>
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="px-8 py-6 text-base font-medium text-[#0A0A0A] border-0 w-full sm:w-auto max-w-[320px] uppercase tracking-[.08em]"
            style={{
              background: goldGradient,
              boxShadow: '0 4px 24px rgba(201,169,110,0.35)',
            }}
          >
            <Link href="/vetture">
              Scopri le vetture
            </Link>
          </Button>
          <Link
            href="/recensioni"
            className="text-sm font-light hover:opacity-100 transition-opacity"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Leggi le recensioni →
          </Link>
        </div>

        {/* Proof strip */}
        <div
          className="mt-14 pt-6 border-t flex flex-wrap items-end justify-center gap-10"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <div className="text-center">
            <div className="font-serif text-white font-light" style={{ fontSize: '22px' }}>4.9 ★</div>
            <div className="font-sans uppercase mt-1" style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>Su AutoScout24</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-white font-light" style={{ fontSize: '22px' }}>94</div>
            <div className="font-sans uppercase mt-1" style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>Recensioni verificate</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-white font-light" style={{ fontSize: '22px' }}>Dal 1946</div>
            <div className="font-sans uppercase mt-1" style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>Tre generazioni</div>
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
              i === current ? 'w-4' : 'bg-white/30'
            }`}
            style={i === current ? { background: goldGradient } : {}}
          />
        ))}
      </div>
    </section>
  )
}
