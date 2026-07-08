import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/Button"
import { vetture } from "@/data/vetture"
import { Gauge, Settings, Zap, ExternalLink } from "lucide-react"
import { getDictionary, buildMetadata } from "../../i18n"
import type { Locale } from "../layout"
import { VetturesItemListJsonLd } from "@/components/JsonLd"

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return buildMetadata({ title: dict.meta.vetture.title, description: dict.meta.vetture.description, path: '/vetture', lang })
}

export default async function VetturePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const d = dict.vetture

  return (
    <>
      <VetturesItemListJsonLd vetture={vetture} lang={lang} />
      <Header lang={lang} dict={dict} />
      <main className="pt-16 bg-primary">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs tracking-[0.25em] uppercase text-accent/80">
                {d.overline}
              </span>
              <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                {d.title}
              </h1>
              <p className="mt-6 text-xl text-primary-foreground/70 leading-relaxed">
                {d.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12 pb-8 border-b border-border">
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">{vetture.length}</strong> {d.availablePost}
              </span>
              <Button asChild variant="outline" className="border-border hover:border-accent">
                <a
                  href="https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {d.autoscoutCta}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vetture.map((car) => (
                <article
                  key={car.slug}
                  className="group bg-card overflow-hidden border border-border hover:border-accent/40 transition-all duration-500"
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
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div>
                        <h2 className="font-serif text-xl font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                          {car.make} {car.model}
                        </h2>
                        <p className="mt-0.5 text-sm text-muted-foreground">{car.year} · {car.carburante}</p>
                      </div>
                      <p className="font-serif text-xl font-light text-foreground whitespace-nowrap">
                        € {car.prezzo.toLocaleString("it-IT")}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-6 py-4 border-t border-border">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Settings className="h-3.5 w-3.5 shrink-0" />
                        <span>{car.cambio}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Gauge className="h-3.5 w-3.5 shrink-0" />
                        <span>{car.km.toLocaleString("it-IT")} km</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Zap className="h-3.5 w-3.5 shrink-0" />
                        <span>{car.cv} CV</span>
                      </div>
                    </div>

                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Link href={`/${lang}/vetture/${car.slug}`}>
                        {d.discoverCar}
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 p-12 bg-secondary border border-border text-center">
              <h3 className="font-serif text-2xl font-light text-foreground mb-4">
                {d.notFound}
              </h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                {d.notFoundSub}
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
                    {d.autoscoutFull}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-border hover:border-accent"
                >
                  <Link href={`/${lang}/servizi#ricerca`}>{d.customSearch}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  )
}
