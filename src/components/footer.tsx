import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

interface FooterDict {
  nav: {
    chiSiamo: string
    vetture: string
    servizi: string
    recensioni: string
    contattaci: string
  }
  footer: {
    description: string
    navTitle: string
    servicesTitle: string
    contactTitle: string
    autoscoutLabel: string
    autoscoutPositive: string
    copyright: string
    services: Array<{ name: string; hash: string }>
  }
}

interface FooterProps {
  lang: string
  dict: FooterDict
}

export function Footer({ lang, dict }: FooterProps) {
  const d = dict.footer

  const mainNav = [
    { name: dict.nav.chiSiamo, href: `/${lang}/chi-siamo` },
    { name: dict.nav.vetture, href: `/${lang}/vetture` },
    { name: dict.nav.servizi, href: `/${lang}/servizi` },
    { name: dict.nav.recensioni, href: `/${lang}/recensioni` },
    { name: dict.nav.contattaci, href: `/${lang}/contatti` },
  ]

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${lang}`} className="inline-block">
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
              {d.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-accent">
              {d.navTitle}
            </h3>
            <ul className="mt-6 space-y-3">
              {mainNav.map((item) => (
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
              {d.servicesTitle}
            </h3>
            <ul className="mt-6 space-y-3">
              {d.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={`/${lang}/servizi#${item.hash}`}
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
              {d.contactTitle}
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
                <span className="text-xs text-primary-foreground/60 uppercase tracking-wider">{d.autoscoutLabel}</span>
                <span className="font-semibold text-primary-foreground">AutoScout24</span>
              </div>
              <div className="flex items-center gap-1 text-accent">
                <span className="text-lg font-bold">97%</span>
                <span className="text-xs text-primary-foreground/60">{d.autoscoutPositive}</span>
              </div>
            </a>
            <div className="text-center sm:text-right">
              <p className="text-xs text-primary-foreground/50">
                © {new Date().getFullYear()} Bernabei Automobili di Brando Bernabei. {d.copyright}
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
