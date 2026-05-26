import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/Button"
import { Search, RefreshCw, CreditCard, Shield, Truck, Wrench, ArrowRight, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Servizi | Bernabei Automobili",
  description:
    "Consulenza personalizzata, permuta, finanziamenti, garanzia e consegna in tutta Italia. Assistenza completa prima, durante e dopo l'acquisto.",
}

const services = [
  {
    id: "ricerca",
    icon: Search,
    title: "Ricerca Personalizzata",
    description:
      "Non trovi l'auto dei tuoi sogni? Affidati a noi. Cerchiamo per te la vettura perfetta su tutto il mercato europeo, con ispezione personale prima dell'acquisto.",
    features: [
      "Ricerca su misura delle tue esigenze",
      "Verifica della provenienza e storico",
      "Ispezione personale prima dell'acquisto",
      "Report dettagliato con foto e video",
      "Nessun costo se non trovi l'auto giusta",
    ],
  },
  {
    id: "permuta",
    icon: RefreshCw,
    title: "Permuta",
    description:
      "Hai già un'auto? La valutiamo con serietà e trasparenza. Quotazione chiara, gestione completa del passaggio. Senza sorprese.",
    features: [
      "Valutazione gratuita e senza impegno",
      "Quotazione trasparente e competitiva",
      "Gestione completa del passaggio",
      "Ritiro anche senza acquisto",
      "Pagamento immediato",
    ],
  },
  {
    id: "finanziamenti",
    icon: CreditCard,
    title: "Finanziamenti e Leasing",
    description:
      "Soluzioni di finanziamento personalizzate con istituti selezionati. Gestiamo la pratica direttamente, dall'istruttoria alla firma.",
    features: [
      "Preventivo gratuito immediato",
      "Tassi competitivi dal 3,99%",
      "Durata flessibile fino a 84 mesi",
      "Possibilità di maxirata finale",
      "Approvazione rapida in 24h",
    ],
  },
  {
    id: "garanzia",
    icon: Shield,
    title: "Garanzia",
    description:
      "Tutte le nostre vetture sono coperte da garanzia. Non perché lo impone la legge, ma perché è il minimo che puoi aspettarti da un professionista serio.",
    features: [
      "Garanzia minima 12 mesi inclusa",
      "Estensione disponibile fino a 36 mesi",
      "Copertura completa del motore",
      "Assistenza stradale 24/7",
      "Nessuna franchigia",
    ],
  },
  {
    id: "consegna",
    icon: Truck,
    title: "Consegna in tutta Italia",
    description:
      "Dovunque tu sia, ti raggiungiamo. Consegniamo la tua nuova auto direttamente a casa tua in tutta Italia, con trasportatori di fiducia.",
    features: [
      "Consegna a domicilio",
      "Trasporto su bisarca coperta",
      "Assicurazione durante il trasporto",
      "Tempi certi di consegna",
      "Documentazione gestita da remoto",
    ],
  },
  {
    id: "assistenza",
    icon: Wrench,
    title: "Assistenza Post-Vendita",
    description:
      "Il nostro rapporto non finisce con la vendita. Siamo sempre a tua disposizione per qualsiasi necessità, mesi dopo l'acquisto.",
    features: [
      "Supporto dedicato post-acquisto",
      "Rete di officine convenzionate",
      "Consulenza per manutenzioni",
      "Priorità per clienti Bernabei",
      "Contatto diretto con Brando",
    ],
  },
]

export default function ServiziPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-sm font-medium tracking-widest uppercase text-accent">
                I nostri servizi
              </span>
              <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                Tutto ciò di cui hai bisogno
              </h1>
              <p className="mt-6 text-xl text-primary-foreground/80 leading-relaxed">
                Un&apos;assistenza completa che ti accompagna prima, durante e dopo l&apos;acquisto.
                Perché scegliere Bernabei significa scegliere la tranquillità.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="space-y-16">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-24 grid lg:grid-cols-2 gap-12 items-center"
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-6">
                      <service.icon className="h-7 w-7 text-accent" />
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground tracking-tight">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="mt-8 space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Button
                        asChild
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <Link href={`/contatti?servizio=${encodeURIComponent(service.title)}`}>
                          Richiedi informazioni
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-secondary">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-8">
                          <service.icon className="h-24 w-24 text-accent/20 mx-auto mb-4" />
                          <span className="font-serif text-6xl font-light text-accent/30">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-secondary">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground tracking-tight">
                Hai domande sui nostri servizi?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Siamo a tua disposizione per qualsiasi chiarimento. Contattaci senza impegno.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Link href="/contatti">
                    Contattaci ora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-border hover:border-accent"
                >
                  <a href="tel:+393395027983">Chiamaci: +39 339 502 7983</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
