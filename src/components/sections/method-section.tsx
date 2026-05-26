import { Search, CheckCircle, Settings, Truck } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Selezione",
    description: "Ogni vettura viene accuratamente selezionata seguendo criteri rigorosi di qualità, provenienza e storico manutenzioni.",
  },
  {
    number: "02",
    icon: CheckCircle,
    title: "Verifica",
    description: "Ispezione completa da parte di tecnici specializzati. Controllo documentazione, chilometraggio certificato e stato meccanico.",
  },
  {
    number: "03",
    icon: Settings,
    title: "Preparazione",
    description: "La vettura viene preparata con cura: detailing professionale, tagliando se necessario, sanificazione completa degli interni.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Consegna",
    description: "Consegna personalizzata con spiegazione dettagliata delle funzionalità. Assistenza post-vendita sempre disponibile.",
  },
]

export function MethodSection() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium tracking-widest uppercase text-accent">
            Il nostro processo
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-primary-foreground tracking-tight">
            Il Metodo Bernabei
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/70 leading-relaxed">
            Un processo accurato che garantisce la massima qualità e trasparenza in ogni fase.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-primary-foreground/20 -translate-x-1/2" />
              )}
              <div className="p-6 lg:p-8 bg-primary-foreground/5 rounded-sm border border-primary-foreground/10 hover:border-accent/50 transition-colors h-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-serif text-4xl font-light text-accent">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-primary-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-primary-foreground/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
