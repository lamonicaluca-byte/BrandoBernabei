import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Phone, MessageCircle } from "lucide-react"

const goldGradient = 'linear-gradient(135deg, #E8C97A 0%, #C9A96E 45%, #A07840 100%)'

interface CTADict {
  quote: string
  quoteAuthor: string
  subtitle: string
  cta1: string
  cta2: string
  cta3: string
}

interface CTASectionProps {
  dict: CTADict
  lang: string
}

export function CTASection({ dict, lang }: CTASectionProps) {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Quote */}
          <div>
            <blockquote className="font-serif text-3xl sm:text-4xl font-light text-foreground leading-snug tracking-tight">
              &ldquo;{dict.quote}&rdquo;
            </blockquote>
            <p className="mt-6 text-sm text-muted-foreground tracking-wide">
              {dict.quoteAuthor}
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {dict.subtitle}
            </p>
            <div className="flex flex-col gap-3">
              <Button
                asChild
                size="lg"
                className="border-0 text-[#0A0A0A] font-medium justify-start px-6 hover:opacity-90"
                style={{ background: goldGradient }}
              >
                <a href="tel:+393395027983">
                  <Phone className="mr-3 h-5 w-5 shrink-0" />
                  {dict.cta1}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="border-0 text-[#0A0A0A] font-medium justify-start px-6 hover:opacity-90"
                style={{ background: goldGradient }}
              >
                <a
                  href="https://wa.me/393395027983"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-3 h-5 w-5 shrink-0" />
                  {dict.cta2}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="border-0 text-[#0A0A0A] font-medium justify-start px-6 hover:opacity-90"
                style={{ background: goldGradient }}
              >
                <Link href={`/${lang}/contatti`}>
                  {dict.cta3}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
