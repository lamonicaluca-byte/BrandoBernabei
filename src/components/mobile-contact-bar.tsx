"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageCircle, Phone, CalendarCheck } from "lucide-react"
import { PHONE_TEL, fillTemplate, whatsappUrl } from "@/lib/whatsapp"

interface MobileContactBarProps {
  lang: string
  labels: { call: string; whatsapp: string; book: string; message: string }
}

/** Barra fissa in basso su telefono: chiamare, scrivere su WhatsApp o prenotare una visita senza cercare i pulsanti. */
export function MobileContactBar({ lang, labels }: MobileContactBarProps) {
  const pathname = usePathname()
  if (pathname.endsWith("/contatti")) return null

  // sulla scheda di un'auto, "Prenota visita" porta al modulo già compilato con quell'auto
  const carMatch = pathname.match(/\/vetture\/([^/]+)$/)
  const bookHref = carMatch
    ? `/${lang}/contatti?visita=1&auto=${encodeURIComponent(carMatch[1])}`
    : `/${lang}/contatti`
  const pageUrl = `https://www.bernabeiautomobili.com${pathname}`
  const whatsapp = whatsappUrl(fillTemplate(labels.message, { url: pageUrl }))

  const base = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white/90 active:bg-white/10"

  return (
    <>
      {/* spazio in fondo alla pagina, così la barra non copre il footer */}
      <div className="h-16 bg-primary lg:hidden" aria-hidden="true" />
      <nav
        aria-label={labels.call}
        className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-white/15 bg-[#0A0A0A]/95 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <a href={PHONE_TEL} className={base}>
          <Phone className="h-5 w-5" aria-hidden="true" />
          {labels.call}
        </a>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={`${base} border-x border-white/10`}>
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          {labels.whatsapp}
        </a>
        <Link
          href={bookHref}
          className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0A0A0A]"
          style={{ background: "linear-gradient(135deg, #E8C97A 0%, #C9A96E 45%, #A07840 100%)" }}
        >
          <CalendarCheck className="h-5 w-5" aria-hidden="true" />
          {labels.book}
        </Link>
      </nav>
    </>
  )
}
