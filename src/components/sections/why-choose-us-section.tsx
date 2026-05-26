import { Star, ThumbsUp, Award, Users } from "lucide-react"

const stats = [
  {
    icon: Star,
    value: "97%",
    label: "Recensioni positive",
    description: "Su AutoScout24",
  },
  {
    icon: Users,
    value: "500+",
    label: "Clienti soddisfatti",
    description: "Negli ultimi anni",
  },
  {
    icon: Award,
    value: "25+",
    label: "Anni di esperienza",
    description: "Nel settore automotive",
  },
  {
    icon: ThumbsUp,
    value: "100%",
    label: "Vetture garantite",
    description: "Con certificazione",
  },
]

const qualities = [
  "Professionalità",
  "Affidabilità",
  "Competenza",
  "Disponibilità",
  "Attenzione al cliente",
  "Assistenza post-vendita",
  "Trasparenza",
  "Serietà",
]

export function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium tracking-widest uppercase text-accent">
            La nostra garanzia
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight">
            Perché i clienti ci scelgono
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Le parole più usate dai nostri clienti nelle recensioni su AutoScout24 descrivono il nostro approccio al lavoro.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 lg:p-8 bg-card rounded-sm border border-border text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                <stat.icon className="h-6 w-6 text-accent" />
              </div>
              <div className="font-serif text-3xl lg:text-4xl font-light text-foreground">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-foreground">
                {stat.label}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Qualities */}
        <div className="flex flex-wrap justify-center gap-3">
          {qualities.map((quality, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-card border border-border rounded-full text-sm text-foreground hover:border-accent/50 hover:bg-accent/5 transition-colors cursor-default"
            >
              {quality}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
