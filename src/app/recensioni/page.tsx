import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Recensioni | Bernabei Automobili",
  description:
    "4.9 su AutoScout24, 94 recensioni verificate, 97% positive. Leggi cosa dicono i nostri clienti da tutta Italia e dall'Europa.",
}

const AUTOSCOUT_URL =
  "https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei/recensioni"

const stats = [
  {
    value: "4.9",
    stars: true,
    label: "SU AUTOSCOUT24",
  },
  {
    value: "94",
    label: "RECENSIONI VERIFICATE",
  },
  {
    value: "97%",
    label: "RECENSIONI POSITIVE",
  },
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

export default function RecensioniPage() {
  return (
    <>
      <Header />
      <main className="bg-[#0d0d0d] min-h-screen">
        <section className="pt-36 pb-24 px-8 lg:px-16">
          <div className="max-w-[900px] mx-auto">

            {/* Label */}
            <span
              className="font-sans font-light uppercase"
              style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#C9A96E' }}
            >
              Recensioni
            </span>

            {/* Stats row */}
            <div
              className="mt-10 grid grid-cols-3 divide-x"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              {stats.map((s) => (
                <div key={s.label} className="pr-8 first:pl-0 pl-8">
                  <div
                    className="font-serif font-normal text-white"
                    style={{ fontSize: '52px', lineHeight: 1 }}
                  >
                    {s.value}
                  </div>
                  {s.stars && (
                    <div className="mt-2" style={{ color: '#C9A96E', fontSize: '14px', letterSpacing: '2px' }}>
                      ★★★★★
                    </div>
                  )}
                  <div
                    className="font-sans font-light mt-2"
                    style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)' }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Griglia recensioni */}
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card featured, full width */}
              <div
                className="col-span-full rounded-[4px] p-6"
                style={{
                  background: 'rgba(192,160,96,0.04)',
                  border: '0.5px solid rgba(192,160,96,0.3)',
                }}
              >
                <div style={{ fontSize: '36px', color: '#C9A96E', lineHeight: 1 }}>&ldquo;</div>
                <p
                  className="font-sans font-light italic leading-[1.75] mt-1"
                  style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)' }}
                >
                  {featuredReview.text}
                </p>
                <div
                  className="font-sans font-light mt-4 uppercase"
                  style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}
                >
                  {featuredReview.author}
                </div>
              </div>

              {/* 4 card standard */}
              {reviews.map((r) => (
                <div
                  key={r.author}
                  className="rounded-[4px] p-6"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '0.5px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div style={{ fontSize: '36px', color: '#C9A96E', lineHeight: 1 }}>&ldquo;</div>
                  <p
                    className="font-sans font-light italic leading-[1.75] mt-1"
                    style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}
                  >
                    {r.text}
                  </p>
                  <div
                    className="font-sans font-light mt-4 uppercase"
                    style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}
                  >
                    {r.author}
                  </div>
                </div>
              ))}

            </div>

            {/* Footer CTA */}
            <div
              className="mt-12 pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <Link
                href={AUTOSCOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-[2px] font-sans font-medium text-[#0d0d0d] uppercase hover:opacity-85 transition-opacity"
                style={{
                  background: '#C9A96E',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  padding: '12px 28px',
                }}
              >
                Leggi tutte le recensioni
              </Link>
              <a
                href={AUTOSCOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-light hover:opacity-80 transition-opacity"
                style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}
              >
                94 recensioni verificate su AutoScout24 →
              </a>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
