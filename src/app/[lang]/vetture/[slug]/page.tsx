import { notFound } from "next/navigation"
import Link from "next/link"
import { vetture, getVetturaBySlug } from "@/data/vetture"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, MessageCircle, Phone, Gauge, Fuel, Calendar, Settings } from "lucide-react"
import { getDictionary, getAlternates } from "../../../i18n"
import type { Locale } from "../../layout"

interface Props {
  params: Promise<{ lang: Locale; slug: string }>
}

export async function generateStaticParams() {
  const langs = ['it', 'en', 'fr']
  return vetture.flatMap((v) => langs.map((lang) => ({ lang, slug: v.slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const vettura = getVetturaBySlug(slug)
  if (!vettura) return {}
  return {
    title: `${vettura.make} ${vettura.model} ${vettura.year} | Bernabei Automobili`,
    description: vettura.descrizione ?? `${vettura.make} ${vettura.model} ${vettura.year}, ${vettura.km.toLocaleString("it-IT")} km, ${vettura.cv} CV. Disponibile da Bernabei Automobili Roma.`,
    alternates: getAlternates(`/vetture/${slug}`),
  }
}

export default async function VetturaPage({ params }: Props) {
  const { lang, slug } = await params
  const dict = await getDictionary(lang)
  const d = dict.vetture
  const vettura = getVetturaBySlug(slug)
  if (!vettura) notFound()

  const waMessage = encodeURIComponent(
    `Ciao Brando, sono interessato alla ${vettura.make} ${vettura.model} ${vettura.year}. Puoi darmi più informazioni?`
  )

  const specs = [
    { label: d.year, value: vettura.year.toString() },
    { label: d.km, value: `${vettura.km.toLocaleString("it-IT")} km` },
    { label: d.power, value: `${vettura.cv} CV` },
    { label: d.gearbox, value: vettura.cambio },
    { label: d.fuel, value: vettura.carburante },
    ...(vettura.colore ? [{ label: d.color, value: vettura.colore }] : []),
    ...(vettura.cilindrata ? [{ label: d.displacement, value: vettura.cilindrata }] : []),
  ]

  return (
    <>
      <Header lang={lang} dict={dict} />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Link
              href={`/${lang}/vetture`}
              className="inline-flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {d.backToAll}
            </Link>
            <div className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-medium tracking-wide mb-4">
              {vettura.badge}
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">
              {vettura.make} {vettura.model}
            </h1>
            <p className="mt-4 font-serif text-3xl text-accent font-light">
              € {vettura.prezzo.toLocaleString("it-IT")}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Image */}
              <div className="aspect-[4/3] bg-secondary rounded-sm flex items-center justify-center overflow-hidden">
                {vettura.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={vettura.image}
                    alt={`${vettura.make} ${vettura.model} ${vettura.year}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <div className="font-serif text-2xl">{vettura.make}</div>
                    <div className="text-sm mt-1">{vettura.model} {vettura.year}</div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-8">
                {/* Quick specs */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-accent" />
                    <span>{vettura.year}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Gauge className="h-4 w-4 text-accent" />
                    <span>{vettura.km.toLocaleString("it-IT")} km</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Fuel className="h-4 w-4 text-accent" />
                    <span>{vettura.carburante}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Settings className="h-4 w-4 text-accent" />
                    <span>{vettura.cv} CV</span>
                  </div>
                </div>

                {/* Full specs */}
                <div>
                  <h2 className="font-serif text-xl font-medium text-foreground mb-4">
                    {d.specs}
                  </h2>
                  <div className="divide-y divide-border">
                    {specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between py-3 text-sm">
                        <span className="text-muted-foreground">{spec.label}</span>
                        <span className="font-medium text-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {vettura.descrizione && (
                  <div>
                    <h2 className="font-serif text-xl font-medium text-foreground mb-3">
                      {d.description}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {vettura.descrizione}
                    </p>
                  </div>
                )}

                {/* CTAs */}
                <div className="flex flex-col gap-3 pt-4">
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <a
                      href={`https://wa.me/393395027983?text=${waMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      {d.contactWhatsapp}
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-border hover:border-accent">
                    <a href="tel:+393395027983">
                      <Phone className="mr-2 h-5 w-5" />
                      +39 339 502 7983
                    </a>
                  </Button>
                  <Button asChild variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
                    <Link href={`/${lang}/contatti?vettura=${encodeURIComponent(`${vettura.make} ${vettura.model} ${vettura.year}`)}`}>
                      {d.sendMessage}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  )
}
