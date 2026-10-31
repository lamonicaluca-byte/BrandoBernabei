import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Check, ExternalLink, MessageCircle, Phone } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/Button"
import { VehicleGallery } from "@/components/vehicle-gallery"
import { VehicleJsonLd } from "@/components/JsonLd"
import { getVettura, vetture } from "@/data/vetture"
import { displayVersion, fullTitle } from "@/lib/vehicle"
import { getDictionary, buildMetadata } from "../../../i18n"
import type { Locale } from "../../layout"

const LOCALE_TAG: Record<Locale, string> = { it: "it-IT", en: "en-GB", fr: "fr-FR" }
const LOCALES: Locale[] = ["it", "en", "fr"]
const goldGradient = "linear-gradient(135deg, #E8C97A 0%, #C9A96E 45%, #A07840 100%)"

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => vetture.map((v) => ({ lang, slug: v.id })))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const car = getVettura(slug)
  if (!car) return {}
  const dict = await getDictionary(lang)
  const fmt = new Intl.NumberFormat(LOCALE_TAG[lang])
  return buildMetadata({
    title: fullTitle(car),
    description: `${fullTitle(car)}, ${fmt.format(car.km)} km, ${car.cv} CV, € ${fmt.format(car.price)}. ${dict.vetture.metaSuffix}`,
    path: `/vetture/${slug}`,
    lang,
    ogImage: car.images[0] ? `https://www.bernabeiautomobili.com${car.images[0]}` : undefined,
  })
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
  const version = displayVersion(car)
  const whatsapp = `https://wa.me/393395027983?text=${encodeURIComponent(
    d.whatsappMessage.replace("{car}", `${title} ${car.year}`),
  )}`
  const bookHref = `/${lang}/contatti?visita=1&auto=${encodeURIComponent(car.id)}`

  const included = [
    [d.includedWarranty, d.includedWarrantyText],
    [d.includedDelivery, d.includedDeliveryText],
    [d.includedTradeIn, d.includedTradeInText],
  ]

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
                {version && <p className="mt-2 text-muted-foreground">{version}</p>}
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
                  <Button asChild size="lg" className="border-0 text-[#0A0A0A] font-medium" style={{ background: goldGradient }}>
                    <Link href={bookHref}>{d.bookVisit}</Link>
                  </Button>
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {d.contactWhatsapp}
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-border hover:border-accent">
                    <a href="tel:+393395027983">
                      <Phone className="mr-2 h-4 w-4" />
                      {d.call} +39 339 502 7983
                    </a>
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

                <div className="mt-8 border border-border bg-card p-5">
                  <h2 className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{d.includedTitle}</h2>
                  <ul className="mt-4 space-y-3 text-sm">
                    {included.map(([name, text]) => (
                      <li key={name} className="flex gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-brand" aria-hidden="true" />
                        <span>
                          <span className="text-foreground">{name}.</span>{" "}
                          <span className="text-muted-foreground">{text}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${lang}/servizi`} className="mt-4 inline-block text-sm text-gold-brand underline underline-offset-4">
                    {d.includedLink}
                  </Link>
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
              <details open className="mt-12 max-w-3xl border-t border-border pt-6 group">
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
