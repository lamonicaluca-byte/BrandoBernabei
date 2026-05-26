import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Servizi | Bernabei Automobili Roma",
  description:
    "Consulenza, permuta, finanziamento, garanzia e consegna in tutta Italia. Tutti i servizi di Bernabei Automobili Roma.",
};

const servizi = [
  {
    numero: "01",
    title: "Consulenza personalizzata",
    desc: "Brando ascolta le tue esigenze reali — budget, utilizzo, gusti estetici — e ti orienta verso la vettura più adatta. Nessuna pressione, nessun obiettivo di vendita da raggiungere.",
  },
  {
    numero: "02",
    title: "Permuta valutata",
    desc: "Hai già un'auto? La valutiamo con serietà e trasparenza. La permuta viene gestita come parte integrante della trattativa, senza sorprese finali.",
  },
  {
    numero: "03",
    title: "Finanziamento e leasing",
    desc: "Collaboriamo con istituti finanziari selezionati per offrirti condizioni competitive. Gestiamo la pratica direttamente noi, dall'istruttoria alla firma.",
  },
  {
    numero: "04",
    title: "Consegna in tutta Italia",
    desc: "Non sei a Roma? Nessun problema. Consegniamo in tutta Italia con trasportatori di fiducia. La documentazione viene gestita completamente da remoto.",
  },
  {
    numero: "05",
    title: "Garanzia e assistenza",
    desc: "Le nostre vetture vengono consegnate con garanzia. Non ci fermiamo alla firma: siamo disponibili per qualsiasi necessità nei mesi successivi all'acquisto.",
  },
  {
    numero: "06",
    title: "Ispezione pre-acquisto",
    desc: "Vuoi far ispezionare la vettura da un tuo tecnico di fiducia prima di acquistare? Lo incoraggiamo. La trasparenza non è uno slogan: è il nostro metodo.",
  },
];

export default function ServiziPage() {
  return (
    <div className="bg-warm-white min-h-screen">
      {/* Hero */}
      <div className="bg-luxury-black pt-[52px] pb-16 px-8">
        <div className="max-w-6xl mx-auto pt-12">
          <SectionLabel light className="mb-5">
            I nostri servizi
          </SectionLabel>
          <h1 className="font-display text-[44px] md:text-[56px] font-light text-warm-white mb-5">
            Tutto quello che serve,
            <br />
            <em className="text-champagne-gold not-italic">niente di più.</em>
          </h1>
          <p className="font-body text-[12px] text-muted-grey max-w-lg leading-[1.9]">
            I nostri servizi nascono dall'ascolto dei clienti nel corso di 25 anni. Ogni
            dettaglio è pensato per rendere l'acquisto semplice, sicuro e piacevole.
          </p>
        </div>
      </div>

      {/* Servizi grid */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servizi.map((s) => (
            <div
              key={s.numero}
              className="flex flex-col gap-4 p-8 bg-pure-white border border-[0.5px] border-border-light"
            >
              <div className="font-display text-[36px] font-light text-[#E8E4DC] leading-none select-none">
                {s.numero}
              </div>
              <h3 className="font-body text-[10px] tracking-[0.2em] uppercase text-champagne-gold">
                {s.title}
              </h3>
              <p className="font-body text-[11px] text-mid-grey leading-[1.9]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Garanzia highlight */}
      <div className="bg-luxury-black py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel light className="mb-5">
                La nostra promessa
              </SectionLabel>
              <h2 className="font-display text-[32px] font-light text-warm-white mb-5">
                La garanzia Bernabei
              </h2>
              <p className="font-body text-[12px] text-muted-grey leading-[1.9] mb-4">
                Ogni vettura che vendiamo è garantita. Non perché lo impone la legge, ma perché
                è il minimo che puoi aspettarti da un professionista serio. Se qualcosa non va,
                ci occupiamo noi.
              </p>
              <p className="font-body text-[12px] text-muted-grey leading-[1.9] mb-8">
                Siamo disponibili telefonicamente, via WhatsApp e via email. La nostra
                assistenza non termina con la firma del contratto.
              </p>
              <Button href="/contatti" variant="outline-gold">
                Parla con noi
              </Button>
            </div>
            <div className="aspect-[4/3] bg-dark-graphite flex items-center justify-center">
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-mid-grey">
                [FOTO ASSISTENZA]
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA finale */}
      <div className="bg-warm-white py-16 px-8 text-center">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-6">
          <h2 className="font-display text-[32px] font-light text-luxury-black">
            Inizia adesso
          </h2>
          <p className="font-body text-[12px] text-mid-grey">
            Scopri le vetture disponibili o contattaci per una consulenza gratuita.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button href="/vetture" variant="primary">
              Vedi le vetture
            </Button>
            <Button href="/contatti" variant="outline-dark">
              Richiedi consulenza
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
