"use client";

import { useState, useMemo } from "react";
import { vetture } from "@/data/vetture";
import CarGrid from "@/components/vetture/CarGrid";
import SectionLabel from "@/components/ui/SectionLabel";

const MARCHE = ["Tutte", ...Array.from(new Set(vetture.map((v) => v.make))).sort()];
const PREZZI = [
  { label: "Tutti i prezzi", min: 0, max: Infinity },
  { label: "Fino a €80.000", min: 0, max: 80000 },
  { label: "€80.000 – €150.000", min: 80000, max: 150000 },
  { label: "Oltre €150.000", min: 150000, max: Infinity },
];
const KM_OPTIONS = [
  { label: "Tutti i km", max: Infinity },
  { label: "Fino a 20.000 km", max: 20000 },
  { label: "Fino a 40.000 km", max: 40000 },
  { label: "Oltre 40.000 km", max: 0 },
];

export default function VetturePage() {
  const [marca, setMarca] = useState("Tutte");
  const [priceIdx, setPriceIdx] = useState(0);
  const [kmIdx, setKmIdx] = useState(0);

  const filtered = useMemo(() => {
    return vetture.filter((v) => {
      if (marca !== "Tutte" && v.make !== marca) return false;
      const p = PREZZI[priceIdx];
      if (v.prezzo < p.min || v.prezzo > p.max) return false;
      const k = KM_OPTIONS[kmIdx];
      if (kmIdx === 3 && v.km <= 40000) return false;
      if (kmIdx !== 3 && v.km > k.max) return false;
      return true;
    });
  }, [marca, priceIdx, kmIdx]);

  return (
    <div className="bg-warm-white min-h-screen">
      {/* Hero compatto */}
      <div className="bg-luxury-black pt-[52px] pb-14 px-8">
        <div className="max-w-6xl mx-auto pt-12">
          <SectionLabel light className="mb-4">
            Catalogo
          </SectionLabel>
          <h1 className="font-display text-[44px] md:text-[56px] font-light text-warm-white">
            Le nostre vetture
          </h1>
          <p className="font-body text-[12px] text-mid-grey mt-3 max-w-lg">
            Ogni veicolo è stato scelto personalmente e verificato prima di entrare nel nostro
            stock.
          </p>
        </div>
      </div>

      {/* Filtri + Grid */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Filtri */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <select
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            className="font-body text-[11px] bg-pure-white border border-[0.5px] border-border-light text-luxury-black px-4 py-2.5 focus:outline-none focus:border-champagne-gold cursor-pointer"
            aria-label="Filtra per marca"
          >
            {MARCHE.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select
            value={priceIdx}
            onChange={(e) => setPriceIdx(Number(e.target.value))}
            className="font-body text-[11px] bg-pure-white border border-[0.5px] border-border-light text-luxury-black px-4 py-2.5 focus:outline-none focus:border-champagne-gold cursor-pointer"
            aria-label="Filtra per prezzo"
          >
            {PREZZI.map((p, i) => (
              <option key={p.label} value={i}>
                {p.label}
              </option>
            ))}
          </select>

          <select
            value={kmIdx}
            onChange={(e) => setKmIdx(Number(e.target.value))}
            className="font-body text-[11px] bg-pure-white border border-[0.5px] border-border-light text-luxury-black px-4 py-2.5 focus:outline-none focus:border-champagne-gold cursor-pointer"
            aria-label="Filtra per chilometri"
          >
            {KM_OPTIONS.map((k, i) => (
              <option key={k.label} value={i}>
                {k.label}
              </option>
            ))}
          </select>

          <span className="font-body text-[11px] text-mid-grey self-center ml-auto">
            {filtered.length} veicol{filtered.length === 1 ? "o" : "i"} disponibil
            {filtered.length === 1 ? "e" : "i"}
          </span>
        </div>

        <CarGrid vetture={filtered} />
      </div>
    </div>
  );
}
