"use client"

import Link from "next/link"
import { useState, useEffect, useCallback, useRef } from "react"
import { usePathname } from "next/navigation"
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
  const pathname = usePathname()
  const isHome = pathname === '/'

  const bernabeiRef = useRef<HTMLSpanElement>(null)
  const automobiliRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const adjustWidth = useCallback(() => {
    const bernabei = bernabeiRef.current
    const automobili = automobiliRef.current
    if (!bernabei || !automobili) return

    const target = bernabei.getBoundingClientRect().width

    let size = 11
    automobili.style.fontSize = `${size}px`
    let current = automobili.getBoundingClientRect().width
    if (Math.abs(current - target) < 0.05) return

    const step = current < target ? 0.05 : -0.05

    while (size > 1 && size < 60) {
      const next = +(size + step).toFixed(4)
      automobili.style.fontSize = `${next}px`
      const nextW = automobili.getBoundingClientRect().width
      if (step > 0 ? nextW >= target : nextW <= target) {
        if (Math.abs(nextW - target) < Math.abs(current - target)) size = next
        break
      }
      size = next
      current = nextW
    }

    automobili.style.fontSize = `${size}px`
  }, [])

  useEffect(() => {
    adjustWidth()
    const ro = new ResizeObserver(adjustWidth)
    if (bernabeiRef.current) ro.observe(bernabeiRef.current)
    window.addEventListener("resize", adjustWidth)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", adjustWidth)
    }
  }, [adjustWidth])

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
          <Link href="/" className="flex flex-col items-start shrink-0">
            <span
              ref={bernabeiRef}
              className="font-serif text-white leading-none"
              style={{ fontSize: '22px', fontWeight: 400, letterSpacing: '0.18em' }}
            >
              BERNABEI
            </span>
            <div style={{ height: '0.5px', backgroundColor: 'rgba(255,255,255,0.65)', margin: '5px 0', width: '100%' }} />
            <span
              ref={automobiliRef}
              className="font-serif text-white leading-none"
              style={{ fontSize: '11px', fontWeight: 400, letterSpacing: '0.45em' }}
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
              className="border-0 text-[#0A0A0A] font-medium px-5 text-sm"
              style={{ background: "linear-gradient(135deg, #E8C97A 0%, #C9A96E 45%, #A07840 100%)" }}
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
        </div>
      </div>

      {/* Mobile dropdown, full width, dark bg */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/8 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2 mt-1 border-t border-white/10">
            <Button
              asChild
              className="w-full border-0 text-[#0A0A0A] font-medium"
              style={{ background: "linear-gradient(135deg, #E8C97A 0%, #C9A96E 45%, #A07840 100%)" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="/contatti">Contattaci</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
