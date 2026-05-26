import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";

export default function ChiSiamoTeaser() {
  return (
    <section className="bg-warm-white py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="relative aspect-[4/5] bg-dark-graphite flex items-center justify-center overflow-hidden">
            <span className="font-body text-[10px] tracking-[0.25em] uppercase text-mid-grey">
              [FOTO BRANDO]
            </span>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <SectionLabel>Chi siamo</SectionLabel>
            <h2 className="font-display text-[32px] font-light text-luxury-black leading-snug">
              Una selezione personale.
              <br />
              Una promessa precisa.
            </h2>
            {/* Quote */}
            <blockquote className="border-l-2 border-champagne-gold pl-5">
              <p className="font-display text-[17px] italic text-luxury-black leading-relaxed">
                "Non vendo auto. Aiuto le persone a trovare quella giusta."
              </p>
            </blockquote>
            <p className="font-body text-[12px] font-light text-mid-grey leading-[1.9]">
              Bernabei Automobili nasce dall'esperienza familiare nel settore automotive. Ogni
              vettura è scelta direttamente da Brando, con criteri precisi e nessuna scorciatoia.
              Il risultato è uno stock piccolo, selezionato, onesto.
            </p>
            <div>
              <Button href="/chi-siamo" variant="outline-dark">
                Scopri la nostra storia
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
