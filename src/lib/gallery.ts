import type { GalleryCaption, GalleryEntry, Vettura } from "@/data/vetture"

// "altre" raccoglie le foto senza capitolo quando le altre sono state classificate; "foto" è l'unico capitolo senza classificazione.
export const CHAPTER_ORDER = ["esterni", "interni", "dettagli", "documenti", "altre", "foto"] as const
export type ChapterKey = (typeof CHAPTER_ORDER)[number]

export interface GalleryItem {
  src: string
  chapter: ChapterKey
  caption?: string
}

export interface ChapterGroup {
  key: ChapterKey
  count: number
  /** Indice, nell'elenco completo, della prima foto del capitolo */
  first: number
}

const basename = (path: string) => path.split("/").pop() ?? path

function pickCaption(caption: GalleryCaption | undefined, lang: string): string | undefined {
  if (!caption) return undefined
  if (typeof caption === "string") return caption
  return caption[lang as "it" | "en" | "fr"] ?? caption.it
}

/**
 * Ordina le foto di un'auto per capitolo. Tollerante per costruzione:
 * senza `gallery` tutto finisce in "foto"; le voci che puntano a file assenti si ignorano;
 * le foto senza voce (per esempio caricate dopo da /gestione) vanno in "altre".
 */
export function resolveGallery(
  car: Pick<Vettura, "images"> & { gallery?: GalleryEntry[] },
  lang: string,
): GalleryItem[] {
  const bySrc = new Map(car.images.map((src) => [basename(src), src]))
  const used = new Set<string>()
  const tagged: Array<GalleryItem & { order: number }> = []

  ;(car.gallery ?? []).forEach((entry, order) => {
    const src = bySrc.get(basename(entry.file))
    if (!src || used.has(src)) return
    used.add(src)
    tagged.push({ src, chapter: entry.chapter, caption: pickCaption(entry.caption, lang), order })
  })

  const restChapter: ChapterKey = tagged.length > 0 ? "altre" : "foto"
  const rest: GalleryItem[] = car.images.filter((src) => !used.has(src)).map((src) => ({ src, chapter: restChapter }))

  const rank = (c: ChapterKey) => CHAPTER_ORDER.indexOf(c)
  tagged.sort((a, b) => rank(a.chapter) - rank(b.chapter) || a.order - b.order)
  return [...tagged.map(({ src, chapter, caption }) => ({ src, chapter, caption })), ...rest]
}

export function groupChapters(items: GalleryItem[]): ChapterGroup[] {
  const groups: ChapterGroup[] = []
  items.forEach((item, index) => {
    const last = groups[groups.length - 1]
    if (last && last.key === item.chapter) last.count += 1
    else groups.push({ key: item.chapter, count: 1, first: index })
  })
  return groups
}

/** "Porsche 911 992 Carrera T 2023, Interni, volante e cruscotto": mai vuoto, mai "Foto 1". */
export function altText(base: string, chapterLabel: string, caption?: string): string {
  return [base, chapterLabel, caption].filter(Boolean).join(", ")
}
