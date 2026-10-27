export interface Venduta {
  make: string
  model: string
  year: number
  km: number
  /** Percorso in /public, es. "/vendute/porsche-911-carrera-s.jpg" */
  image: string
  /** Mese di vendita nel formato "YYYY-MM" */
  soldAt: string
}

// Aggiungi le nuove auto in qualsiasi posizione: la pagina le ordina dalla più recente.
export const vendute: Venduta[] = []

export function getVendute(): Venduta[] {
  return [...vendute].sort((a, b) => b.soldAt.localeCompare(a.soldAt))
}
