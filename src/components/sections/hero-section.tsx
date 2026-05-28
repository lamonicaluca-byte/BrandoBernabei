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
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-12 w-full text-center">

        {/* Badge overline */}
        <div className="flex justify-center mb-7">
          <span
            className="font-sans uppercase"
            style={{
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: '#C9A96E',
              border: '0.5px solid rgba(192,160,96,0.4)',
              padding: '5px 14px',
            }}
          >
            VIA FLAMINIA 318 · ROMA · DAL 1946
          </span>
        </div>

        {/* Headline — 4 righe */}
        <h1
          className="font-serif font-normal"
          style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.15 }}
        >
          <span className="block text-white">Dal 1946, scegliamo</span>
          <span className="block italic" style={{ color: '#C9A96E' }}>ogni auto come</span>
          <span className="block italic" style={{ color: '#C9A96E', paddingBottom: '0.1em' }}>fosse la nostra.</span>
        </h1>

        {/* Sottotitolo */}
        <p
          className="font-sans font-light mx-auto mt-6"
          style={{
            fontSize: '15px',
            lineHeight: 1.9,
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '520px',
          }}
        >
          Chi entra da Bernabei non cerca solo un&apos;auto, cerca qualcuno di cui fidarsi.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/vetture"
            className="inline-block font-sans font-medium uppercase hover:opacity-85 transition-opacity"
            style={{
              background: '#C9A96E',
              color: '#0d0d0d',
              padding: '13px 32px',
              fontSize: '11px',
              letterSpacing: '0.15em',
            }}
          >
            Scopri le vetture
          </Link>
          <Link
            href="/recensioni"
            className="font-sans hover:opacity-70 transition-opacity"
            style={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: '12px',
              letterSpacing: '0.08em',
            }}
          >
            Leggi le recensioni →
          </Link>
        </div>

        {/* Proof strip */}
        <div
          className="mt-12 pt-5 flex flex-wrap items-end justify-center gap-10"
          style={{ borderTop: '0.5px solid rgba(255,255,255,0.07)' }}
        >
          <div className="text-center">
            <div className="font-serif font-normal text-white" style={{ fontSize: '20px' }}>4.9 ★</div>
            <div className="font-sans uppercase mt-1" style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.28)' }}>AutoScout24</div>
          </div>
          <div className="text-center">
            <div className="font-serif font-normal text-white" style={{ fontSize: '20px' }}>94</div>
            <div className="font-sans uppercase mt-1" style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.28)' }}>Recensioni</div>
          </div>
          <div className="text-center">
            <div className="font-serif font-normal text-white" style={{ fontSize: '20px' }}>Dal 1946</div>
            <div className="font-sans uppercase mt-1" style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.28)' }}>Tre generazioni</div>
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
