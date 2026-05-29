interface Step {
  number: string
  title: string
  description: string
}

interface MethodDict {
  overline: string
  title: string
  subtitle: string
  steps: Step[]
}

export function MethodSection({ dict }: { dict: MethodDict }) {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <span className="text-xs tracking-[0.25em] uppercase text-accent/80">
            {dict.overline}
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-primary-foreground tracking-tight">
            {dict.title}
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/60 leading-relaxed">
            {dict.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {dict.steps.map((step) => (
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
