import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/Button"
import { ArrowRight, Award, Users, Shield, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Chi Siamo | Bernabei Automobili",
  description:
    "La storia di Bernabei Automobili: oltre 25 anni di esperienza nel settore delle auto premium a Roma. Brando Bernabei seleziona personalmente ogni vettura.",
}

const values = [
  {
    icon: Shield,
    title: "Trasparenza",
    description:
      "Nessuna sorpresa. Ogni difetto, ogni intervento, ogni storia della vettura viene comunicata prima della trattativa.",
  },
  {
    icon: Award,
    title: "Competenza",
    description:
      "25 anni di esperienza diretta nel mercato premium e sportivo. Conoscere le vetture significa riconoscere quelle che meritano.",
  },
  {
    icon: Heart,
    title: "Passione",
    description:
      "Non è solo lavoro: è una passione. Ogni vettura che entra nel nostro stock risponde a criteri precisi di qualità.",
  },
  {
    icon: Users,
    title: "Relazione",
    description:
      "La vendita non è la fine del rapporto. Assistiamo i clienti anche dopo la consegna, per anni.",
  },
]

export default function ChiSiamoPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-sm font-medium tracking-widest uppercase text-accent">
                Chi Siamo
              </span>
              <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                Una passione che diventa professione
              </h1>
              <p className="mt-6 text-xl text-primary-foreground/80 leading-relaxed">
                Dal 1998 accompagniamo i nostri clienti nella scelta della vettura perfetta,
                con competenza, trasparenza e dedizione personale.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-sm font-medium tracking-widest uppercase text-accent">
                  La nostra storia
                </span>
                <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-light text-foreground tracking-tight">
                  Tutto è iniziato con una passione vera
                </h2>
                <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    Bernabei Automobili nasce dalla passione di Brando per il mondo automotive.
                    Quello che è iniziato come una vocazione si è trasformato in una missione:
                    offrire un&apos;esperienza di acquisto completamente diversa da quella
                    della concessionaria tradizionale.
                  </p>
                  <p>
                    Il principio è semplice: trattare ogni cliente come vorremmo essere trattati
                    noi. Nessuna pressione commerciale, nessuna mezza verità. Solo competenza
                    e onestà. Uno stock piccolo non è una limitazione: è una scelta. Ogni
                    vettura deve superare criteri precisi prima di entrare da noi.
                  </p>
                  <p>
                    Oggi, con oltre 500 clienti soddisfatti e un tasso di recensioni positive
                    del 97% su AutoScout24, possiamo dire con orgoglio che la nostra filosofia
                    funziona.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/5] rounded-sm overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                    alt="Brando Bernabei"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-accent px-8 py-6 rounded-sm">
                  <div className="font-serif text-3xl font-light text-accent-foreground">25+</div>
                  <div className="text-sm text-accent-foreground/80">Anni di esperienza</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-secondary">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-medium tracking-widest uppercase text-accent">
                I nostri valori
              </span>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-light text-foreground tracking-tight">
                Perché scegliere Bernabei Automobili
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="p-8 bg-card rounded-sm border border-border hover:border-accent/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                    <value.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-3xl mx-auto text-center px-6">
            <span className="text-sm font-medium tracking-widest uppercase text-accent">
              La nostra filosofia
            </span>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-light text-foreground tracking-tight">
              Non vendiamo auto. Costruiamo relazioni.
            </h2>
            <blockquote className="mt-8 font-serif text-xl text-muted-foreground leading-relaxed italic">
              &ldquo;Quando un cliente entra nel nostro showroom, non vedo una vendita. Vedo
              una persona che sta per fare un investimento importante e merita tutta la mia
              attenzione e onestà. È così che ho sempre lavorato.&rdquo;
            </blockquote>
            <p className="mt-6 font-semibold text-foreground">Brando Bernabei</p>
            <div className="mt-12">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/contatti">
                  Prenota un appuntamento
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
