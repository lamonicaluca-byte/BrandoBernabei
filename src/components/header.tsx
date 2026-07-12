"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface HeaderDict {
  nav: {
    chiSiamo: string
    vetture: string
    servizi: string
    recensioni: string
    contattaci: string
    openMenu: string
  }
}

interface HeaderProps {
  lang: string
  dict: HeaderDict
}

export function Header({ lang, dict }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`

  const navigation = [
    { name: dict.nav.chiSiamo, href: `/${lang}/chi-siamo` },
    { name: dict.nav.vetture, href: `/${lang}/vetture` },
    { name: dict.nav.servizi, href: `/${lang}/servizi` },
    { name: dict.nav.recensioni, href: `/${lang}/recensioni` },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/8"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main nav row */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex flex-col items-start shrink-0">
            <span
              className="font-serif text-white leading-none"
              style={{ fontSize: '22px', fontWeight: 400, letterSpacing: '0.18em' }}
            >
              BERNABEI
            </span>
            <div style={{ height: '0.5px', backgroundColor: 'rgba(255,255,255,0.65)', margin: '5px 0', width: '100%' }} />
            <span
              className="font-serif text-white"
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'justify',
                textAlignLast: 'justify',
                fontSize: '11px',
                fontWeight: 400,
                lineHeight: 1,
              }}
            >
              A U T O M O B I L I
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-7">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors tracking-wide"
              >
                {item.name}
              </Link>
            ))}

            {/* Language switcher desktop */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/15">
              {(['it', 'en', 'fr'] as const).map((l) => (
                <Link
                  key={l}
                  href={pathname.replace(`/${lang}`, `/${l}`)}
                  className="font-sans uppercase transition-colors"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    color: l === lang ? '#C9A96E' : 'rgba(255,255,255,0.45)',
                  }}
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block shrink-0">
            <Button
              asChild
              size="sm"
              className="border-0 text-[#0A0A0A] font-medium px-5 text-sm"
              style={{ background: "linear-gradient(135deg, #E8C97A 0%, #C9A96E 45%, #A07840 100%)" }}
            >
              <Link href={`/${lang}/contatti`}>{dict.nav.contattaci}</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-1 text-white/75 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">{dict.nav.openMenu}</span>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-2.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/8 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Language switcher mobile */}
          <div className="flex items-center gap-3 px-4 py-2">
            {(['it', 'en', 'fr'] as const).map((l) => (
              <Link
                key={l}
                href={pathname.replace(`/${lang}`, `/${l}`)}
                className="font-sans uppercase transition-colors"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: l === lang ? '#C9A96E' : 'rgba(255,255,255,0.45)',
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {l}
              </Link>
            ))}
          </div>

          <div className="pt-2 mt-1 border-t border-white/10">
            <Button
              asChild
              className="w-full border-0 text-[#0A0A0A] font-medium"
              style={{ background: "linear-gradient(135deg, #E8C97A 0%, #C9A96E 45%, #A07840 100%)" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href={`/${lang}/contatti`}>{dict.nav.contattaci}</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
