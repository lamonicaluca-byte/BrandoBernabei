"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react"
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { groupChapters } from "@/lib/gallery"
import { fillTemplate, whatsappUrl } from "@/lib/whatsapp"
import type { GalleryLabels, GalleryPhoto } from "./types"

// Griglia e lightbox pesano: si scaricano solo quando l'utente li apre.
const GalleryGrid = dynamic(() => import("./gallery-grid").then((m) => m.GalleryGrid), { ssr: false })
const Lightbox = dynamic(() => import("./lightbox").then((m) => m.Lightbox), { ssr: false })

type Layer = "none" | "grid" | "lightbox"

interface VehicleGalleryProps {
  photos: GalleryPhoto[]
  labels: GalleryLabels
  /** "Porsche 911 2023", per i messaggi WhatsApp */
  carName: string
  bookHref: string
}

const goldGradient = "linear-gradient(135deg, #E8C97A 0%, #C9A96E 45%, #A07840 100%)"
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

// Le miniature servono solo da desktop: su telefono non si creano (meno DOM e meno lavoro all'avvio).
const DESKTOP = "(min-width: 1024px)"
function subscribeDesktop(onChange: () => void) {
  const query = window.matchMedia(DESKTOP)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}
const useIsDesktop = () =>
  useSyncExternalStore(subscribeDesktop, () => window.matchMedia(DESKTOP).matches, () => false)

