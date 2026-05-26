import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/Button"
import { Star, ExternalLink, Quote, TrendingUp, Users, ThumbsUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Recensioni | Bernabei Automobili",
  description:
    "Leggi le recensioni dei nostri clienti. Con il 97% di feedback positivi su AutoScout24, la soddisfazione dei nostri clienti parla per noi.",
}

const reviews = [
  {
    id: 1,
    name: "Marco T.",
    location: "Roma",
    rating: 5,
    text: "Brando è stato disponibile, preciso e trasparente in ogni fase. La macchina era esattamente come descritta. Consigliato senza riserve. Non capita spesso di trovare qualcuno così onesto in questo settore.",
    car: "Porsche 911 Carrera",
    date: "Marzo 2024",
    verified: true,
  },
  {
    id: 2,
    name: "Giulia R.",
    location: "Milano",
    rating: 5,
    text: "Professionalità vera, non di facciata. Mi ha aiutato a scegliere la vettura giusta senza mai spingere verso la vendita. Un consulente, non un venditore. Tornerò senz'altro.",
    car: "Mercedes-AMG C63",
    date: "Gennaio 2024",
    verified: true,
  },
  {
    id: 3,
    name: "Luca B.",
    location: "Napoli",
    rating: 5,
    text: "Acquisto da fuori Roma, tutto gestito in modo impeccabile. Consegna puntuale, documentazione perfetta. Un'esperienza come poche. Brando è sempre stato raggiungibile e disponibile.",
    car: "BMW M4 Competition",
    date: "Dicembre 2023",
    verified: true,
  },
  {
    id: 4,
    name: "Fabio M.",
    location: "Roma",
    rating: 5,
    text: "Garanzia rispettata senza discussioni, assistenza post-vendita reale. Torno da Brando ogni volta. È il modo in cui si dovrebbe sempre fare questo lavoro.",
    car: "Audi RS5 Sportback",
    date: "Novembre 2023",
    verified: true,
  },
  {
    id: 5,
    name: "Roberto C.",
    location: "Roma",
    rating: 5,
    text: "Ho acquistato la terza auto da Bernabei Automobili. Ogni volta la stessa qualità, la stessa trasparenza. Prezzo giusto, nessuna sorpresa. Raccomando a tutti.",
    car: "Porsche Cayenne S",
    date: "Settembre 2023",
    verified: true,
  },
  {
    id: 6,
    name: "Elena F.",
    location: "Bologna",
    rating: 5,
    text: "Acquisto completamente da remoto. Brando ha gestito tutto: foto, video, documenti, spedizione. Mi sono fidata e non me ne sono pentita. La vettura era ancora meglio di quanto mostrato.",
    car: "BMW Serie 3",
    date: "Luglio 2023",
    verified: true,
  },
]

const stats = [
  { icon: TrendingUp, value: "97%", label: "Recensioni positive" },
  { icon: Users, value: "500+", label: "Clienti soddisfatti" },
  { icon: ThumbsUp, value: "4.9/5", label: "Valutazione media" },
]

export default function RecensioniPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm font-medium tracking-widest uppercase text-accent">
                  Le nostre recensioni
                </span>
                <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  La soddisfazione dei clienti parla per noi
                </h1>
                <p className="mt-6 text-xl text-primary-foreground/80 leading-relaxed">
                  Oltre 500 clienti ci hanno scelto e il 97% ci consiglia.
                </p>
                <div className="mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <a
                      href="https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei/recensioni"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Vedi tutte su AutoScout24
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="p-6 bg-primary-foreground/5 rounded-sm border border-primary-foreground/10 text-center"
                  >
                    <stat.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                    <div className="font-serif text-3xl font-light text-primary-foreground">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs text-primary-foreground/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-6 bg-card rounded-sm border border-border hover:border-accent/30 transition-colors"
                >
                  <Quote className="h-8 w-8 text-accent/20 mb-4" />
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                    {review.verified && (
                      <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                        Verificata
                      </span>
                    )}
                  </div>
                  <p className="font-serif text-foreground leading-relaxed mb-6 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-border">
                    <div className="font-semibold text-foreground">{review.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {review.location} · {review.car}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{review.date}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href="https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei/recensioni"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Leggi tutte le recensioni verificate su</span>
                <span className="font-semibold">AutoScout24</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-secondary">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground tracking-tight">
                La fiducia si costruisce nel tempo
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Ogni recensione rappresenta un cliente che ha scelto di fidarsi di noi.
                E noi continuiamo a lavorare ogni giorno per meritare quella fiducia.
              </p>
              <div className="mt-8 p-8 bg-card rounded-sm border border-border inline-block">
                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="font-serif text-5xl font-light text-accent">97%</div>
                    <div className="text-sm text-muted-foreground mt-2">Recensioni positive</div>
                  </div>
                  <div className="w-px h-16 bg-border" />
                  <div className="text-left">
                    <div className="font-semibold text-foreground">AutoScout24</div>
                    <div className="text-sm text-muted-foreground">Profilo verificato</div>
                    <div className="flex mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
