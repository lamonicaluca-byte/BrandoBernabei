import Button from "@/components/ui/Button";

const stats = [
  { value: "97%", label: "Recensioni positive" },
  { value: "25+", label: "Anni di esperienza" },
  { value: "100%", label: "Selezione personale" },
];

export default function Hero() {
  return (
    <section className="bg-[#080808] pt-[52px]">
      <div className="max-w-6xl mx-auto px-8 py-16 md:py-24">
        {/* Badge */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-7 h-px bg-[#C9A96E] flex-shrink-0" />
          <span className="font-body text-[9px] tracking-[0.3em] uppercase text-[#C9A96E]">
            Concessionaria premium a Roma
          </span>
        </div>

        {/* H1 */}
        <h1 className="font-display font-light text-5xl md:text-[64px] leading-[1.05] tracking-tight text-[#F5F0E8] mb-6 max-w-3xl">
          Auto selezionate.
          <br />
          <em className="text-[#C9A96E] italic">Fiducia garantita.</em>
        </h1>

        {/* Subtitle */}
        <p className="font-body text-[12px] font-light text-[#C0C0C0] leading-[1.9] max-w-xl mb-10">
          Ogni vettura che trovi da noi è stata scelta personalmente. Non siamo un marketplace
          — siamo consulenti che mettono la tua soddisfazione prima di ogni trattativa.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-16">
          <Button href="/vetture" variant="primary">
            Scopri le vetture disponibili
          </Button>
          <Button href="https://wa.me/393395027983" variant="outline-gold" external>
            Parla con Brando
          </Button>
        </div>

        {/* Stats */}
        <div className="border-t border-[#1E1E1E]">
          <div className="grid grid-cols-3">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-6 pr-6 ${i > 0 ? "pl-6 border-l border-[#1E1E1E]" : ""}`}
              >
                <div className="font-display font-light text-4xl text-[#C9A96E] leading-none mb-1">
                  {stat.value}
                </div>
                <div className="uppercase tracking-[.2em] text-[9px] text-[#999]">
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
