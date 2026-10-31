import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Gauge, Settings } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/Button"
import { vetture } from "@/data/vetture"
import { AUTOSCOUT_URL } from "@/lib/links"
import { getDictionary, buildMetadata } from "../../i18n"
import type { Locale } from "../layout"

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return buildMetadata({ title: dict.meta.vetture.title, description: dict.meta.vetture.description, path: "/vetture", lang })
}

const LOCALE_TAG: Record<Locale, string> = { it: "it-IT", en: "en-GB", fr: "fr-FR" }

export default async function VetturePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const d = dict.vetture
  const fmt = new Intl.NumberFormat(LOCALE_TAG[lang])
  const tr = (map: Record<string, string>, key: string) => map[key] ?? key

  return (
    <>
      <Header lang={lang} dict={dict} />
      <main className="pt-16 bg-background">
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs tracking-[0.25em] uppercase text-gold-brand">{d.overline}</span>
              <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight">
                {d.title}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{d.subtitle}</p>
            </div>

            {vetture.length === 0 ? (
              <p className="mt-16 text-muted-foreground">{d.empty}</p>
            ) : (
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vetture.map((car, i) => (
                  <Link
                    key={car.id}
                    href={`/${lang}/vetture/${car.id}`}
                    className="group block bg-card border border-border overflow-hidden hover:border-accent/40 transition-colors duration-500"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                      {car.images[0] && (
                        <Image
                          src={car.images[0]}
                          alt={`${car.make} ${car.model} ${car.year}`}
                          fill
                          priority={i < 3}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h2 className="font-serif text-xl font-medium text-foreground group-hover:text-accent transition-colors">
                            {car.make} {car.model}
                          </h2>
                          <p className="mt-0.5 text-sm text-muted-foreground">
                            {car.year} · {tr(d.fuels, car.fuel)} · {car.cv} CV
                          </p>
                        </div>
                        <p className="font-serif text-xl font-light text-foreground whitespace-nowrap">
                          € {fmt.format(car.price)}
                        </p>
                      </div>
                      <div className="mt-5 pt-5 border-t border-border flex items-center gap-5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Settings className="h-3.5 w-3.5" />
                          {tr(d.gearboxes, car.gearbox)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Gauge className="h-3.5 w-3.5" />
                          {fmt.format(car.km)} km
                        </span>
                        <span className="ml-auto text-accent font-medium">{d.discover}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-20 text-center">
              <h2 className="font-serif text-3xl font-light text-foreground">{d.notFound}</h2>
              <p className="mt-4 mx-auto max-w-xl text-muted-foreground">{d.notFoundSub}</p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href={`/${lang}/contatti`}>{d.customSearch}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-border hover:border-accent">
                  <a href={AUTOSCOUT_URL} target="_blank" rel="noopener noreferrer">{d.autoscoutLink}</a>
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
