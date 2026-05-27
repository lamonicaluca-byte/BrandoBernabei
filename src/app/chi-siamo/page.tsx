import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Chi Siamo | Bernabei Automobili Roma",
  description:
    "La storia di Bernabei Automobili nasce dalla pista. Franco Bernabei, pilota professionista alla 24 Ore di Le Mans e Targa Florio, ha trasmesso a suo figlio Brando la passione vera per le automobili.",
}

const timeline = [
  { anno: "1961", gara: "Targa Florio", auto: "Maserati 200S", risultato: null },
  { anno: "1966", gara: "12 Ore di Sebring", auto: "De Tomaso Sport 5000", risultato: null },
  { anno: "1966", gara: "24 Ore di Le Mans", auto: "De Tomaso Sport 5000", risultato: null },
  { anno: "1976", gara: "Targa Florio", auto: "Porsche 911 Carrera", risultato: "3° posto" },
  { anno: "1976", gara: "Pergusa", auto: "Porsche 911 Carrera", risultato: "1° VITTORIA" },
  { anno: "1976", gara: "Giro d'Italia", auto: "Porsche 911 Carrera", risultato: "2° posto" },
]

const valori = [
  {
    numero: "01",
    titolo: "TRASPARENZA",
    testo: "Nessun costo nascosto, nessuna sorpresa. Il prezzo che vedi è quello che paghi.",
  },
  {
    numero: "02",
    titolo: "COMPETENZA",
    testo: "Oltre 25 anni di esperienza nel settore premium. Sappiamo cosa cercare e cosa evitare.",
  },
  {
    numero: "03",
    titolo: "SELEZIONE",
    testo: "Stock piccolo per scelta. Ogni vettura è lì perché la riteniamo davvero degna di essere proposta.",
  },
  {
    numero: "04",
    titolo: "ASSISTENZA",
    testo: "Il nostro lavoro non finisce alla firma. Siamo disponibili anche dopo la consegna.",
  },
]

