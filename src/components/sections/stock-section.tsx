import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"

interface StockDict {
  overline: string
  title: string
  subtitle: string
  cta: string
  contactPrompt: string
  contactLink: string
}

interface StockSectionProps {
  dict: StockDict
  lang: string
}

export function StockSection({ dict, lang }: StockSectionProps) {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <span className="text-xs tracking-[0.25em] uppercase text-gold-brand">
          {dict.overline}
        </span>
        <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight">
          {dict.title}
        </h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          {dict.subtitle}
        </p>
        <div className="mt-10">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link href={`/${lang}/vetture`}>
              {dict.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          {dict.contactPrompt}{" "}
          <Link href={`/${lang}/contatti`} className="text-foreground underline underline-offset-4 hover:text-accent transition-colors">
            {dict.contactLink}
          </Link>
        </p>
      </div>
    </section>
  )
}
