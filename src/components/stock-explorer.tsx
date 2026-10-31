"use client"

import { useMemo, useState } from "react"
import { VehicleCard, type VehicleCardLabels } from "@/components/vehicle-card"
import type { Vettura } from "@/data/vetture"

export interface StockLabels extends VehicleCardLabels {
  filters: string
  brand: string
  allBrands: string
  priceMax: string
  yearMin: string
  kmMax: string
  any: string
  sort: string
  sortFeatured: string
  sortPriceAsc: string
  sortPriceDesc: string
  sortYearDesc: string
  sortKmAsc: string
  reset: string
  results: string
  resultOne: string
  noResults: string
}

type Sort = "featured" | "priceAsc" | "priceDesc" | "yearDesc" | "kmAsc"

const LOCALE_TAG: Record<string, string> = { it: "it-IT", en: "en-GB", fr: "fr-FR" }

/** Porta un valore al "gradino" tondo successivo: 84.000 diventa 90.000, così le scelte sono leggibili. */
function steps(values: number[], count: number, roundTo: number): number[] {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const top = Math.ceil(max / roundTo) * roundTo
  const bottom = Math.floor(min / roundTo) * roundTo
  const gap = (top - bottom) / count
  const out = new Set<number>()
  for (let i = 1; i <= count; i++) out.add(Math.round((bottom + gap * i) / roundTo) * roundTo)
  return [...out].filter((v) => v > 0).sort((a, b) => a - b)
}

const field =
  "w-full border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-foreground/60"

export function StockExplorer({ cars, lang, labels }: { cars: Vettura[]; lang: string; labels: StockLabels }) {
  const [brand, setBrand] = useState("")
  const [priceMax, setPriceMax] = useState(0)
  const [yearMin, setYearMin] = useState(0)
  const [kmMax, setKmMax] = useState(0)
  const [sort, setSort] = useState<Sort>("featured")
  const fmt = new Intl.NumberFormat(LOCALE_TAG[lang] ?? "it-IT")

  const options = useMemo(() => {
    const brands = [...new Set(cars.map((c) => c.make))].sort((a, b) => a.localeCompare(b))
    const years = [...new Set(cars.map((c) => c.year))].sort((a, b) => b - a)
    return {
      brands,
      years,
      prices: steps(cars.map((c) => c.price), 6, 5000),
      kms: steps(cars.map((c) => c.km), 5, 10000),
    }
  }, [cars])

  const visible = useMemo(() => {
    const list = cars.filter(
      (c) =>
        (!brand || c.make === brand) &&
        (!priceMax || c.price <= priceMax) &&
        (!yearMin || c.year >= yearMin) &&
        (!kmMax || c.km <= kmMax),
    )
    const by: Record<Sort, ((a: Vettura, b: Vettura) => number) | null> = {
      featured: null, // ordine scelto da Brando
      priceAsc: (a, b) => a.price - b.price,
      priceDesc: (a, b) => b.price - a.price,
      yearDesc: (a, b) => b.year - a.year,
      kmAsc: (a, b) => a.km - b.km,
    }
    const cmp = by[sort]
    return cmp ? [...list].sort(cmp) : list
  }, [cars, brand, priceMax, yearMin, kmMax, sort])

  const active = Boolean(brand || priceMax || yearMin || kmMax)
  const reset = () => {
    setBrand("")
    setPriceMax(0)
    setYearMin(0)
    setKmMax(0)
  }
  const count = visible.length === 1 ? labels.resultOne : labels.results.replace("{n}", String(visible.length))

  return (
    <div>
      {cars.length > 3 && (
        <form
          onSubmit={(e) => e.preventDefault()}
          aria-label={labels.filters}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >
          <label className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
            {labels.brand}
            <select className={`${field} mt-1.5 normal-case tracking-normal`} value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">{labels.allBrands}</option>
              {options.brands.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </label>
          <label className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
            {labels.priceMax}
            <select className={`${field} mt-1.5 normal-case tracking-normal`} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))}>
              <option value={0}>{labels.any}</option>
              {options.prices.map((p) => <option key={p} value={p}>€ {fmt.format(p)}</option>)}
            </select>
          </label>
          <label className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
            {labels.yearMin}
            <select className={`${field} mt-1.5 normal-case tracking-normal`} value={yearMin} onChange={(e) => setYearMin(Number(e.target.value))}>
              <option value={0}>{labels.any}</option>
              {options.years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </label>
          <label className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
            {labels.kmMax}
            <select className={`${field} mt-1.5 normal-case tracking-normal`} value={kmMax} onChange={(e) => setKmMax(Number(e.target.value))}>
              <option value={0}>{labels.any}</option>
              {options.kms.map((k) => <option key={k} value={k}>{fmt.format(k)} km</option>)}
            </select>
          </label>
          <label className="col-span-2 text-xs uppercase tracking-[0.1em] text-muted-foreground sm:col-span-1">
            {labels.sort}
            <select className={`${field} mt-1.5 normal-case tracking-normal`} value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="featured">{labels.sortFeatured}</option>
              <option value="priceAsc">{labels.sortPriceAsc}</option>
              <option value="priceDesc">{labels.sortPriceDesc}</option>
              <option value="yearDesc">{labels.sortYearDesc}</option>
              <option value="kmAsc">{labels.sortKmAsc}</option>
            </select>
          </label>
        </form>
      )}

      <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground" aria-live="polite">
        <span>{count}</span>
        {active && (
          <button type="button" onClick={reset} className="text-foreground underline underline-offset-4">
            {labels.reset}
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 max-w-xl text-muted-foreground">{labels.noResults}</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((car, i) => (
            <VehicleCard key={car.id} car={car} lang={lang} labels={labels} priority={i < 3} />
          ))}
        </div>
      )}
    </div>
  )
}
