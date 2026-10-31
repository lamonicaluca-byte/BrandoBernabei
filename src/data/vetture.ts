import entries from "./vetture.json"

export type GalleryChapter = "esterni" | "interni" | "dettagli" | "documenti"
/** Didascalia: una sola lingua (italiano) oppure una per lingua. */
export type GalleryCaption = string | { it?: string; en?: string; fr?: string }

/** Assegna una foto di `images` a un capitolo. `file` è il nome del file, es. "01.webp". */
export interface GalleryEntry {
  file: string
  chapter: GalleryChapter
  caption?: GalleryCaption
}

export interface Vettura {
  /** Identificativo e parte dell'indirizzo: /vetture/<id> */
  id: string
  make: string
  model: string
  version: string
  year: number
  /** "MM/YYYY", facoltativo */
  registration?: string
  km: number
  cv: number
  fuel: string
  gearbox: string
  color: string
  bodyType?: string
  driveTrain?: string
  /** Prezzo in euro */
  price: number
  /** Testo libero, a capo con riga vuota tra i paragrafi */
  description: string
  equipment?: string[]
  /** Percorsi in /public: la prima è la copertina */
  images: string[]
  autoscoutUrl?: string
  /** Facoltativo: capitoli e didascalie delle foto. Senza, le foto sono in un unico capitolo. */
  gallery?: GalleryEntry[]
}

// L'ordine dell'array è l'ordine di visualizzazione. Si gestisce da /gestione/disponibili.
export const vetture = entries as Vettura[]

export function getVettura(id: string): Vettura | undefined {
  return vetture.find((v) => v.id === id)
}
