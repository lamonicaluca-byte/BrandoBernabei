import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StockExplorer } from "@/components/stock-explorer"
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

export default async function VetturePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const d = dict.vetture

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

            <div className="mt-12">
              {vetture.length === 0 ? (
                <p className="text-muted-foreground">{d.empty}</p>
              ) : (
                <StockExplorer cars={vetture} lang={lang} labels={d} />
              )}
            </div>

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
