import { Button } from "@/components/ui/Button"
import { ArrowRight, ExternalLink, Star } from "lucide-react"

export function AutoScoutSection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="text-sm font-medium tracking-widest uppercase text-accent">
              Trasparenza garantita
            </span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight">
              Seguici su AutoScout24
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Consulta il nostro inventario completo, leggi le recensioni verificate dei clienti e scopri le vetture disponibili in tempo reale.
            </p>

            <div className="mt-8 flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="font-semibold text-foreground">4.9/5</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Basato su <span className="font-semibold text-foreground">100+</span> recensioni
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <a
                  href="https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vedi stock su AutoScout24
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border hover:border-accent"
              >
                <a
                  href="https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei/recensioni"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Leggi le recensioni
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Card */}
          <div className="relative">
            <div className="bg-card rounded-sm border border-border p-8 lg:p-10">
              <div className="flex items-center justify-between mb-8">
                <div className="text-2xl font-bold text-foreground">AutoScout24</div>
                <div className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Profilo verificato
                </div>
              </div>

              <div className="flex items-start gap-4 mb-8 pb-8 border-b border-border">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif text-xl font-medium">
                  BA
                </div>
                <div>
                  <div className="font-semibold text-lg text-foreground">Bernabei Automobili</div>
                  <div className="text-sm text-muted-foreground">di Brando Bernabei</div>
                  <div className="text-sm text-muted-foreground">Roma, Italia</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-secondary rounded-sm">
                  <div className="font-serif text-2xl font-light text-accent">97%</div>
                  <div className="text-xs text-muted-foreground mt-1">Positive</div>
                </div>
                <div className="text-center p-4 bg-secondary rounded-sm">
                  <div className="font-serif text-2xl font-light text-foreground">100+</div>
                  <div className="text-xs text-muted-foreground mt-1">Recensioni</div>
                </div>
                <div className="text-center p-4 bg-secondary rounded-sm">
                  <div className="font-serif text-2xl font-light text-foreground">20+</div>
                  <div className="text-xs text-muted-foreground mt-1">Vetture</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-sm -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
