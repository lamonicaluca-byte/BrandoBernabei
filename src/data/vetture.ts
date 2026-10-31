import entries from "./vetture.json"

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
}

// L'ordine dell'array è l'ordine di visualizzazione. Si gestisce da /gestione/disponibili.
export const vetture = entries as Vettura[]

export function getVettura(id: string): Vettura | undefined {
  return vetture.find((v) => v.id === id)
}
