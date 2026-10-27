import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/Button"
import { getVendute } from "@/data/vendute"
import { getDictionary, buildMetadata } from "../../i18n"
import type { Locale } from "../layout"

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return buildMetadata({ title: dict.meta.vendute.title, description: dict.meta.vendute.description, path: '/vendute', lang })
}

const LOCALE_TAG: Record<Locale, string> = { it: 'it-IT', en: 'en-GB', fr: 'fr-FR' }

export default async function VendutePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const d = dict.vendute
  const cars = getVendute()
  const monthFmt = new Intl.DateTimeFormat(LOCALE_TAG[lang], { month: 'long', year: 'numeric' })

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

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => {
                const [y, m] = car.soldAt.split('-').map(Number)
                const soldLabel = monthFmt.format(new Date(y, m - 1, 1))
                return (
                  <article key={`${car.make}-${car.model}-${car.soldAt}`} className="bg-card border border-border overflow-hidden">
                    <div className="relative aspect-[4/3] bg-secondary">
                      <Image
                        src={car.image}
                        alt={`${car.make} ${car.model} ${car.year}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium tracking-wide uppercase">
                        {d.soldBadge}
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="font-serif text-xl font-medium text-foreground">
                        {car.make} {car.model}
                      </h2>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {car.year} · {car.km.toLocaleString(LOCALE_TAG[lang])} km
                      </p>
                      <p className="mt-5 pt-5 border-t border-border text-xs text-muted-foreground">
                        {d.soldOn} {soldLabel}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="mt-20 text-center">
              <h2 className="font-serif text-3xl font-light text-foreground">{d.ctaTitle}</h2>
              <p className="mt-4 text-muted-foreground">{d.ctaText}</p>
              <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href={`/${lang}/contatti`}>{d.ctaButton}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  )
}
