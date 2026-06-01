import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { Gauge, Settings } from "lucide-react"
import { getEvidenzaVetture } from "@/data/vetture"

interface FeaturedCarsDict {
  overline: string
  title: string
  viewAll: string
  discover: string
  autoscoutCta: string
  available: string
  reserved: string
}

interface FeaturedCarsSectionProps {
  dict: FeaturedCarsDict
  lang: string
}

export function FeaturedCarsSection({ dict, lang }: FeaturedCarsSectionProps) {
  const cars = getEvidenzaVetture()

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-accent/80">
              {dict.overline}
            </span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight">
              {dict.title}
            </h2>
          </div>
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground self-start sm:self-auto shrink-0">
            <Link href={`/${lang}/vetture`}>
              {dict.viewAll}
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <Link
              key={car.slug}
              href={`/${lang}/vetture/${car.slug}`}
              className="group block bg-card overflow-hidden border border-border hover:border-accent/40 transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                {car.image ? (
                  <Image
                    src={car.image}
                    alt={`${car.make} ${car.model} ${car.year}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-3xl text-muted-foreground/30">{car.make}</span>
                  </div>
                )}
                {car.badge && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium tracking-wide">
                    {car.badge}
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                      {car.make} {car.model}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{car.year} · {car.carburante}</p>
                    <span className={`inline-block mt-1.5 text-[10px] font-medium px-2 py-0.5 border ${
                      car.disponibile === false
                        ? 'border-border text-muted-foreground/50 bg-secondary'
                        : 'border-emerald-800/40 text-emerald-500 bg-emerald-950/30'
                    }`}>
                      {car.disponibile === false ? dict.reserved : dict.available}
                    </span>
                  </div>
                  <p className="font-serif text-xl font-light text-foreground whitespace-nowrap">
                    € {car.prezzo.toLocaleString("it-IT")}
                  </p>
                </div>

                <div className="mt-5 pt-5 border-t border-border flex items-center gap-5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Settings className="h-3.5 w-3.5" />
                    <span>{car.cambio}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Gauge className="h-3.5 w-3.5" />
                    <span>{car.km.toLocaleString("it-IT")} km</span>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-accent text-xs font-medium">
                    <span>{dict.discover}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* AutoScout CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-border hover:border-accent/50 transition-colors duration-300"
          >
            <span className="text-sm text-muted-foreground">{dict.autoscoutCta}</span>
            <span className="font-semibold text-foreground">AutoScout24</span>
          </a>
        </div>
      </div>
    </section>
  )
}
