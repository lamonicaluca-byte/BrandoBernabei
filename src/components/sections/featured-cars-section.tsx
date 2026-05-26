import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { ArrowRight, Fuel, Gauge, Calendar } from "lucide-react"

const featuredCars = [
  {
    id: 1,
    name: "Porsche 911 Carrera S",
    year: 2021,
    price: "€ 125.000",
    mileage: "18.500 km",
    fuel: "Benzina",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
    badge: "In evidenza",
  },
  {
    id: 2,
    name: "Mercedes-AMG GT",
    year: 2020,
    price: "€ 98.500",
    mileage: "24.000 km",
    fuel: "Benzina",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
    badge: "Appena arrivata",
  },
  {
    id: 3,
    name: "BMW M4 Competition",
    year: 2022,
    price: "€ 89.900",
    mileage: "12.000 km",
    fuel: "Benzina",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
    badge: null,
  },
]

export function FeaturedCarsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <span className="text-sm font-medium tracking-widest uppercase text-accent">
              Selezione esclusiva
            </span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight">
              Le vetture in evidenza
            </h2>
          </div>
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground self-start sm:self-auto">
            <Link href="/vetture">
              Vedi tutte le vetture
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <Link
              key={car.id}
              href={`/contatti?vettura=${encodeURIComponent(car.name)}`}
              className="group block bg-card rounded-sm overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {car.badge && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium tracking-wide">
                    {car.badge}
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-accent transition-colors">
                  {car.name}
                </h3>
                <p className="mt-1 text-2xl font-semibold text-foreground">
                  {car.price}
                </p>

                <div className="mt-6 pt-6 border-t border-border flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4" />
                    <span>{car.mileage}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4" />
                    <span>{car.fuel}</span>
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
            className="inline-flex items-center gap-3 px-8 py-4 bg-secondary hover:bg-secondary/80 rounded-sm transition-colors"
          >
            <span className="text-sm text-muted-foreground">Stock completo disponibile su</span>
            <span className="font-semibold text-foreground">AutoScout24</span>
            <ArrowRight className="h-4 w-4 text-accent" />
          </a>
        </div>
      </div>
    </section>
  )
}
