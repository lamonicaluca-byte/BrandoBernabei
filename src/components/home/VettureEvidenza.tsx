import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { getEvidenzaVetture, Vettura } from "@/data/vetture";

function formatKm(km: number) {
  return km.toLocaleString("it-IT") + " km";
}

function formatPrezzo(prezzo: number) {
  return "€ " + prezzo.toLocaleString("it-IT");
}

function CarPlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`bg-anthracite flex items-center justify-center text-mid-grey font-body text-[10px] tracking-widest uppercase ${className}`}
    >
      {label}
    </div>
  );
}

function FeaturedCard({ vettura }: { vettura: Vettura }) {
  return (
    <Link
      href={`/vetture/${vettura.slug}`}
      className="group flex flex-col md:flex-row bg-pure-white border border-border-light overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="relative md:w-[55%] aspect-[16/10] md:aspect-auto overflow-hidden">
        <CarPlaceholder label={`${vettura.make} ${vettura.model}`} className="w-full h-full" />
        <span className="absolute top-3 left-3 font-body text-[9px] tracking-[0.2em] uppercase text-warm-white bg-luxury-black px-2 py-1">
          {vettura.year}
        </span>
        <span className="absolute bottom-3 right-3 font-body text-[9px] tracking-[0.15em] uppercase text-champagne-gold border border-[0.5px] border-champagne-gold px-2 py-1 bg-luxury-black/80">
          {vettura.badge}
        </span>
      </div>
      {/* Info */}
      <div className="flex-1 p-7 flex flex-col justify-between">
        <div>
          <span className="font-body text-[9px] tracking-[0.25em] uppercase text-mid-grey block mb-1">
            {vettura.make}
          </span>
          <h3 className="font-display text-[24px] font-light text-luxury-black mb-3">
            {vettura.model}
          </h3>
          {vettura.descrizione && (
            <p className="font-body text-[11px] text-mid-grey leading-relaxed mb-4 line-clamp-2">
              {vettura.descrizione}
            </p>
          )}
          <div className="flex items-center gap-4 mb-5">
            <span className="font-body text-[9px] text-[#8A8A8A] uppercase tracking-wider">
              {formatKm(vettura.km)}
            </span>
            <span className="w-px h-3 bg-border-light" />
            <span className="font-body text-[9px] text-[#8A8A8A] uppercase tracking-wider">
              {vettura.cv} CV
            </span>
            <span className="w-px h-3 bg-border-light" />
            <span className="font-body text-[9px] text-[#8A8A8A] uppercase tracking-wider">
              {vettura.cambio}
            </span>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="font-display text-[26px] font-light text-luxury-black">
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

function StandardCard({ vettura }: { vettura: Vettura }) {
  return (
    <Link
      href={`/vetture/${vettura.slug}`}
      className="group flex flex-col bg-pure-white border border-border-light overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <CarPlaceholder label={`${vettura.make} ${vettura.model}`} className="w-full h-full" />
        <span className="absolute top-3 left-3 font-body text-[9px] tracking-[0.2em] uppercase text-warm-white bg-luxury-black px-2 py-1">
          {vettura.year}
        </span>
        <span className="absolute bottom-3 right-3 font-body text-[9px] tracking-[0.15em] uppercase text-champagne-gold border border-[0.5px] border-champagne-gold px-2 py-1 bg-luxury-black/80">
          {vettura.badge}
        </span>
      </div>
      <div className="p-5 flex flex-col gap-2">
        <span className="font-body text-[9px] tracking-[0.25em] uppercase text-mid-grey">
          {vettura.make}
        </span>
        <h3 className="font-display text-[20px] font-light text-luxury-black">
          {vettura.model}
        </h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="font-body text-[9px] text-[#8A8A8A] uppercase tracking-wider">
            {formatKm(vettura.km)}
          </span>
          <span className="w-px h-3 bg-border-light" />
          <span className="font-body text-[9px] text-[#8A8A8A] uppercase tracking-wider">
            {vettura.cv} CV
          </span>
          <span className="w-px h-3 bg-border-light" />
          <span className="font-body text-[9px] text-[#8A8A8A] uppercase tracking-wider">
            {vettura.cambio}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
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

export default function VettureEvidenza() {
  const vetture = getEvidenzaVetture();
  const [featured, ...rest] = vetture;

  return (
    <section className="bg-warm-white py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <SectionLabel className="mb-4">Selezione del momento</SectionLabel>
        <h2 className="font-display text-[32px] font-light text-luxury-black mb-10">
          Vetture in evidenza
        </h2>

        <div className="flex flex-col gap-5 mb-8">
          {featured && <FeaturedCard vettura={featured} />}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {rest.map((v) => (
                <StandardCard key={v.slug} vettura={v} />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Button href="/vetture" variant="outline-dark">
            Vedi tutto il catalogo
          </Button>
        </div>
      </div>
    </section>
  );
}
