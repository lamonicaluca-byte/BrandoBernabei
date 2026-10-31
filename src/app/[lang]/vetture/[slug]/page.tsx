import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, MessageCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/Button"
import { VehicleGallery } from "@/components/vehicle-gallery"
import { VehicleJsonLd } from "@/components/JsonLd"
import { getVettura, vetture } from "@/data/vetture"
import { getDictionary, buildMetadata } from "../../../i18n"
import type { Locale } from "../../layout"

const LOCALE_TAG: Record<Locale, string> = { it: "it-IT", en: "en-GB", fr: "fr-FR" }
const LOCALES: Locale[] = ["it", "en", "fr"]

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => vetture.map((v) => ({ lang, slug: v.id })))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const car = getVettura(slug)
  if (!car) return {}
  const dict = await getDictionary(lang)
  const price = new Intl.NumberFormat(LOCALE_TAG[lang]).format(car.price)
  const base = buildMetadata({
    title: `${car.make} ${car.model} ${car.year}`,
    description: `${car.make} ${car.model} ${car.version}, ${car.year}, ${new Intl.NumberFormat(LOCALE_TAG[lang]).format(car.km)} km, € ${price}. ${dict.vetture.metaSuffix}`,
    path: `/vetture/${slug}`,
    lang,
    ogImage: car.images[0] ? `https://www.bernabeiautomobili.com${car.images[0]}` : undefined,
  })
  return base
}

export default async function VetturaPage({ params }: { params: Promise<{ lang: Locale; slug: string }> }) {
  const { lang, slug } = await params
  const car = getVettura(slug)
  if (!car) notFound()
  const dict = await getDictionary(lang)
  const d = dict.vetture
  const fmt = new Intl.NumberFormat(LOCALE_TAG[lang])
  const tr = (map: Record<string, string>, key?: string) => (key ? map[key] ?? key : "")

  const specs: Array<[string, string]> = [
    [d.year, car.registration || String(car.year)],
    [d.km, `${fmt.format(car.km)} km`],
    [d.power, `${car.cv} CV`],
    [d.fuel, tr(d.fuels, car.fuel)],
    [d.gearbox, tr(d.gearboxes, car.gearbox)],
    [d.color, tr(d.colors, car.color)],
    [d.bodyType, tr(d.bodyTypes, car.bodyType)],
    [d.driveTrain, tr(d.driveTrains, car.driveTrain)],
  ].filter((s): s is [string, string] => Boolean(s[1]))

  const title = `${car.make} ${car.model}`
  const whatsapp = `https://wa.me/393395027983?text=${encodeURIComponent(
    d.whatsappMessage.replace("{car}", `${title} ${car.year}`),
  )}`

  return (
    <>
      <VehicleJsonLd
        lang={lang}
        vettura={{
          make: car.make,
          model: car.model,
          year: car.year,
          km: car.km,
          cv: car.cv,
          carburante: car.fuel,
          cambio: car.gearbox,
          prezzo: car.price,
          colore: car.color,
          slug: car.id,
          image: car.images[0],
        }}
      />
      <Header lang={lang} dict={dict} />
      <main className="pt-16 bg-background">
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Link
              href={`/${lang}/vetture`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {d.backToAll}
            </Link>

            <div className="mt-8 grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-14">
              <VehicleGallery
                images={car.images}
                alt={`${title} ${car.year}`}
                labels={{ previous: d.previousPhoto, next: d.nextPhoto, photo: d.photo }}
              />

              <div>
                <span className="text-xs tracking-[0.25em] uppercase text-gold-brand">{car.make}</span>
                <h1 className="mt-2 font-serif text-4xl lg:text-5xl font-light text-foreground tracking-tight">
                  {car.model}
                </h1>
                {car.version && <p className="mt-2 text-muted-foreground">{car.version}</p>}
                <p className="mt-6 font-serif text-4xl font-light text-foreground">€ {fmt.format(car.price)}</p>

                <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
                  {specs.map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4 py-3">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="text-foreground text-right">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex flex-col gap-3">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {d.contactWhatsapp}
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-border hover:border-accent">
                    <Link href={`/${lang}/contatti`}>{d.sendMessage}</Link>
                  </Button>
                  {car.autoscoutUrl && (
                    <a
                      href={car.autoscoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 pt-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {d.viewOnAutoscout}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {car.description && (
              <div className="mt-16 max-w-3xl">
                <h2 className="font-serif text-2xl font-light text-foreground">{d.description}</h2>
                {lang !== "it" && <p className="mt-2 text-xs text-muted-foreground">{d.descriptionNote}</p>}
                <p className="mt-5 whitespace-pre-line leading-relaxed text-foreground/80">{car.description}</p>
              </div>
            )}

            {car.equipment && car.equipment.length > 0 && (
              <details className="mt-12 max-w-3xl border-t border-border pt-6 group">
                <summary className="cursor-pointer font-serif text-2xl font-light text-foreground list-none flex items-center justify-between">
                  {d.equipment}
                  <span className="text-sm text-muted-foreground group-open:hidden">{d.show}</span>
                  <span className="text-sm text-muted-foreground hidden group-open:inline">{d.hide}</span>
                </summary>
                <ul className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-foreground/80">
                  {car.equipment.map((e) => (
                    <li key={e} className="border-b border-border/60 pb-2">{e}</li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  )
}
