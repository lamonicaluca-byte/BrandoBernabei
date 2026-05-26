import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Recensioni | Bernabei Automobili Roma",
  description:
    "Leggi le recensioni reali dei clienti di Bernabei Automobili. 97% di soddisfazione, 4.9/5 su AutoScout24. Scopri cosa dicono di noi.",
};

const recensioni = [
  {
    autore: "Marco T.",
    citta: "Roma",
    data: "Marzo 2024",
    voto: 5,
    testo:
      "Brando è stato disponibile, preciso e trasparente in ogni fase. La macchina era esattamente come descritta. Consigliato senza riserve. Non capita spesso di trovare qualcuno così onesto in questo settore.",
  },
  {
    autore: "Giulia R.",
    citta: "Milano",
    data: "Gennaio 2024",
    voto: 5,
    testo:
      "Professionalità vera, non di facciata. Mi ha aiutato a scegliere la vettura giusta senza mai spingere verso la vendita. Un consulente, non un venditore. Tornerò senz'altro.",
  },
  {
    autore: "Luca B.",
    citta: "Napoli",
    data: "Dicembre 2023",
    voto: 5,
    testo:
      "Acquisto da fuori Roma, tutto gestito in modo impeccabile. Consegna puntuale, documentazione perfetta. Un'esperienza come poche. Brando è sempre stato raggiungibile e disponibile a rispondere a ogni dubbio.",
  },
  {
    autore: "Fabio M.",
    citta: "Roma",
    data: "Novembre 2023",
    voto: 5,
    testo:
      "Garanzia rispettata senza discussioni, assistenza post-vendita reale. Torno da Brando ogni volta. È il modo in cui si dovrebbe sempre fare questo lavoro.",
  },
  {
    autore: "Alessandra V.",
    citta: "Firenze",
    data: "Ottobre 2023",
    voto: 5,
    testo:
      "Prima esperienza con un'auto usata premium e non potevo capitare in un posto migliore. Brando mi ha spiegato tutto con pazienza, senza farmi sentire ignorante. Vettura perfetta.",
  },
  {
    autore: "Roberto C.",
    citta: "Roma",
    data: "Settembre 2023",
    voto: 5,
    testo:
      "Ho acquistato la terza auto da Bernabei Automobili. Ogni volta la stessa qualità, la stessa trasparenza. Prezzo giusto, nessuna sorpresa. Raccomando a tutti.",
  },
  {
    autore: "Simone D.",
    citta: "Torino",
    data: "Agosto 2023",
    voto: 5,
    testo:
      "Avevo bisogno di una vettura specifica e Brando l'ha trovata e preparata in tempi brevissimi. Condizioni impeccabili, documentazione completa. Un professionista vero.",
  },
  {
    autore: "Elena F.",
    citta: "Bologna",
    data: "Luglio 2023",
    voto: 5,
    testo:
      "Acquisto completamente da remoto. Brando ha gestito tutto: foto, video, documenti, spedizione. Mi sono fidata e non me ne sono pentita. La vettura era ancora meglio di quanto mostrato.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#D4AF72" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

const paroleChiave = [
  "Trasparenza",
  "Professionalità",
  "Affidabilità",
  "Puntualità",
  "Consulenza",
  "Qualità",
  "Onestà",
  "Assistenza",
];

export default function RecensioniPage() {
  return (
    <div className="bg-warm-white min-h-screen">
      {/* Hero / Score overview */}
      <div className="bg-luxury-black pt-[52px] pb-16 px-8">
        <div className="max-w-6xl mx-auto pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div>
              <SectionLabel light className="mb-5">
                Recensioni clienti
              </SectionLabel>
              <h1 className="font-display text-[44px] md:text-[56px] font-light text-warm-white">
                Cosa dicono
                <br />
                <em className="text-champagne-gold not-italic">di noi.</em>
              </h1>
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-display text-[72px] font-light text-warm-white leading-none">
                4.9
              </div>
              <Stars count={5} />
              <div className="font-body text-[10px] tracking-[0.2em] uppercase text-[#C0C0C0]">
                Su AutoScout24
              </div>
              {/* Barra percentuale */}
              <div className="mt-4 flex items-center gap-4">
                <div className="flex-1 bg-dark-graphite h-1">
                  <div className="bg-champagne-gold h-1 w-[97%]" />
                </div>
                <span className="font-display text-[20px] text-champagne-gold font-light whitespace-nowrap">
                  97%
                </span>
              </div>
              <span className="font-body text-[9px] text-[#C0C0C0] tracking-wider">
                recensioni positive
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Parole chiave */}
      <div className="bg-[#131313] py-5 px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3">
          <span className="font-body text-[9px] tracking-[0.2em] uppercase text-[#C0C0C0] mr-2">
            Cosa emerge:
          </span>
          {paroleChiave.map((p) => (
            <span
              key={p}
              className="font-body text-[9px] tracking-[0.15em] uppercase text-[#C0C0C0] border border-[0.5px] border-[#444] px-3 py-1"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Grid recensioni */}
      <div className="max-w-6xl mx-auto px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {recensioni.map((r) => (
            <div
              key={r.autore}
              className="bg-pure-white border border-[0.5px] border-border-light p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <Stars count={r.voto} />
                <span className="font-body text-[9px] text-[#AAAAAA]">{r.data}</span>
              </div>
              <p className="font-display text-[14px] italic text-luxury-black leading-relaxed flex-1">
                &ldquo;{r.testo}&rdquo;
              </p>
              <div className="pt-3 border-t border-[0.5px] border-border-light">
                <span className="font-body text-[9px] tracking-[0.2em] uppercase text-muted-grey">
                  — {r.autore}, {r.citta}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA AutoScout24 */}
        <div className="flex flex-col items-center gap-4 py-8 border-t border-[0.5px] border-border-light">
          <p className="font-body text-[12px] text-mid-grey text-center max-w-md">
            Tutte le recensioni sono verificate e pubblicate su AutoScout24. Puoi leggerle
            direttamente sulla piattaforma.
          </p>
          <Button
            href="https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei"
            variant="outline-gold"
            external
          >
            Leggi tutte le recensioni su AutoScout24
          </Button>
        </div>
      </div>
    </div>
  );
}