export default function ChiSiamoPage() {
  return (
    <>
      <Header />
      <main>

        {/* SEZIONE 1 — Hero dark */}
        <section className="bg-[#080808] pt-32 pb-20 px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-sans font-light text-[10px] uppercase tracking-[.25em] text-[#C9A96E]">
              La nostra storia
            </span>
            <h1 className="font-serif font-light text-5xl text-[#F5F0E8] mt-6 leading-[1.2]">
              Non vendiamo auto.
              <br />
              <em className="text-gold">Le conosciamo da sempre.</em>
            </h1>
            <p className="font-sans text-[#AAAAAA] text-sm leading-relaxed max-w-2xl mx-auto mt-6">
              Bernabei Automobili nasce dalla pista. Da una passione ereditata,
              non imparata.
            </p>
          </div>
        </section>

        {/* SEZIONE 2 — Storia di Franco */}
        <section className="bg-[#F5F0E8] py-24 px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Colonna sx — testo */}
            <div>
              <span className="font-sans font-light text-[10px] uppercase tracking-[.25em] text-[#C9A96E]">
                Il fondatore
              </span>
              <h2 className="font-serif font-light text-4xl text-[#1C1C1C] mt-6 mb-6 leading-[1.2]">
                Franco Bernabei.
                <br />
                <em className="text-[#C9A96E]">Pilota. Fondatore. Padre.</em>
              </h2>
              <p className="font-sans font-light text-sm text-[#4A4A4A] leading-[1.9] mb-5">
                Franco Bernabei nasce a Roma il 17 maggio 1940. La sua vita è
                le corse automobilistiche — non come spettatore, ma come
                protagonista sui circuiti più importanti del mondo.
              </p>
              <p className="font-sans font-light text-sm text-[#4A4A4A] leading-[1.9] mb-5">
                Nel 1961 corre la Targa Florio su Maserati. Nel 1966 sale su
                una De Tomaso Sport 5000 per le 12 Ore di Sebring e la 24 Ore
                di Le Mans — la gara più leggendaria al mondo. Nel 1976 domina
                il campionato italiano su Porsche 911 Carrera, vincendo a
                Pergusa e salendo sul podio alla Targa Florio e al Giro
                d&apos;Italia.
              </p>
              <p className="font-sans font-light text-sm text-[#4A4A4A] leading-[1.9]">
                Quando smette di correre, Franco porta quella stessa competenza
                nell&apos;unica cosa che conosce meglio delle gare: le
                automobili. Nasce così Bernabei Automobili.
              </p>
            </div>

            {/* Colonna dx — timeline */}
            <div className="bg-[#0A0A0A] p-10">
              <div className="border-l border-[#C9A96E]/30 pl-6 space-y-8">
                {timeline.map((item, i) => (
                  <div key={i}>
                    <div className="font-serif text-[#C9A96E] text-2xl font-light leading-none mb-1">
                      {item.anno}
                    </div>
                    <div className="font-sans text-[#F5F0E8] text-[10px] uppercase tracking-[.18em] mb-0.5">
                      {item.gara}
                    </div>
                    <div className="font-sans text-[#888888] text-[10px]">
                      {item.auto}
                    </div>
                    {item.risultato && (
                      <div className="font-sans text-[#C9A96E] text-[10px] mt-0.5">
                        {item.risultato}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SEZIONE 3 — Quote di transizione */}
        <section className="bg-[#0A0A0A] py-20 px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-px bg-[#C9A96E] mx-auto mb-8" />
            <blockquote className="font-serif italic text-3xl text-[#F5F0E8] leading-[1.4] mb-6">
              &ldquo;Le gare ti insegnano una cosa sola:
              <br />
              la differenza tra chi prepara bene
              <br />
              e chi improvvisa si vede sempre.&rdquo;
            </blockquote>
            <p className="font-sans text-[10px] uppercase tracking-[.25em] text-[#C9A96E]">
              — Franco Bernabei
            </p>
          </div>
        </section>

        {/* SEZIONE 4 — Brando */}
        <section className="bg-[#F5F0E8] py-24 px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Colonna sx — placeholder foto */}
            <div className="bg-[#1C1C1C] min-h-[420px] flex items-center justify-center">
              <span className="font-serif text-[#333] text-sm tracking-[.2em]">
                [ FOTO BRANDO ]
              </span>
            </div>

            {/* Colonna dx — testo */}
            <div>
              <span className="font-sans font-light text-[10px] uppercase tracking-[.25em] text-[#C9A96E]">
                Chi siamo oggi
              </span>
              <h2 className="font-serif font-light text-4xl text-[#1C1C1C] mt-6 mb-6 leading-[1.2]">
                Brando Bernabei.
                <br />
                <em className="text-[#C9A96E]">La stessa passione. Un approccio nuovo.</em>
              </h2>
              <p className="font-sans font-light text-sm text-[#4A4A4A] leading-[1.9] mb-5">
                Brando cresce circondato da automobili vere — non come oggetti
                di consumo, ma come macchine con una storia, un carattere,
                un&apos;anima. Impara a guardarle con gli occhi di chi le ha
                guidate in gara.
              </p>
              <p className="font-sans font-light text-sm text-[#4A4A4A] leading-[1.9] mb-8">
                Oggi Bernabei Automobili è la sua concessionaria. Ogni vettura
                in stock è stata scelta personalmente da Brando, con criteri
                precisi e nessuna scorciatoia. Non vendiamo tutto — vendiamo
                solo quello di cui siamo convinti.
              </p>
              <blockquote className="border-l-2 border-[#C9A96E] pl-5 font-serif italic text-xl text-[#1C1C1C] mb-8 leading-[1.4]">
                &ldquo;Non vendo auto. Aiuto le persone a trovare quella
                giusta.&rdquo;
              </blockquote>
              <Link
                href="/contatti"
                className="inline-block border-[0.5px] border-[#1C1C1C] text-[#1C1C1C] text-[10px] uppercase tracking-[.18em] px-6 py-3 hover:bg-[#1C1C1C] hover:text-[#F5F0E8] transition-colors"
              >
                Parla con Brando
              </Link>
            </div>

          </div>
        </section>

        {/* SEZIONE 5 — I valori */}
        <section className="bg-[#080808] py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-sans font-light text-[10px] uppercase tracking-[.25em] text-[#C9A96E]">
                Perché scegliere Bernabei
              </span>
              <h2 className="font-serif font-light text-4xl text-[#F5F0E8] mt-6">
                Quello che non cambia.
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {valori.map((v) => (
                <div key={v.numero}>
                  <div className="font-serif text-6xl text-[#1A1A1A] font-light leading-none mb-4 select-none">
                    {v.numero}
                  </div>
                  <div className="font-sans text-[10px] uppercase tracking-[.18em] text-[#C9A96E] mb-3">
                    {v.titolo}
                  </div>
                  <p className="font-sans text-[#999999] text-xs leading-relaxed">
                    {v.testo}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEZIONE 6 — CTA finale */}
        <section className="bg-[#F5F0E8] py-20 px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-serif font-light text-4xl text-[#1C1C1C] mb-4">
              Vieni a trovarci.
            </h2>
            <p className="font-sans font-light text-sm text-[#6A6A6A] mb-10 leading-relaxed">
              Via Flaminia, 318/a — Roma.
              <br />
              Oppure scrivici su WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/vetture"
                className="inline-block border-[0.5px] border-[#1C1C1C] text-[#1C1C1C] text-[10px] uppercase tracking-[.18em] px-6 py-3 hover:bg-[#1C1C1C] hover:text-[#F5F0E8] transition-colors text-center"
              >
                Vedi le vetture disponibili
              </Link>
              <a
                href="https://wa.me/393395027983"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[#0A0A0A] text-[10px] uppercase tracking-[.18em] px-6 py-3 text-center hover:opacity-80 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, #E8C97A 0%, #C9A96E 45%, #A07840 100%)",
                }}
              >
                Scrivici su WhatsApp
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
