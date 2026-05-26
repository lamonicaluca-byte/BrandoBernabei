import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { ContactForm } from "./ContactForm"

export const metadata: Metadata = {
  title: "Contatti | Bernabei Automobili",
  description:
    "Contatta Bernabei Automobili: telefono, WhatsApp, email o modulo di contatto. Via Flaminia 318/a, Roma. Risposta entro poche ore.",
}

const contactInfo = [
  {
    icon: Phone,
    title: "Telefono",
    value: "+39 339 502 7983",
    href: "tel:+393395027983",
    description: "Lun–Sab: 9:00–19:00",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+39 339 502 7983",
    href: "https://wa.me/393395027983",
    description: "Risposta rapida",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@bernabeiautomobili.it",
    href: "mailto:info@bernabeiautomobili.it",
    description: "Risposta entro 24h",
  },
  {
    icon: MapPin,
    title: "Indirizzo",
    value: "Via Flaminia, 318/a — Roma",
    href: "https://maps.google.com/?q=Via+Flaminia+318a+00196+Roma",
    description: "Visite su appuntamento",
  },
]

export default function ContattiPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-sm font-medium tracking-widest uppercase text-accent">
                Contatti
              </span>
              <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                Parliamo della tua prossima auto
              </h1>
              <p className="mt-6 text-xl text-primary-foreground/80 leading-relaxed">
                Sono a tua disposizione per qualsiasi domanda. Contattami senza impegno,
                sarò felice di aiutarti.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left: Contact info */}
              <div>
                <h2 className="font-serif text-2xl font-medium text-foreground mb-8">
                  Come contattarmi
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="p-6 bg-card rounded-sm border border-border hover:border-accent/50 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                        <item.icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-foreground group-hover:text-accent transition-colors">
                        {item.value}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </a>
                  ))}
                </div>

                {/* Hours */}
                <div className="mt-8 p-6 bg-secondary rounded-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-foreground">Orari di apertura</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lunedì – Venerdì</span>
                      <span className="text-foreground">9:00 – 19:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sabato</span>
                      <span className="text-foreground">9:00 – 13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Domenica</span>
                      <span className="text-foreground">Chiuso</span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    * Visite su appuntamento anche fuori orario
                  </p>
                </div>
              </div>

              {/* Right: Form */}
              <div>
                <h2 className="font-serif text-2xl font-medium text-foreground mb-8">
                  Inviami un messaggio
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.1!2d12.4731!3d41.9281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f60e8e8d1c0ef%3A0xb180365fb3b1f882!2sVia%20Flaminia%2C%20318%2Fa%2C%2000196%20Roma%20RM!5e0!3m2!1sit!2sit!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bernabei Automobili — Via Flaminia 318/a, Roma"
          />
        </section>
      </main>
      <Footer />
    </>
  )
}
