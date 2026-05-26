import Button from "@/components/ui/Button";

const stats = [
  { value: "97%", label: "Recensioni positive" },
  { value: "25+", label: "Anni di esperienza" },
  { value: "100%", label: "Selezione personale" },
];

export default function Hero() {
  return (
    <section className="bg-luxury-black pt-[52px]">
      <div className="max-w-6xl mx-auto px-8 py-16 md:py-24">
        {/* Badge */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-6 h-px bg-champagne-gold" />
          <span className="font-body text-[9px] tracking-[0.3em] uppercase text-champagne-gold">
            Concessionaria premium a Roma
          </span>
        </div>

        {/* H1 */}
        <h1 className="font-display text-[48px] md:text-[64px] font-light text-warm-white leading-[1.1] mb-6 max-w-3xl">
          Auto selezionate.
          <br />
          <em className="text-champagne-gold not-italic">Fiducia garantita.</em>
        </h1>

        {/* Subtitle */}
        <p className="font-body text-[12px] font-light text-mid-grey leading-[1.9] max-w-xl mb-10">
          Ogni vettura che trovi da noi è stata scelta personalmente. Non siamo un marketplace
          — siamo consulenti che mettono la tua soddisfazione prima di ogni trattativa.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-16">
          <Button href="/vetture" variant="primary">
            Scopri le vetture disponibili
          </Button>
          <Button href="https://wa.me/39XXXXXXXXXX" variant="outline-gold" external>
            Parla con Brando
          </Button>
        </div>

        {/* Stats */}
        <div className="border-t border-[0.5px] border-dark-graphite">
          <div className="grid grid-cols-3">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-6 pr-6 ${i > 0 ? "pl-6 border-l border-[0.5px] border-dark-graphite" : ""}`}
              >
                <div className="font-display text-[30px] font-light text-champagne-gold leading-none mb-1">
                  {stat.value}
                </div>
                <div className="font-body text-[9px] tracking-[0.15em] uppercase text-mid-grey">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
