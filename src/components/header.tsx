"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/Button"

const navigation = [
  { name: "Chi Siamo", href: "/chi-siamo" },
  { name: "Vetture", href: "/vetture" },
  { name: "Servizi", href: "/servizi" },
  { name: "Recensioni", href: "/recensioni" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-5 left-0 right-0 z-50 px-4 sm:px-6">
      <div className="relative mx-auto max-w-4xl">
        {/* Pill navbar */}
        <nav
          className={`flex items-center justify-between gap-6 rounded-full border border-white/15 bg-black/65 backdrop-blur-md px-5 py-3 transition-all duration-300 ${
            scrolled ? "shadow-xl shadow-black/30 border-white/20" : ""
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1.5 shrink-0">
            <span className="font-serif text-base font-medium tracking-wide text-white">
              BERNABEI
            </span>
            <span className="text-[8px] tracking-[0.25em] text-white uppercase">
              Automobili
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-7">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white/65 hover:text-white transition-colors tracking-wide"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block shrink-0">
            <Button
              asChild
              size="sm"
              className="rounded-full border border-accent bg-transparent text-accent hover:bg-accent hover:text-black font-medium px-5 text-sm transition-colors"
            >
              <Link href="/contatti">Contattaci</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-1 text-white/75 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Apri menu</span>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full mt-2 left-0 right-0 rounded-2xl border border-white/15 bg-black/80 backdrop-blur-md px-3 py-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/8 rounded-xl transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 mt-1 border-t border-white/10">
              <Button
                asChild
                className="w-full rounded-full bg-accent text-black hover:bg-accent/85 font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link href="/contatti">Contattaci</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
