import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/Button"
import { getDictionary, buildMetadata } from "../../i18n"
import { BreadcrumbJsonLd } from "@/components/JsonLd"
import type { Locale } from "../layout"

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return buildMetadata({ title: dict.meta.chiSiamo.title, description: dict.meta.chiSiamo.description, path: '/chi-siamo', lang })
}

export default async function ChiSiamoPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const d = dict.chiSiamo
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: `https://www.bernabeiautomobili.com/${lang}` },
        { name: d.overline, url: `https://www.bernabeiautomobili.com/${lang}/chi-siamo` }
      ]} />
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
                {d.title1}
                <br />
                <em className="text-gold-highlight">{d.title2}</em>
                <br />
                {d.title3}
              </h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="max-w-3xl space-y-6">
              <p className="font-light text-base leading-[1.9] text-primary-foreground/65">
                {d.p1pre}{' '}
                <span className="font-normal text-primary-foreground/90">{d.p1year}</span>
                {d.p1mid}{' '}
                <span className="font-normal text-primary-foreground/90">{d.p1strong}</span>
                {d.p1post}
              </p>
              <p className="font-light text-base leading-[1.9] text-primary-foreground/65">
                {d.p2pre}{' '}
                <span className="font-normal text-primary-foreground/90">{d.p2strong}</span>
                {d.p2post}
              </p>
              <p className="font-light text-base leading-[1.9] text-primary-foreground/65">
                {d.p3pre}{' '}
                <span className="font-normal text-primary-foreground/90">{d.p3strong}</span>{' '}
                {d.p3post}
              </p>
            </div>

            {/* Timeline */}
            <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {d.timeline.map((item: { anno: string; nome: string; desc: string }) => (
                <div key={item.anno} className="pt-8 sm:first:pl-0 sm:last:pr-0 sm:px-8">
                  <div className="font-serif text-[28px] leading-none text-gold-highlight">{item.anno}</div>
                  <div className="font-sans font-normal uppercase mt-2 mb-3 text-xs tracking-[0.1em] text-white">
                    {item.nome}
                  </div>
                  <p className="font-light text-xs leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16">
              <Button
                asChild
                size="lg"
                className="border-0 text-[#0A0A0A] font-medium"
                style={{ background: "linear-gradient(135deg, #E8C97A 0%, #C9A96E 45%, #A07840 100%)" }}
              >
                <Link href={`/${lang}/contatti`}>{d.cta}</Link>
              </Button>
            </div>

          </div>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  )
}
