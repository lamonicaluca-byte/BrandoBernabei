import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getDictionary } from "../../i18n"
import type { Locale } from "../layout"

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return { title: dict.meta.chiSiamo.title, description: dict.meta.chiSiamo.description }
}

export default async function ChiSiamoPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const d = dict.chiSiamo
  return (
    <>
      <Header lang={lang} dict={dict} />
      <main className="bg-[#0d0d0d] min-h-screen">
        <section className="pt-36 pb-24 px-8 lg:px-16">
          <div className="max-w-[900px] mx-auto">

            <span
              className="font-sans font-light uppercase"
              style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#C9A96E' }}
            >
              {d.overline}
            </span>

            <h2
              className="font-serif font-normal text-white mt-6 leading-[1.2]"
              style={{ fontSize: '42px' }}
            >
              {d.title1}
              <br />
              <em style={{ color: '#C9A96E' }}>{d.title2}</em>
              <br />
              {d.title3}
            </h2>

            <div className="mt-10 space-y-6">
              <p
                className="font-sans font-light text-base leading-[1.9]"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {d.p1pre}{' '}
                <span className="font-normal" style={{ color: 'rgba(255,255,255,0.9)' }}>{d.p1year}</span>
                , quando il nonno di Brando diventa il{' '}
                <span className="font-normal" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  {d.p1strong}
                </span>
                {d.p1post}
              </p>

              <p
                className="font-sans font-light text-base leading-[1.9]"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {d.p2pre}{' '}
                <span className="font-normal" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  {d.p2strong}
                </span>
                {d.p2post}
              </p>

              <p
                className="font-sans font-light text-base leading-[1.9]"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {d.p3pre}{' '}
                <span className="font-normal" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  {d.p3strong}
                </span>{' '}
                {d.p3post}
              </p>
            </div>

            <div
              className="mt-16 pt-0 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <div
                className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10"
              >
                {d.timeline.map((item: { anno: string; nome: string; desc: string }) => (
                  <div
                    key={item.anno}
                    className="pt-8 first:pl-0 last:pr-0 sm:px-8 first:sm:pl-0 last:sm:pr-0"
                  >
                    <div
                      className="font-serif font-normal"
                      style={{ fontSize: '28px', color: '#C9A96E' }}
                    >
                      {item.anno}
                    </div>
                    <div
                      className="font-sans font-normal uppercase mt-2 mb-3"
                      style={{ fontSize: '12px', letterSpacing: '0.1em', color: '#ffffff' }}
                    >
                      {item.nome}
                    </div>
                    <p
                      className="font-sans font-light leading-relaxed"
                      style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <Link
                href={`/${lang}/contatti`}
                className="inline-block rounded-sm text-[#0d0d0d] font-sans font-medium text-[11px] uppercase tracking-[.15em] px-7 py-3 hover:opacity-85 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #E8C97A 0%, #C9A96E 45%, #A07840 100%)' }}
              >
                {d.cta}
              </Link>
            </div>

          </div>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  )
}
