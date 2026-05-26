import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

const navigation = {
  main: [
    { name: "Chi Siamo", href: "/chi-siamo" },
    { name: "Vetture", href: "/vetture" },
    { name: "Servizi", href: "/servizi" },
    { name: "Recensioni", href: "/recensioni" },
    { name: "Contatti", href: "/contatti" },
  ],
  services: [
    { name: "Ricerca Personalizzata", href: "/servizi#ricerca" },
    { name: "Permuta", href: "/servizi#permuta" },
    { name: "Finanziamenti", href: "/servizi#finanziamenti" },
    { name: "Garanzia", href: "/servizi#garanzia" },
    { name: "Consegna Italia", href: "/servizi#consegna" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-medium tracking-wide text-primary-foreground">
                  BERNABEI
                </span>
                <span className="text-[10px] tracking-[0.3em] text-primary-foreground/70 uppercase">
                  Automobili
                </span>
              </div>
            </Link>
            <p className="mt-6 text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
              Selezione accurata di vetture premium e sportive. Trasparenza, competenza e assistenza personalizzata.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-accent">
              Navigazione
            </h3>
            <ul className="mt-6 space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-accent">
              Servizi
            </h3>
            <ul className="mt-6 space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-accent">
              Contatti
            </h3>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="tel:+393395027983"
                  className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  +39 339 502 7983
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@bernabeiautomobili.it"
                  className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="h-4 w-4 text-accent" />
                  info@bernabeiautomobili.it
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-primary-foreground/70">
                  <MapPin className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>Via Flaminia, 318/a<br />00196 Roma (RM)</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* AutoScout24 Trust Badge */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <a
              href="https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-primary-foreground/10 rounded-sm hover:bg-primary-foreground/20 transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-xs text-primary-foreground/60 uppercase tracking-wider">Seguici su</span>
                <span className="font-semibold text-primary-foreground">AutoScout24</span>
              </div>
              <div className="flex items-center gap-1 text-accent">
                <span className="text-lg font-bold">97%</span>
                <span className="text-xs text-primary-foreground/60">positivo</span>
              </div>
            </a>
            <div className="text-center sm:text-right">
              <p className="text-xs text-primary-foreground/50">
                © {new Date().getFullYear()} Bernabei Automobili di Brando Bernabei. Tutti i diritti riservati.
              </p>
              <p className="text-xs text-primary-foreground/40 mt-1">
                P.IVA 15074791003
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
