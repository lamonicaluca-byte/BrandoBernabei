"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef } from "react"
import { X } from "lucide-react"
import { groupChapters } from "@/lib/gallery"
import type { GalleryLabels, GalleryPhoto } from "./types"

interface GalleryGridProps {
  photos: GalleryPhoto[]
  labels: GalleryLabels
  /** Vero quando sopra la griglia è aperto il lightbox: la griglia resta montata ma non è raggiungibile */
  covered: boolean
  /** Indice dell'ultima foto vista nel lightbox: alla chiusura la griglia vi scorre */
  focusIndex: number | null
  onOpenPhoto: (index: number) => void
  onClose: () => void
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Foto in colonna raggruppate per capitolo, a schermo intero. Si carica solo alla prima apertura. */
export function GalleryGrid({ photos, labels, covered, focusIndex, onOpenPhoto, onClose }: GalleryGridProps) {
  const root = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const groups = useMemo(() => groupChapters(photos), [photos])
  const showChips = groups.length > 1

  // all'apertura il focus va al pulsante di chiusura
  useEffect(() => {
    closeButton.current?.focus()
  }, [])

  // Esc chiude, Tab resta dentro l'overlay (focus trap). Con il lightbox aperto ci pensa PhotoSwipe.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (covered) return
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== "Tab" || !root.current) return
      const items = Array.from(root.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [covered, onClose])

  // chiuso il lightbox, la griglia scorre fino all'ultima foto guardata
  useEffect(() => {
    if (covered || focusIndex === null) return
    scroller.current?.querySelector<HTMLElement>(`[data-photo="${focusIndex}"]`)?.scrollIntoView({ block: "center" })
  }, [covered, focusIndex])

  const jump = (key: string) => {
    const el = scroller.current?.querySelector<HTMLElement>(`[data-chapter="${key}"]`)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
  }

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={labels.allPhotosTitle}
      inert={covered}
      className="fixed inset-0 z-[60] flex flex-col bg-background"
    >
      <header className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border bg-background px-4 py-2">
        <h2 className="min-w-0 flex-1 font-serif text-xl text-foreground">{labels.allPhotosTitle}</h2>
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="order-2 flex h-11 w-11 shrink-0 items-center justify-center text-foreground hover:bg-secondary"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        {showChips && (
          <nav aria-label={labels.chaptersNav} className="order-3 flex w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {groups.map((g) => (
              <button
                key={g.key}
                type="button"
                onClick={() => jump(g.key)}
                className="min-h-11 shrink-0 border border-border px-4 text-sm text-foreground transition-colors duration-200 ease-out hover:border-foreground motion-reduce:transition-none"
              >
                {labels.chapters[g.key]} {g.count}
              </button>
            ))}
          </nav>
        )}
      </header>

      <div ref={scroller} className="flex-1 overflow-y-auto overscroll-contain px-4 pb-10">
        {groups.map((g) => (
          <section key={g.key} data-chapter={g.key} className="pt-8">
            <h3 className="mb-4 font-serif text-2xl font-light text-foreground">
              {labels.chapters[g.key]} <span className="text-base text-muted-foreground">{g.count}</span>
            </h3>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {photos.slice(g.first, g.first + g.count).map((photo, offset) => {
                const index = g.first + offset
                return (
                  <button
                    key={photo.src}
                    type="button"
                    data-photo={index}
                    aria-haspopup="dialog"
                    onClick={() => onOpenPhoto(index)}
                    className="relative block overflow-hidden bg-secondary"
                    style={{
                      aspectRatio: `${photo.width} / ${photo.height}`,
                      ...(photo.blur ? { backgroundImage: `url(${photo.blur})`, backgroundSize: "cover" } : {}),
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
