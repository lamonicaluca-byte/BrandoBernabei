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

interface HeroDict {
  headline1: string
  headline2: string
  headline3: string
  subtitle: string
  cta1: string
  cta2: string
  proof1Value: string
  proof1Label: string
  proof2Value: string
  proof2Label: string
  proof3Value: string
  proof3Label: string
  scrollLabel: string
}

interface HeroSectionProps {
  dict: HeroDict
  lang: string
}

export function HeroSection({ dict, lang }: HeroSectionProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen lg:min-h-[calc(100vh-60px)] flex items-center overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((url, i) => (
          <div key={url}>
            {/* Mobile: mostra il muso dell'auto */}
            <div
              className="sm:hidden absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-1000"
              style={{
                backgroundImage: `url('${url}')`,
                backgroundPosition: '30% center',
                opacity: i === current ? 1 : 0,
              }}
            />
            {/* Desktop */}
            <div
              className="hidden sm:block absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-1000"
              style={{
                backgroundImage: `url('${url}')`,
                backgroundPosition: 'center center',
                opacity: i === current ? 1 : 0,
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/65 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-12 w-full text-center">

        {/* Headline */}
        <h1
          className="font-serif font-normal"
          style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.15 }}
        >
          <span className="block text-white">{dict.headline1}</span>
          <span className="block italic" style={{ color: '#C9A96E' }}>{dict.headline2}</span>
          <span className="block italic" style={{ color: '#C9A96E', paddingBottom: '0.1em' }}>{dict.headline3}</span>
        </h1>

        {/* Sottotitolo */}
        <p
          className="font-sans font-light mx-auto mt-6 sm:whitespace-nowrap"
          style={{
            fontSize: '15px',
            lineHeight: 1.9,
            color: 'rgba(255,255,255,0.80)',
          }}
        >
          {dict.subtitle}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Button
            asChild
            size="lg"
            className="px-7 py-3 text-sm font-medium text-[#0A0A0A] border-0 w-full sm:w-auto max-w-[280px] uppercase tracking-[.1em]"
            style={{
              background: goldGradient,
              boxShadow: '0 4px 24px rgba(201,169,110,0.35)',
            }}
          >
            <Link href={`/${lang}/vetture`}>
              {dict.cta1}
            </Link>
          </Button>
          {/* Mobile: testo puro */}
          <Link
            href={`/${lang}/recensioni`}
            className="sm:hidden font-sans text-center"
            style={{
              fontSize: '13px',
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.80)',
              padding: '8px 0',
            }}
          >
            {dict.cta2}
          </Link>
          {/* Desktop: outline */}
          <Link
            href={`/${lang}/recensioni`}
            className="hidden sm:inline-flex font-sans font-medium uppercase items-center justify-center hover:bg-white/10 transition-all"
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '12px',
              letterSpacing: '0.1em',
              border: '0.5px solid rgba(255,255,255,0.35)',
              padding: '11px 28px',
            }}
          >
            {dict.cta2}
          </Link>
        </div>

        {/* Proof strip */}
        <div
          className="mt-12 pt-5 flex items-end justify-center gap-6 sm:gap-10"
          style={{ borderTop: '0.5px solid rgba(255,255,255,0.07)' }}
        >
          <div className="text-center">
            <div className="font-serif font-normal text-white text-base sm:text-[20px]">{dict.proof1Value}</div>
            <div className="font-sans uppercase mt-1 text-[9px] sm:text-[10px]" style={{ letterSpacing: '0.1em', color: 'rgba(255,255,255,0.65)' }}>{dict.proof1Label}</div>
          </div>
          <div className="text-center">
            <div className="font-serif font-normal text-white text-base sm:text-[20px]">{dict.proof2Value}</div>
            <div className="font-sans uppercase mt-1 text-[9px] sm:text-[10px]" style={{ letterSpacing: '0.1em', color: 'rgba(255,255,255,0.65)' }}>{dict.proof2Label}</div>
          </div>
          <div className="text-center">
            <div className="font-serif font-normal text-white text-base sm:text-[20px]">{dict.proof3Value}</div>
            <div className="font-sans uppercase mt-1 text-[9px] sm:text-[10px]" style={{ letterSpacing: '0.1em', color: 'rgba(255,255,255,0.65)' }}>{dict.proof3Label}</div>
          </div>
        </div>

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
