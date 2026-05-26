import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";

export default function ChiSiamoTeaser() {
  return (
    <section className="bg-[#F5F0E8] py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="relative aspect-[4/5] bg-[#1C1C1C] flex items-center justify-center overflow-hidden">
            <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#5A5A5A]">
              [FOTO BRANDO]
            </span>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <SectionLabel>Chi siamo</SectionLabel>
            <h2 className="font-display font-light text-[32px] text-[#1C1C1C] leading-snug">
              Una selezione personale.
              <br />
              Una promessa precisa.
            </h2>
            {/* Quote */}
            <blockquote className="border-l-2 border-[#C9A96E] pl-4">
              <p className="font-display italic text-lg text-[#1C1C1C] leading-relaxed">
                "Non vendo auto. Aiuto le persone a trovare quella giusta."
              </p>
            </blockquote>
            <p className="font-body font-light text-[12px] text-[#4A4A4A] leading-[1.8]">
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
