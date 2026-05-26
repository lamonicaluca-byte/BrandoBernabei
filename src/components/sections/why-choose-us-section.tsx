const pillars = [
  {
    number: "01",
    title: "Selezione",
    description:
      "Ogni vettura entra nel nostro stock solo dopo un'ispezione personale. Non acquistiamo a scatola chiusa: la qualità si verifica dal vivo.",
  },
  {
    number: "02",
    title: "Trasparenza",
    description:
      "Ogni difetto, ogni intervento, ogni storia della vettura viene comunicata prima della trattativa. Nessuna sorpresa, mai.",
  },
  {
    number: "03",
    title: "Competenza",
    description:
      "Oltre 25 anni nel mercato premium e sportivo. Sappiamo riconoscere le vetture che meritano, e quelle da evitare.",
  },
  {
    number: "04",
    title: "Relazione",
    description:
      "Non ti vendiamo un'auto. Ti aiutiamo a sceglierla. E restiamo a disposizione ben oltre la consegna.",
  },
]

const stats = [
  { value: "97%", label: "Recensioni positive su AutoScout24" },
  { value: "500+", label: "Clienti soddisfatti negli anni" },
  { value: "25+", label: "Anni di esperienza nel settore" },
  { value: "100%", label: "Vetture garantite con copertura inclusa" },
]

export function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <span className="text-xs tracking-[0.25em] uppercase text-accent/80">
            La nostra differenza
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight">
            Perché i clienti ci scelgono
          </h2>
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {pillars.map((pillar) => (
            <div key={pillar.number}>
              <div className="font-serif text-5xl font-light text-accent/60 mb-4">
                {pillar.number}
              </div>
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="mt-20 pt-12 border-t border-border grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center sm:text-left">
              <div className="font-serif text-3xl font-light text-foreground">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
