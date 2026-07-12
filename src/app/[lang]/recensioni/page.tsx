import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/Button"
import { ExternalLink } from "lucide-react"
import { RecensioniJsonLd } from "@/components/JsonLd"
import { getDictionary, buildMetadata } from "../../i18n"
import type { Locale } from "../layout"

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return buildMetadata({ title: dict.meta.recensioni.title, description: dict.meta.recensioni.description, path: '/recensioni', lang })
}

const AUTOSCOUT_URL =
  "https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei/recensioni"

const statsValues = [
  { value: "4.9", stars: true, key: "stat1Label" as const },
  { value: "94", stars: false, key: "stat2Label" as const },
  { value: "97%", stars: false, key: "stat3Label" as const },
]

const featuredReview = {
  text: "Ho acquistato a distanza, pagata anticipatamente e consegnata a domicilio a Bari. L'auto era meglio di quanto descritta. Oggi la fiducia è difficile da trovare, ma loro ne hanno da vendere.",
  author: "ADRIANO · BARI",
}

const reviews = [
  {
    text: "Prima di essere venditori di auto sono persone. Qualità rarissima in questo settore.",
    author: "ALESSANDRA · ROMA",
  },
  {
    text: "Un appassionato di auto prima ancora di essere un venditore. Non il solito commerciante.",
    author: "MATTEO CAROLI",
  },
  {
    text: "Ho acquistato una Porsche 997 da Torino in totale serenità. Brando ha gestito ogni mia richiesta con video e perizia meccanica indipendente. Ne sono felicissimo.",
    author: "GIORGIO · TORINO",
  },
  {
    text: "Ein besonders vertrauenswürdiger Händler, ein junges Team der alten Schule, das die Leidenschaft spürt.",
    author: "PROF. DR. A.K. · GERMANIA",
  },
]

export default async function RecensioniPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const d = dict.recensioni

  return (
    <>
      <RecensioniJsonLd />
      <Header lang={lang} dict={dict} />
      <main className="pt-16 bg-primary">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-sm font-medium tracking-widest uppercase text-gold-highlight">
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

        {/* Stats + Reviews */}
        <section className="pb-24 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            {/* Stats */}
            <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-10">
              {statsValues.map((s) => (
                <div key={s.key} className="pr-8 first:pl-0 pl-8">
                  <div className="font-serif font-normal text-white" style={{ fontSize: '52px', lineHeight: 1 }}>
                    {s.value}
                  </div>
                  {s.stars && (
                    <div className="mt-2 text-gold-highlight" style={{ fontSize: '14px', letterSpacing: '2px' }}>
                      ★★★★★
                    </div>
                  )}
                  <div className="font-light mt-2 text-primary-foreground/60 text-xs tracking-[0.12em]">
                    {d[s.key]}
                  </div>
                </div>
              ))}
            </div>

            {/* Reviews grid */}
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Featured review — full width */}
              <div
                className="col-span-full rounded-[4px] p-6 bg-gold-highlight/[0.04] border-[0.5px] border-gold-highlight/30"
              >
                <div className="text-gold-highlight" style={{ fontSize: '36px', lineHeight: 1 }}>&ldquo;</div>
                <p className="font-light italic leading-[1.75] mt-1 text-primary-foreground/70 text-base">
                  {featuredReview.text}
                </p>
                <div className="font-light mt-4 uppercase text-primary-foreground/60 text-xs tracking-[0.1em]">
                  {featuredReview.author}
                </div>
              </div>

              {/* Standard reviews */}
              {reviews.map((r) => (
                <div
                  key={r.author}
                  className="rounded-[4px] p-6"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '0.5px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="text-gold-highlight" style={{ fontSize: '36px', lineHeight: 1 }}>&ldquo;</div>
                  <p className="font-light italic leading-[1.75] mt-1 text-primary-foreground/70 text-sm">
                    {r.text}
                  </p>
                  <div className="font-light mt-4 uppercase text-primary-foreground/60 text-xs tracking-[0.1em]">
                    {r.author}
                  </div>
                </div>
              ))}

            </div>

            {/* CTA */}
            <div className="mt-12 pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t border-white/10">
              <Button
                asChild
                size="lg"
                className="border-0 text-[#0A0A0A] font-medium"
                style={{ background: "linear-gradient(135deg, #E8C97A 0%, #C9A96E 45%, #A07840 100%)" }}
              >
                <a href={AUTOSCOUT_URL} target="_blank" rel="noopener noreferrer">
                  {d.ctaPrimary}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <a
                href={AUTOSCOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-light hover:opacity-80 transition-opacity text-primary-foreground/60 text-sm"
              >
                {d.ctaSecondary}
              </a>
            </div>

          </div>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  )
}
