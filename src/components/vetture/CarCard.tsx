import Link from "next/link";
import { Vettura } from "@/data/vetture";

interface Props {
  vettura: Vettura;
}

function formatKm(km: number) {
  return km.toLocaleString("it-IT") + " km";
}

function formatPrezzo(prezzo: number) {
  return "€ " + prezzo.toLocaleString("it-IT");
}

export default function CarCard({ vettura }: Props) {
  return (
    <Link
      href={`/vetture/${vettura.slug}`}
      className="group flex flex-col bg-pure-white border border-border-light overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-anthracite">
        <div className="absolute inset-0 flex items-center justify-center text-mid-grey font-body text-[10px] tracking-widest uppercase">
          {vettura.make} {vettura.model}
        </div>
        <span className="absolute top-3 left-3 font-body text-[9px] tracking-[0.2em] uppercase text-warm-white bg-luxury-black px-2 py-1 z-10">
          {vettura.year}
        </span>
        <span className="absolute bottom-3 right-3 font-body text-[9px] tracking-[0.15em] uppercase text-champagne-gold border border-[0.5px] border-champagne-gold px-2 py-1 bg-luxury-black/80 z-10">
          {vettura.badge}
        </span>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-2">
        <span className="font-body text-[9px] tracking-[0.25em] uppercase text-mid-grey">
          {vettura.make}
        </span>
        <h3 className="font-display text-[20px] font-light text-luxury-black">
          {vettura.model}
        </h3>

        {/* Specs */}
        <div className="flex items-center gap-3 mt-1">
          <span className="font-body text-[9px] text-[#8A8A8A] uppercase tracking-wide">
            {formatKm(vettura.km)}
          </span>
          <span className="w-px h-3 bg-border-light" />
          <span className="font-body text-[9px] text-[#8A8A8A] uppercase tracking-wide">
            {vettura.cv} CV
          </span>
          <span className="w-px h-3 bg-border-light" />
          <span className="font-body text-[9px] text-[#8A8A8A] uppercase tracking-wide">
            {vettura.cambio}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[0.5px] border-border-light">
          <div className="font-display text-[22px] font-light text-luxury-black">
            {formatPrezzo(vettura.prezzo)}
          </div>
          <span className="font-body text-[10px] text-champagne-gold tracking-[0.1em] group-hover:underline">
            Scopri →
          </span>
        </div>
      </div>
    </Link>
  );
}
