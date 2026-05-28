import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Chi Siamo | Bernabei Automobili Roma",
  description:
    "Tre generazioni di passione per le automobili. Dal nonno, primo concessionario Ferrari del Centro-Sud Italia, fino a Brando oggi in Via Flaminia 318, Roma.",
}

const timeline = [
  {
    anno: "1946",
    nome: "Il Nonno",
    desc: "Primo concessionario Ferrari del Centro-Sud Italia. Pilota alla Mille Miglia, amico di Nuvolari.",
  },
  {
    anno: "1970s",
    nome: "Franco",
    desc: "Concessionario Maserati e De Tomaso. 3× campione italiano Formula 3. Partecipazioni in Formula 1.",
  },
  {
    anno: "Oggi",
    nome: "Brando",
    desc: "Laurea in Economia, MBA, 4 lingue. Via Flaminia 318, Roma. Clienti in tutta Europa.",
  },
]

export default function ChiSiamoPage() {
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
              Chi Siamo
            </span>

            {/* Titolo */}
            <h2
              className="font-serif font-normal text-white mt-6 leading-[1.2]"
              style={{ fontSize: '42px' }}
            >
              Non semplici venditori.
              <br />
              <em style={{ color: '#C9A96E' }}>Appassionati di automobili</em>
              <br />
              da tre generazioni.
            </h2>

            {/* Paragrafi */}
            <div className="mt-10 space-y-6">
              <p
                className="font-sans font-light text-base leading-[1.9]"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                La storia di Bernabei Automobili inizia nel{' '}
                <span className="font-normal" style={{ color: 'rgba(255,255,255,0.9)' }}>1946</span>
                , quando il nonno di Brando diventa il{' '}
                <span className="font-normal" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  primo concessionario Ferrari del Centro-Sud Italia
                </span>
                , e arriva secondo alla Mille Miglia, dietro al solo Nuvolari di cui era grande amico.
              </p>

              <p
                className="font-sans font-light text-base leading-[1.9]"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                Suo figlio Franco prende le redini con la stessa passione: concessionario Maserati e
                De Tomaso,{' '}
                <span className="font-normal" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  tre volte campione italiano in Formula 3
                </span>
                , con diverse partecipazioni in Formula 1. Le auto non erano solo un mestiere, erano
                una vocazione.
              </p>

              <p
                className="font-sans font-light text-base leading-[1.9]"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                Oggi Brando, terza generazione, porta avanti quella stessa identità in Via Flaminia
                318, Roma.{' '}
                <span className="font-normal" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  Prima di essere un venditore, è un appassionato.
                </span>{' '}
                Per questo ogni vettura viene selezionata, verificata e raccontata con la cura che
                merita, e per questo i nostri clienti arrivano da tutta Italia e dall&apos;Europa.
              </p>
            </div>

            {/* Timeline orizzontale */}
            <div
              className="mt-16 pt-0 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <div
                className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10"
              >
                {timeline.map((item) => (
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

            {/* CTA */}
            <div className="mt-16">
              <Link
                href="/contatti"
                className="inline-block rounded-sm text-[#0d0d0d] font-sans font-medium text-[11px] uppercase tracking-[.15em] px-7 py-3 hover:opacity-85 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #E8C97A 0%, #C9A96E 45%, #A07840 100%)' }}
              >
                Parla con Brando
              </Link>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
