import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ArrowRight, ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/75 via-primary/55 to-primary/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-32 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-white/90 tracking-widest uppercase">
              Roma · Auto Premium &amp; Sportive
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white leading-[1.05]">
            Auto selezionate.
            <br />
            <span className="text-accent italic">Fiducia garantita.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-8 text-lg sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
            Da oltre una semplice compravendita. Ti accompagniamo nella scelta della vettura giusta, con trasparenza e competenza.
          </p>

          {/* CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base font-medium"
            >
              <Link href="/vetture">
                Scopri le vetture disponibili
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white px-8 py-6 text-base font-medium bg-transparent"
            >
              <Link href="/contatti">Parla con Brando</Link>
            </Button>
          </div>

          {/* Trust Stats */}
          <div className="mt-20 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            <div className="text-center">
              <div className="font-serif text-4xl sm:text-5xl font-light text-accent">97%</div>
              <div className="text-sm text-white/55 mt-1 tracking-wide">Recensioni positive</div>
            </div>
            <div className="hidden sm:block w-px h-14 bg-white/20" />
            <div className="text-center">
              <div className="font-serif text-4xl sm:text-5xl font-light text-accent">25+</div>
              <div className="text-sm text-white/55 mt-1 tracking-wide">Anni di esperienza</div>
            </div>
            <div className="hidden sm:block w-px h-14 bg-white/20" />
            <div className="text-center">
              <div className="font-serif text-4xl sm:text-5xl font-light text-accent">500+</div>
              <div className="text-sm text-white/55 mt-1 tracking-wide">Clienti soddisfatti</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/40 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scopri</span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>
    </section>
  )
}
