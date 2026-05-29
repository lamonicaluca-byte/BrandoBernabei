interface Pillar {
  number: string
  title: string
  description: string
}

interface Stat {
  value: string
  label: string
}

interface WhyChooseUsDict {
  overline: string
  title: string
  pillars: Pillar[]
  stats: Stat[]
}

export function WhyChooseUsSection({ dict }: { dict: WhyChooseUsDict }) {
  return (
    <section className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <span className="text-xs tracking-[0.25em] uppercase text-accent/80">
            {dict.overline}
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight">
            {dict.title}
          </h2>
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {dict.pillars.map((pillar) => (
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
          {dict.stats.map((stat, index) => (
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
