import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Chi Siamo | Bernabei Automobili Roma",
  description:
    "La storia di Bernabei Automobili: 25 anni di esperienza nel settore delle auto usate premium a Roma. Brando Bernabei seleziona personalmente ogni vettura.",
};

const valori = [
  {
    title: "Trasparenza",
    desc: "Nessuna sorpresa. Ogni difetto, ogni intervento, ogni storia della vettura viene comunicata prima della trattativa. La chiarezza è il fondamento di ogni rapporto duraturo.",
  },
  {
    title: "Competenza",
    desc: "25 anni di esperienza diretta sul mercato delle auto premium e sportive. Conoscere le vetture significa saper riconoscere quelle che non meritano e valorizzare quelle che sì.",
  },
  {
    title: "Selezione",
    desc: "Uno stock piccolo non è una limitazione: è una scelta. Ogni vettura deve superare criteri precisi prima di entrare da noi. La quantità non è mai stata il nostro obiettivo.",
  },
  {
    title: "Assistenza",
    desc: "La vendita non è la fine del rapporto. Assistiamo i clienti anche dopo la consegna, per pratiche, garanzie, consigli tecnici. Il valore di una concessionaria si misura nel tempo.",
  },
];

const timeline = [
  { anno: "1998", evento: "Fondazione di Bernabei Automobili a Roma, con focus su vetture selezionate" },
  { anno: "2005", evento: "Specializzazione esclusiva nel segmento premium e sportivo" },
  { anno: "2012", evento: "Apertura dello showroom attuale, capace di ospitare una selezione curata" },
  { anno: "2018", evento: "Raggiungimento delle 500 vetture consegnate con 97% recensioni positive" },
  { anno: "Oggi", evento: "Continuiamo con gli stessi valori del primo giorno: selezione, onestà, relazione" },
];

export default function ChiSiamoPage() {
  return (
    <div className="bg-warm-white min-h-screen">
      {/* Hero */}
      <div className="bg-luxury-black pt-[52px] pb-16 px-8">
        <div className="max-w-6xl mx-auto pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel light className="mb-5">
                Chi siamo
              </SectionLabel>
              <h1 className="font-display text-[44px] md:text-[56px] font-light text-warm-white leading-tight mb-6">
                Una storia di
                <br />
                <em className="text-champagne-gold not-italic">passione vera.</em>
              </h1>
              <p className="font-body text-[12px] text-mid-grey leading-[1.9] max-w-md">
                Dal 1998, Bernabei Automobili è sinonimo di selezione rigorosa e rapporti
                onesti. Non siamo un marketplace: siamo persone che amano le auto e rispettano
                chi le acquista.
              </p>
            </div>
            <div className="aspect-[4/3] bg-dark-graphite flex items-center justify-center">
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-mid-grey">
                [FOTO SHOWROOM]
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Brando section */}
      <div className="bg-warm-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[3/4] bg-dark-graphite flex items-center justify-center order-2 md:order-1">
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-mid-grey">
                [FOTO BRANDO]
              </span>
            </div>
            <div className="order-1 md:order-2 flex flex-col gap-6">
              <SectionLabel className="mb-0">Brando Bernabei</SectionLabel>
              <h2 className="font-display text-[32px] font-light text-luxury-black">
                Il titolare. La garanzia.
              </h2>
              <blockquote className="border-l-2 border-champagne-gold pl-5">
                <p className="font-display text-[17px] italic text-luxury-black leading-relaxed">
                  "Non vendo auto. Aiuto le persone a trovare quella giusta per loro."
                </p>
              </blockquote>
              <p className="font-body text-[12px] text-mid-grey leading-[1.9]">
                Brando Bernabei ha fondato questa concessionaria con un principio semplice: il
                cliente deve uscire da questa porta convinto, non solo comprato. Ogni vettura
                che entra nello stock viene esaminata personalmente. Nessuna delega, nessun
                compromesso.
              </p>
              <p className="font-body text-[12px] text-mid-grey leading-[1.9]">
                La sua competenza si è costruita in 25 anni di mercato diretto, con rapporti
                consolidati con i migliori tecnici e carrozzieri di Roma. Ogni acquisto è
                preceduto da un'ispezione approfondita che dà al cliente la certezza di sapere
                esattamente cosa sta comprando.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-off-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel className="mb-5">La nostra storia</SectionLabel>
          <h2 className="font-display text-[32px] font-light text-luxury-black mb-12">
            25 anni di selezione
          </h2>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border-light" />
            <div className="flex flex-col gap-8 pl-8">
              {timeline.map((item) => (
                <div key={item.anno} className="relative">
                  <div className="absolute -left-8 w-2 h-2 bg-champagne-gold rounded-full mt-1.5" />
                  <div className="font-display text-[20px] text-champagne-gold font-light mb-1">
                    {item.anno}
                  </div>
                  <p className="font-body text-[12px] text-mid-grey leading-relaxed">
                    {item.evento}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Valori */}
      <div className="bg-luxury-black py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <SectionLabel light className="mb-5">
            I nostri principi
          </SectionLabel>
          <h2 className="font-display text-[32px] font-light text-warm-white mb-12">
            Perché scegliere Bernabei Automobili
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {valori.map((v, i) => (
              <div
                key={v.title}
                className={`py-8 pr-8 flex flex-col gap-4 ${
                  i > 0
                    ? "border-t sm:border-t-0 sm:border-l border-[0.5px] border-dark-graphite sm:pl-8"
                    : ""
                }`}
              >
                <div className="font-body text-[10px] tracking-[0.2em] uppercase text-champagne-gold">
                  {v.title}
                </div>
                <p className="font-body text-[11px] text-mid-grey leading-[1.9]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA finale */}
      <div className="bg-warm-white py-16 px-8 text-center">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-6">
          <h2 className="font-display text-[32px] font-light text-luxury-black">
            Inizia il tuo percorso
          </h2>
          <p className="font-body text-[12px] text-mid-grey">
            Scopri le vetture disponibili o contattaci direttamente per una consulenza senza
            impegno.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button href="/vetture" variant="primary">
              Vedi le vetture
            </Button>
            <Button href="/contatti" variant="outline-dark">
              Contattaci
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
