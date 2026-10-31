import type { Vettura } from "@/data/vetture"

// Sigle che restano in maiuscolo quando si ripulisce un testo scritto tutto in MAIUSCOLO.
const KEEP_UPPER = new Set([
  "TFSI", "TDI", "TSI", "CRD", "GT", "GTS", "RS", "AMG", "SUV", "IVA", "PDK", "SL", "LED", "ABS",
  "II", "III", "IV", "VW", "BMW", "ND", "PCM", "PASM", "PSM", "ASI", "USA", "UK", "DSG", "CV", "KW",
])

/** "UFFICIALE ITALIANA" diventa "Ufficiale Italiana"; le sigle e i token con numeri restano com'erano. */
export function unshout(text: string): string {
  return text.replace(/[A-ZÀ-Ý]{2,}/g, (word) =>
    KEEP_UPPER.has(word) ? word : word.charAt(0) + word.slice(1).toLowerCase(),
  )
}

/** Versione per la visualizzazione: senza il modello ripetuto e senza MAIUSCOLO gridato. */
export function displayVersion(car: Pick<Vettura, "model" | "version">): string {
  let v = (car.version || "").trim()
  if (v.toLowerCase().startsWith(car.model.toLowerCase() + " ")) v = v.slice(car.model.length).trim()
  return unshout(v.replace(/\s+/g, " ").replace(/Coup[eè]/gi, "Coupé"))
}

/** Titolo completo per SEO e anteprime: "Porsche 911 992 Carrera T Ufficiale Italiana 2023". */
export function fullTitle(car: Pick<Vettura, "make" | "model" | "version" | "year">): string {
  return [car.make, car.model, displayVersion(car), String(car.year)].filter(Boolean).join(" ")
}
