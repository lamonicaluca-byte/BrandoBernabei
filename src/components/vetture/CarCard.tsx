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
      className="group flex flex-col bg-white border border-[#E0DDD6] overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
        <div className="absolute inset-0 flex items-center justify-center text-[#5A5A5A] font-body text-[10px] tracking-widest uppercase">
          {vettura.make} {vettura.model}
        </div>
        <span className="absolute top-3 left-3 font-body text-[9px] tracking-[0.2em] uppercase text-[#F5F0E8] bg-[#080808] px-2 py-1 z-10">
          {vettura.year}
        </span>
        <span className="absolute bottom-3 right-3 font-body text-[8px] tracking-[.1em] uppercase text-[#C9A96E] border border-[#C9A96E] px-2 py-1 bg-transparent z-10">
          {vettura.badge}
        </span>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-2">
        <span className="uppercase tracking-[.22em] text-[9px] text-[#9A9A9A]">
          {vettura.make}
        </span>
        <h3 className="font-display font-normal text-xl text-[#1C1C1C]">
          {vettura.model}
        </h3>

        {/* Specs */}
        <div className="flex items-center gap-3 mt-1">
          <span className="font-body text-[9px] text-[#9A9A9A] uppercase tracking-wide">
            {formatKm(vettura.km)}
          </span>
          <span className="w-px h-3 bg-[#E0DDD6]" />
          <span className="font-body text-[9px] text-[#9A9A9A] uppercase tracking-wide">
            {vettura.cv} CV
          </span>
          <span className="w-px h-3 bg-[#E0DDD6]" />
          <span className="font-body text-[9px] text-[#9A9A9A] uppercase tracking-wide">
            {vettura.cambio}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E0DDD6]">
          <div className="font-display text-2xl text-[#1C1C1C]">
            {formatPrezzo(vettura.prezzo)}
          </div>
          <span className="text-[#C9A96E] uppercase tracking-[.15em] text-[9px] group-hover:underline">
            Scopri →
          </span>
        </div>
      </div>
    </Link>
  );
}
