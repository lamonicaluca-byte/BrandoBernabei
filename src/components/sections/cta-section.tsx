import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Phone, MessageCircle } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative bg-primary rounded-sm overflow-hidden">
          {/* Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative px-8 py-16 lg:px-16 lg:py-24 text-center">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-primary-foreground tracking-tight max-w-3xl mx-auto">
              Cerchi la tua prossima auto?
              <span className="block text-accent italic mt-2">Parliamone insieme.</span>
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Contattami per una consulenza gratuita. Ti aiuterò a trovare la vettura perfetta per le tue esigenze, senza impegno.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8"
              >
                <a href="tel:+393395027983">
                  <Phone className="mr-2 h-5 w-5" />
                  Chiamami ora
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent px-8"
              >
                <a
                  href="https://wa.me/393395027983"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Scrivimi su WhatsApp
                </a>
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-primary-foreground/10 inline-block">
              <p className="text-sm text-primary-foreground/50">— Brando Bernabei</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
