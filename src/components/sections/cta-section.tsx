import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Phone, MessageCircle, ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Quote */}
          <div>
            <blockquote className="font-serif text-3xl sm:text-4xl font-light text-foreground leading-snug tracking-tight">
              &ldquo;Quando un cliente mi contatta, non vedo una vendita. Vedo una persona che sta per fare un investimento importante e merita tutta la mia attenzione.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm text-muted-foreground tracking-wide">
              Brando Bernabei, fondatore
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Hai trovato la vettura giusta o vuoi una consulenza? Contattami direttamente. Senza intermediari, senza pressioni commerciali.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground justify-start px-6"
              >
                <a href="tel:+393395027983">
                  <Phone className="mr-3 h-5 w-5 shrink-0" />
                  Chiamami: +39 339 502 7983
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border hover:border-accent justify-start px-6"
              >
                <a
                  href="https://wa.me/393395027983"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-3 h-5 w-5 shrink-0" />
                  Scrivimi su WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-muted-foreground hover:text-foreground justify-start px-6"
              >
                <Link href="/contatti">
                  Invia un messaggio
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
