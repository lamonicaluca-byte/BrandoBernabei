import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/Button"
import { Calendar, Gauge, Fuel, Settings, ArrowRight, ExternalLink, Filter } from "lucide-react"

export const metadata: Metadata = {
  title: "Vetture Disponibili | Bernabei Automobili",
  description:
    "Scopri la nostra selezione di auto premium e sportive usate a Roma. Porsche, Mercedes, BMW e molto altro. Tutte le vetture sono verificate e garantite.",
}

const cars = [
  {
    id: 1,
    name: "Porsche 911 Carrera S",
    year: 2021,
    price: "€ 125.000",
    mileage: "18.500 km",
    fuel: "Benzina",
    transmission: "PDK",
    power: "450 CV",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
    badge: "In evidenza",
    features: ["Tetto panoramico", "BOSE Sound System", "Sport Chrono"],
  },
  {
    id: 2,
    name: "Mercedes-AMG GT",
    year: 2020,
    price: "€ 98.500",
    mileage: "24.000 km",
    fuel: "Benzina",
    transmission: "Automatico",
    power: "530 CV",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
    badge: "Appena arrivata",
    features: ["AMG Dynamic Plus", "Scarico Performance", "Pacchetto Carbon"],
  },
  {
    id: 3,
    name: "BMW M4 Competition",
    year: 2022,
    price: "€ 89.900",
    mileage: "12.000 km",
    fuel: "Benzina",
    transmission: "Automatico",
    power: "510 CV",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
    badge: null,
    features: ["M Driver's Package", "Cerchi 20\"", "Head-up Display"],
  },
  {
    id: 4,
    name: "Audi RS5 Sportback",
    year: 2021,
    price: "€ 79.500",
    mileage: "28.000 km",
    fuel: "Benzina",
    transmission: "S tronic",
    power: "450 CV",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop",
    badge: null,
    features: ["Matrix LED", "Virtual Cockpit", "Bang & Olufsen"],
  },
  {
    id: 5,
    name: "Porsche Cayenne S",
    year: 2020,
    price: "€ 85.000",
    mileage: "35.000 km",
    fuel: "Benzina",
    transmission: "Tiptronic",
    power: "440 CV",
    image:
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=2070&auto=format&fit=crop",
    badge: "Prezzo ribassato",
    features: ["Sospensioni pneumatiche", "Pacchetto Sport", "21\""],
  },
  {
    id: 6,
    name: "Mercedes-AMG C63 S",
    year: 2019,
    price: "€ 72.000",
    mileage: "42.000 km",
    fuel: "Benzina",
    transmission: "9G-Tronic",
    power: "510 CV",
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070&auto=format&fit=crop",
    badge: null,
    features: ["AMG Track Pace", "Sedili Performance", "Night Package"],
  },
]

export default function VetturePage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-sm font-medium tracking-widest uppercase text-accent">
                La nostra selezione
              </span>
              <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                Vetture disponibili
              </h1>
              <p className="mt-6 text-xl text-primary-foreground/80 leading-relaxed">
                Ogni vettura è accuratamente selezionata, verificata e preparata con cura.
                Qualità garantita senza compromessi.
              </p>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12 pb-8 border-b border-border">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Filter className="h-5 w-5" />
                <span>
                  <strong className="text-foreground">{cars.length}</strong> vetture disponibili
                </span>
              </div>
              <Button asChild variant="outline" className="border-border hover:border-accent">
                <a
                  href="https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stock completo su AutoScout24
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <article
                  key={car.id}
                  className="group bg-card rounded-sm overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-xl"
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
                    <h2 className="font-serif text-xl font-medium text-foreground group-hover:text-accent transition-colors">
                      {car.name}
                    </h2>
                    <p className="mt-1 text-2xl font-semibold text-foreground">{car.price}</p>

                    <div className="grid grid-cols-2 gap-3 mt-6 mb-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{car.year}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Gauge className="h-4 w-4" />
                        <span>{car.mileage}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Fuel className="h-4 w-4" />
                        <span>{car.fuel}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Settings className="h-4 w-4" />
                        <span>{car.power}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {car.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary text-xs text-muted-foreground rounded-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Link href={`/contatti?vettura=${encodeURIComponent(car.name)}`}>
                        Richiedi informazioni
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center p-12 bg-secondary rounded-sm">
              <h3 className="font-serif text-2xl font-light text-foreground mb-4">
                Non trovi quello che cerchi?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Consulta il nostro inventario completo su AutoScout24 oppure contattaci per
                una ricerca personalizzata.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
                  <Link href="/servizi#ricerca">Ricerca personalizzata</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
