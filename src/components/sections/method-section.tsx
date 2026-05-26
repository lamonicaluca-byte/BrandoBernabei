const steps = [
  {
    number: "01",
    title: "Selezione",
    description:
      "Ogni vettura viene valutata personalmente. Storico documentato, provenienza verificata, condizioni meccaniche accertate.",
  },
  {
    number: "02",
    title: "Verifica",
    description:
      "Ispezione tecnica approfondita da specialisti. Chilometraggio certificato, carrozzeria, impianti, storia degli interventi.",
  },
  {
    number: "03",
    title: "Preparazione",
    description:
      "Detailing professionale, tagliando se necessario, sanificazione completa. La vettura viene consegnata come si deve.",
  },
  {
    number: "04",
    title: "Consegna",
    description:
      "Spiegazione dettagliata della vettura, documenti in ordine, garanzia attiva. Il supporto post-vendita inizia qui.",
  },
]

export function MethodSection() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <span className="text-xs tracking-[0.25em] uppercase text-accent/80">
            Il nostro processo
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-primary-foreground tracking-tight">
            Il Metodo Bernabei
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/60 leading-relaxed">
            Un processo rigoroso che garantisce qualità e trasparenza in ogni fase.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {steps.map((step) => (
            <div key={step.number}>
              <div className="font-serif text-5xl font-light text-accent mb-5">
                {step.number}
              </div>
              <h3 className="font-serif text-xl font-medium text-primary-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-primary-foreground/55 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
