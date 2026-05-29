import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { ContactForm } from "./ContactForm"
import { getDictionary } from "../../i18n"
import type { Locale } from "../layout"

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return { title: dict.meta.contatti.title, description: dict.meta.contatti.description }
}

export default async function ContattiPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const d = dict.contatti

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
      value: "Via Flaminia, 318/a, Roma",
      href: "https://maps.app.goo.gl/EhJjdfo2syPRQTgKA",
      description: "Visite su appuntamento",
    },
  ]

  return (
    <>
      <Header lang={lang} dict={dict} />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-sm font-medium tracking-widest uppercase text-accent">
                {d.overline}
              </span>
              <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                {d.title}
              </h1>
              <p className="mt-6 text-xl text-primary-foreground/80 leading-relaxed">
                {d.subtitle}
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
                  {d.howTitle}
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
                    <h3 className="font-semibold text-foreground">{d.hoursTitle}</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{d.weekdays}</span>
                      <span className="text-foreground">9:00 – 19:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{d.saturday}</span>
                      <span className="text-foreground">9:00 – 13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{d.sunday}</span>
                      <span className="text-foreground">{d.closed}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {d.appointmentNote}
                  </p>
                </div>
              </div>

              {/* Right: Form */}
              <div>
                <h2 className="font-serif text-2xl font-medium text-foreground mb-8">
                  {d.formTitle}
                </h2>
                <ContactForm dict={dict.contatti} />
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="h-96">
          <iframe
            src="https://maps.google.com/maps?q=Bernabei+Automobili+di+Brando+Bernabei+Via+Flaminia+318a+Roma&output=embed&hl=it&z=17"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={d.mapTitle}
          />
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  )
}
