"use client"

import { useEffect, useRef } from "react"
import PhotoSwipe from "photoswipe"
import "photoswipe/dist/photoswipe.css"
import { groupChapters } from "@/lib/gallery"
import { fillTemplate, whatsappUrl } from "@/lib/whatsapp"
import type { GalleryLabels, GalleryPhoto } from "./types"

interface LightboxProps {
  photos: GalleryPhoto[]
  index: number
  labels: GalleryLabels
  /** "Porsche 911 2023": va nel messaggio WhatsApp */
  carName: string
  /** Chiamata quando l'utente chiude il lightbox (swipe verso il basso, Esc, pulsante) */
  onClosed: () => void
  /** Chiamata a ogni cambio di foto */
  onChange: (index: number) => void
}

/** Lightbox a schermo intero. Viene caricato solo quando serve (import dinamico dal carosello). */
export function Lightbox({ photos, index, labels, carName, onClosed, onChange }: LightboxProps) {
  // i callback cambiano a ogni render del genitore: li teniamo in un riferimento per non ricreare PhotoSwipe
  const callbacks = useRef({ onClosed, onChange })
  useEffect(() => {
    callbacks.current = { onClosed, onChange }
  })

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const groups = groupChapters(photos)
    const describe = (i: number) => {
      const g = [...groups].reverse().find((x) => x.first <= i) ?? groups[0]
      return { chapter: labels.chapters[g.key], n: i - g.first + 1 }
    }
    const messageFor = (i: number) => {
      const { chapter, n } = describe(i)
      return whatsappUrl(fillTemplate(labels.photoMessage, { car: carName, chapter, n }))
    }

    const pswp = new PhotoSwipe({
      dataSource: photos.map((p) => ({ src: p.src, width: p.width, height: p.height, alt: p.alt })),
      index,
      bgOpacity: 0.96,
      showHideAnimationType: "fade",
      showAnimationDuration: reduce ? 0 : 200,
      hideAnimationDuration: reduce ? 0 : 200,
      zoomAnimationDuration: reduce ? 0 : 200,
      easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
      preload: [1, 1],
      closeOnVerticalDrag: true,
      pinchToClose: true,
      wheelToZoom: true,
      returnFocus: true,
      trapFocus: true,
      indexIndicatorSep: " / ",
      closeTitle: labels.close,
      zoomTitle: labels.zoom,
      arrowPrevTitle: labels.previous,
      arrowNextTitle: labels.next,
      errorMsg: labels.loadError,
    })

    pswp.on("uiRegister", () => {
      pswp.ui?.registerElement({
        name: "ask-photo",
        order: 9,
        isButton: false,
        appendTo: "root",
        html:
          '<div style="position:absolute;left:0;right:0;bottom:0;z-index:10;padding:12px 16px calc(12px + env(safe-area-inset-bottom));background:linear-gradient(to top,rgba(0,0,0,.78),rgba(0,0,0,0))">' +
          '<a data-ask style="display:flex;align-items:center;justify-content:center;min-height:48px;padding:0 20px;font:500 14px/1 var(--font-inter),system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;color:#0A0A0A;background:linear-gradient(135deg,#E8C97A 0%,#C9A96E 45%,#A07840 100%)" target="_blank" rel="noopener noreferrer"></a>' +
          "</div>",
        onInit: (el, instance) => {
          const link = el.querySelector<HTMLAnchorElement>("a[data-ask]")
          if (!link) return
          link.textContent = labels.askPhoto
          const update = () => {
            link.href = messageFor(instance.currIndex)
          }
          update()
          instance.on("change", update)
        },
      })
    })

    pswp.on("change", () => callbacks.current.onChange(pswp.currIndex))

    let disposed = false
    let opened = false
    pswp.on("close", () => {
      if (!disposed) callbacks.current.onClosed()
    })
    // PhotoSwipe ignora la chiusura mentre sta ancora aprendosi: se il componente viene smontato in quel momento
    // (per esempio con il tasto indietro premuto subito) lo si nasconde e lo si distrugge a fine animazione.
    pswp.on("openingAnimationEnd", () => {
      opened = true
      if (disposed) pswp.destroy()
    })
    pswp.init()

    return () => {
      disposed = true
      if (opened) pswp.destroy()
      else if (pswp.element) pswp.element.style.display = "none"
    }
    // PhotoSwipe si crea una sola volta per apertura: index e callback sono letti all'avvio
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
