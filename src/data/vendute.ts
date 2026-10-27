export interface Venduta {
  make: string
  model: string
  year: number
  km: number
  /** Percorso in /public, es. "/vendute/porsche-911-carrera-s.jpg" */
  image: string
  /** Mese di vendita nel formato "YYYY-MM" */
  soldAt: string
  /** Crediti foto, obbligatori per le immagini con licenza CC */
  credit?: string
}

// Aggiungi le nuove auto in qualsiasi posizione: la pagina le ordina dalla più recente.
/** true finché le auto sono esempi: mostra l'avviso "Esempio" in pagina. Mettere false con i dati reali. */
export const isDemo = true

// DEMO: dati e foto di esempio (foto da Wikimedia Commons, licenze CC). Sostituire con le auto realmente vendute prima della pubblicazione.
export const vendute: Venduta[] = [
  { make: "Ferrari", model: "F8 Tributo", year: 2021, km: 12000, image: "/vendute/ferrari-f8-tributo.jpg", soldAt: "2026-09", credit: "Wikimedia Commons / Alexander Migl, CC BY-SA 4.0" },
  { make: "Porsche", model: "911 Carrera S", year: 2021, km: 18000, image: "/vendute/porsche-911-carrera-s.jpg", soldAt: "2026-08", credit: "Wikimedia Commons / Alexander Migl, CC BY-SA 4.0" },
  { make: "Lamborghini", model: "Huracán Performante", year: 2019, km: 15500, image: "/vendute/lamborghini-huracan-performante.jpg", soldAt: "2026-07", credit: "Wikimedia Commons / Matti Blume, CC BY-SA 4.0" },
  { make: "McLaren", model: "720S", year: 2019, km: 14200, image: "/vendute/mclaren-720s.jpg", soldAt: "2026-06", credit: "Wikimedia Commons / Matti Blume, CC BY-SA 4.0" },
  { make: "Mercedes-AMG", model: "GT 63 S", year: 2022, km: 9800, image: "/vendute/mercedes-amg-gt-63-s.jpg", soldAt: "2026-05", credit: "Wikimedia Commons / Alexander-93, CC BY-SA 4.0" },
  { make: "Aston Martin", model: "Vantage", year: 2020, km: 11000, image: "/vendute/aston-martin-vantage.jpg", soldAt: "2026-04", credit: "Wikimedia Commons / Alexander-93, CC BY-SA 4.0" },
  { make: "BMW", model: "M4 Competition", year: 2022, km: 16500, image: "/vendute/bmw-m4-competition.jpg", soldAt: "2026-03", credit: "Wikimedia Commons / Alexander Migl, CC BY-SA 4.0" },
  { make: "Maserati", model: "GranTurismo Trofeo", year: 2023, km: 6500, image: "/vendute/maserati-granturismo-trofeo.jpg", soldAt: "2026-02", credit: "Wikimedia Commons / Alexander-93, CC BY-SA 4.0" },
  { make: "Audi", model: "R8 V10 Plus", year: 2018, km: 24000, image: "/vendute/audi-r8-v10-plus.jpg", soldAt: "2026-01", credit: "Wikimedia Commons / Vauxford, CC BY-SA 4.0" },
  { make: "Porsche", model: "911 Carrera 4S", year: 2013, km: 48000, image: "/vendute/porsche-911-carrera-4s.jpg", soldAt: "2025-12", credit: "Wikimedia Commons / David Villarreal Fernández, CC BY-SA 2.0" },
]

export function getVendute(): Venduta[] {
  return [...vendute].sort((a, b) => b.soldAt.localeCompare(a.soldAt))
}
