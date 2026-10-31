import PhotoSwipe from "photoswipe"
import "photoswipe/dist/photoswipe.css"
import { groupChapters } from "@/lib/gallery"
import { fillTemplate, whatsappUrl } from "@/lib/whatsapp"
import type { GalleryLabels, GalleryPhoto } from "./types"

interface LightboxOptions {
  photos: GalleryPhoto[]
  index: number
  labels: GalleryLabels
  /** "Porsche 911 2023": va nel messaggio WhatsApp */
  carName: string
  /** L'utente ha chiuso il lightbox (swipe verso il basso, Esc, pulsante) */
  onClosed: () => void
  /** La foto mostrata è cambiata */
  onChange: (index: number) => void
}

export interface LightboxHandle {
  /** Chiude subito il lightbox senza avvisare (chiamata quando è la pagina a chiuderlo, per esempio con il tasto indietro) */
  destroy: () => void
}

/**
 * Apre il lightbox a schermo intero. È una funzione e non un componente React: viene chiamata dal tocco,
 * dopo un import dinamico, così non dipende dal ciclo di rendering (nessun caso in cui "il tocco non fa nulla").
 */
export function openLightbox({ photos, index, labels, carName, onClosed, onChange }: LightboxOptions): LightboxHandle {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const groups = groupChapters(photos)
  const messageFor = (i: number) => {
    const g = [...groups].reverse().find((x) => x.first <= i) ?? groups[0]
    return whatsappUrl(fillTemplate(labels.photoMessage, { car: carName, chapter: labels.chapters[g.key], n: i - g.first + 1 }))
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

  let disposed = false
  let opened = false
  let closing = false
  pswp.on("change", () => {
    if (!disposed) onChange(pswp.currIndex)
  })
  pswp.on("close", () => {
    closing = true
    if (!disposed) onClosed()
  })
  // PhotoSwipe ignora la chiusura mentre sta ancora aprendosi: se la pagina chiede di chiuderlo in quel momento
  // (per esempio con il tasto indietro premuto subito) lo si nasconde e lo si distrugge a fine animazione.
  pswp.on("openingAnimationEnd", () => {
    opened = true
    if (disposed) pswp.destroy()
  })
  pswp.init()

  return {
    destroy: () => {
      if (disposed) return
      disposed = true
      if (closing) return // si sta già chiudendo da solo e poi si distrugge
      if (opened) pswp.destroy()
      else if (pswp.element) pswp.element.style.display = "none"
    },
  }
}
