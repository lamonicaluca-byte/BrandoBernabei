"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "Vetture", href: "/vetture" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Servizi", href: "/servizi" },
  { label: "Recensioni", href: "/recensioni" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-luxury-black h-[52px] px-8 flex items-center justify-between transition-all duration-300 ${
        scrolled ? "border-b border-[0.5px] border-[#1E1E1E]" : ""
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex flex-col leading-none">
        <span className="font-display text-champagne-gold text-[18px] font-light tracking-wide">
          Bernabei Automobili
        </span>
        <span className="font-body text-[9px] text-[#8A8A8A] tracking-[0.15em] uppercase mt-0.5">
          Roma · Dal 1998
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-body text-[10px] tracking-[0.18em] uppercase text-muted-grey hover:text-warm-white transition-colors duration-200"
          >
            {link.label}
          </Link>
        ))}
        <Button href="/contatti" variant="outline-gold" className="ml-4">
          Contatti
        </Button>
      </nav>

      {/* Mobile menu button */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Apri menu"
      >
        <span
          className={`block w-5 h-px bg-warm-white transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
        />
        <span
          className={`block w-5 h-px bg-warm-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-5 h-px bg-warm-white transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
        />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-[52px] left-0 right-0 bg-luxury-black border-t border-[#1E1E1E] py-6 px-8 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-[10px] tracking-[0.18em] uppercase text-muted-grey hover:text-warm-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contatti" variant="outline-gold" className="self-start mt-2">
            Contatti
          </Button>
        </div>
      )}
    </header>
  );
}
