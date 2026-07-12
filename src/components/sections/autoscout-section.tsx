import { Button } from "@/components/ui/Button"
import { ExternalLink, Star } from "lucide-react"

interface AutoScoutDict {
  overline: string
  title: string
  subtitle: string
  ratingText: string
  ratingStrong: string
  ratingLabel: string
  ctaPrimary: string
  ctaSecondary: string
  statLabel1: string
  statLabel2: string
  statLabel3: string
  quote: string
  quoteAuthor: string
}

export function AutoScoutSection({ dict }: { dict: AutoScoutDict }) {
  return (
    <section className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-gold-brand">
              {dict.overline}
            </span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight">
              {dict.title}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {dict.subtitle}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold-brand text-gold-brand" />
                ))}
              </div>
              <span className="font-semibold text-foreground">4.9 / 5</span>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">
                {dict.ratingText} <strong className="text-foreground">{dict.ratingStrong}</strong> {dict.ratingLabel}
              </span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <a
                  href="https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {dict.ctaPrimary}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border hover:border-accent"
              >
                <a
                  href="https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei/recensioni"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {dict.ctaSecondary}
                </a>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="bg-card border border-border p-8 lg:p-10">
              <div className="font-serif text-8xl lg:text-9xl font-light text-gold-brand leading-none">
                97%
              </div>
              <p className="mt-4 text-muted-foreground">
                {dict.statLabel1}
              </p>
              <p className="mt-6 font-serif text-lg italic text-foreground/70 leading-relaxed border-t border-border pt-6">
                &ldquo;{dict.quote}&rdquo;
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{dict.quoteAuthor}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border p-6 text-center">
                <div className="font-serif text-3xl font-light text-foreground">100+</div>
                <div className="text-xs text-muted-foreground mt-2">{dict.statLabel2}</div>
              </div>
              <div className="bg-card border border-border p-6 text-center">
                <div className="font-serif text-3xl font-light text-foreground">4.9</div>
                <div className="text-xs text-muted-foreground mt-2">{dict.statLabel3}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