export function VehicleGallery({ photos, labels, carName, bookHref }: VehicleGalleryProps) {
  const total = photos.length
  const isDesktop = useIsDesktop()
  const track = useRef<HTMLDivElement>(null)
  const slides = useRef<Array<HTMLDivElement | null>>([])
  const opener = useRef<HTMLElement | null>(null)

  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0, 1]))
  const [layer, setLayer] = useState<Layer>("none")
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [focusIndex, setFocusIndex] = useState<number | null>(null)

  const groups = useMemo(() => groupChapters(photos), [photos])
  const showChapters = groups.length > 1
  const onAction = active >= total // l'ultima slide è la card d'azione
  const current = photos[Math.min(active, total - 1)]
  const currentGroup = groups.find((g) => current && g.key === current.chapter)

  // la slide visibile è quella con la quota maggiore dentro il carosello (IntersectionObserver)
  useEffect(() => {
    const root = track.current
    if (!root) return
    const ratios = new Map<number, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) ratios.set(Number((entry.target as HTMLElement).dataset.slide), entry.intersectionRatio)
        let best = -1
        let bestRatio = 0
        ratios.forEach((ratio, index) => {
          if (ratio > bestRatio) {
            best = index
            bestRatio = ratio
          }
        })
        if (best >= 0) {
          setActive(best)
          // si caricano solo la slide visibile e le due vicine; quelle già caricate restano
          setLoaded((prev) => {
            const next = new Set(prev)
            for (const i of [best - 1, best, best + 1]) if (i >= 0 && i < total) next.add(i)
            return next.size === prev.size ? prev : next
          })
        }
      },
      { root, threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    root.querySelectorAll("[data-slide]").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [total])

  const goTo = useCallback((index: number) => {
    const el = slides.current[index]
    if (el) track.current?.scrollTo({ left: el.offsetLeft, behavior: prefersReducedMotion() ? "auto" : "smooth" })
  }, [])

  // ---- livelli sovrapposti e tasto indietro -------------------------------------------------
  // Ogni livello aperto aggiunge una voce alla cronologia: "indietro" chiude l'ultimo livello e non esce dalla pagina.
  const push = (level: 1 | 2, hash: string, extra?: Record<string, number>) =>
    window.history.pushState({ ...window.history.state, gl: level, ...extra }, "", hash)

  const openGrid = (fromPhoto: number | null) => {
    opener.current = document.activeElement as HTMLElement | null
    setFocusIndex(fromPhoto)
    push(1, "#foto")
    setLayer("grid")
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setFocusIndex(index)
    push(2, `#foto-${index + 1}`, { i: index })
    setLayer("lightbox")
  }

  const closeTop = useCallback(() => window.history.back(), [])

  useEffect(() => {
    const onPop = (event: PopStateEvent) => {
      const state = event.state as { gl?: number; i?: number } | null
      const level = state?.gl ?? 0
      if (level === 0) setLayer("none")
      else if (level === 1) setLayer("grid")
      else {
        setLightboxIndex(state?.i ?? 0)
        setLayer("lightbox")
      }
    }
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  // sfondo bloccato finché c'è un overlay; alla chiusura il focus torna dove era
  useEffect(() => {
    if (layer === "none") {
      opener.current?.focus?.()
      return
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [layer])

  // aperta la griglia, il lightbox si scarica in anticipo: al tocco successivo è immediato
  useEffect(() => {
    if (layer === "grid") void import("./lightbox")
  }, [layer])

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      goTo(Math.min(active + 1, total))
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      goTo(Math.max(active - 1, 0))
    }
  }

  if (total === 0) return null

  const counter = current
    ? fillTemplate(labels.counter, {
        chapter: labels.chapters[current.chapter],
        n: currentGroup ? active - currentGroup.first + 1 : active + 1,
        total: currentGroup ? currentGroup.count : total,
      })
    : ""

  return (
    // min-w-0: senza, il carosello (largo quanto tutte le slide) allarga la colonna della pagina e crea uno scorrimento orizzontale
    <div className="min-w-0 max-w-full">
      {showChapters && (
        <nav aria-label={labels.chaptersNav} className="mb-3 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {groups.map((g) => {
            const isActive = !onAction && current?.chapter === g.key
            return (
              <button
                key={g.key}
                type="button"
                aria-pressed={isActive}
                onClick={() => goTo(g.first)}
                className={`min-h-11 shrink-0 border px-4 text-sm transition-colors duration-200 ease-out motion-reduce:transition-none ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-foreground"
                }`}
              >
                {labels.chapters[g.key]} {g.count}
              </button>
            )
          })}
        </nav>
      )}

      <div className="relative">
        <div
          ref={track}
          role="region"
          aria-roledescription="carousel"
          aria-label={labels.label}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="relative flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain lg:gap-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              ref={(el) => {
                slides.current[i] = el
              }}
              data-slide={i}
              role="group"
              aria-roledescription="slide"
              aria-label={fillTemplate(labels.slide, { n: i + 1, total })}
              className="relative aspect-[4/3] shrink-0 basis-[88%] snap-start overflow-hidden bg-secondary lg:basis-full"
              style={photo.blur ? { backgroundImage: `url(${photo.blur})`, backgroundSize: "cover" } : undefined}
            >
              <button
                type="button"
                aria-label={photo.alt}
                aria-haspopup="dialog"
                onClick={() => openGrid(i)}
                className="absolute inset-0 block h-full w-full"
              >
                {loaded.has(i) && (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    priority={i === 0}
                    fetchPriority={i === 0 ? "high" : undefined}
                    sizes="(max-width: 768px) 88vw, 66vw"
                    className="object-cover"
                  />
                )}
              </button>
            </div>
          ))}

          <div
            data-slide={total}
            ref={(el) => {
              slides.current[total] = el
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={labels.actionTitle}
            className="relative flex aspect-[4/3] shrink-0 basis-[88%] snap-start flex-col items-center justify-center gap-4 bg-primary px-6 text-center text-primary-foreground lg:basis-full"
          >
            <h3 className="font-serif text-2xl font-light sm:text-3xl">{labels.actionTitle}</h3>
            <p className="max-w-sm text-sm text-primary-foreground/80">{labels.actionText}</p>
            <div className="flex w-full max-w-xs flex-col gap-3">
              <Button asChild size="lg" className="border-0 font-medium text-[#0A0A0A]" style={{ background: goldGradient }}>
                <Link href={bookHref}>{labels.actionBook}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                <a
                  href={whatsappUrl(fillTemplate(labels.videoMessage, { car: carName }))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {labels.actionVideo}
                </a>
              </Button>
            </div>
          </div>
        </div>

        {!onAction && (
          <span className="pointer-events-none absolute bottom-3 right-3 bg-black/70 px-2.5 py-1 text-xs tabular-nums text-white">
            {counter}
          </span>
        )}

        <button
          type="button"
          onClick={() => goTo(Math.max(active - 1, 0))}
          aria-label={labels.previous}
          disabled={active === 0}
          className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center bg-black/60 text-white transition-opacity duration-200 hover:bg-black/80 disabled:opacity-30 lg:flex"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goTo(Math.min(active + 1, total))}
          aria-label={labels.next}
          disabled={onAction}
          className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center bg-black/60 text-white transition-opacity duration-200 hover:bg-black/80 disabled:opacity-30 lg:flex"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-3 hidden lg:block lg:h-[72px]">
        {isDesktop && total > 1 && (
          <ul className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {photos.map((photo, i) => (
              <li key={photo.src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={photo.alt}
                  aria-current={i === active}
                  className={`relative block h-[72px] w-24 overflow-hidden border bg-secondary transition-opacity duration-200 ${
                    i === active ? "border-foreground" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={photo.src} alt={photo.alt} width={96} height={72} sizes="96px" className="h-full w-full object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        onClick={() => openGrid(null)}
        aria-haspopup="dialog"
        className="mt-3 inline-flex min-h-11 items-center gap-2 border border-border bg-card px-4 text-sm text-foreground transition-colors duration-200 ease-out hover:border-foreground motion-reduce:transition-none"
      >
        <LayoutGrid className="h-4 w-4" aria-hidden="true" />
        {fillTemplate(labels.allPhotos, { n: total })}
      </button>

      {layer !== "none" && (
        <GalleryGrid
          photos={photos}
          labels={labels}
          covered={layer === "lightbox"}
          focusIndex={focusIndex}
          onOpenPhoto={openLightbox}
          onClose={closeTop}
        />
      )}
      {layer === "lightbox" && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          labels={labels}
          carName={carName}
          onClosed={closeTop}
          onChange={(i) => {
            setFocusIndex(i)
            window.history.replaceState({ ...window.history.state, gl: 2, i }, "", `#foto-${i + 1}`)
          }}
        />
      )}
    </div>
  )
}
