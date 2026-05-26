import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";

const recensioni = [
  {
    testo:
      "Brando è stato disponibile, preciso e trasparente in ogni fase. La macchina era esattamente come descritta. Consigliato senza riserve.",
    autore: "Marco T.",
    citta: "Roma",
  },
  {
    testo:
      "Professionalità vera, non di facciata. Mi ha aiutato a scegliere la vettura giusta senza mai spingere verso la vendita. Un consulente, non un venditore.",
    autore: "Giulia R.",
    citta: "Milano",
  },
  {
    testo:
      "Acquisto da fuori Roma, tutto gestito in modo impeccabile. Consegna puntuale, documentazione perfetta. Un'esperienza come poche.",
    autore: "Luca B.",
    citta: "Napoli",
  },
  {
    testo:
      "Garanzia rispettata senza discussioni, assistenza post-vendita reale. Torno da Brando ogni volta. È il modo in cui si dovrebbe sempre fare questo lavoro.",
    autore: "Fabio M.",
    citta: "Roma",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="#C9A96E"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Recensioni() {
  return (
    <section className="bg-[#EDEBE4] py-16 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <SectionLabel className="mb-4">Cosa dicono i clienti</SectionLabel>
            <h2 className="font-display font-light text-[32px] text-[#1C1C1C]">
              Le parole di chi ha scelto Bernabei
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
            <div className="font-display font-light text-7xl text-[#1C1C1C] leading-none">
              4.9
            </div>
            <Stars />
            <span className="font-body text-[9px] tracking-[0.15em] uppercase text-[#5A5A5A] mt-1">
              su AutoScout24
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {recensioni.map((r) => (
            <div
              key={r.autore}
              className="bg-white border border-[#E0DDD6] p-6 flex flex-col gap-4"
            >
              <Stars />
              <p className="font-display italic text-[16px] text-[#3A3A3A] leading-relaxed">
                &ldquo;{r.testo}&rdquo;
              </p>
              <span className="font-body text-[9px] tracking-[0.2em] uppercase text-[#9A9A9A]">
                — {r.autore}, {r.citta}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Button
            href="https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei"
            variant="outline-gold"
            external
          >
            Leggi tutte le recensioni su AutoScout24
          </Button>
        </div>
      </div>
    </section>
  );
}
