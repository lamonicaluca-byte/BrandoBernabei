import { notFound } from "next/navigation";
import { vetture, getVetturaBySlug } from "@/data/vetture";
import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return vetture.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vettura = getVetturaBySlug(slug);
  if (!vettura) return {};
  return {
    title: `${vettura.make} ${vettura.model} ${vettura.year} | Bernabei Automobili Roma`,
    description: vettura.descrizione ?? `${vettura.make} ${vettura.model} ${vettura.year} — ${vettura.km.toLocaleString("it-IT")} km, ${vettura.cv} CV. In vendita da Bernabei Automobili Roma.`,
  };
}

function formatKm(km: number) {
  return km.toLocaleString("it-IT") + " km";
}

function formatPrezzo(prezzo: number) {
  return "€ " + prezzo.toLocaleString("it-IT");
}

export default async function VetturaPage({ params }: Props) {
  const { slug } = await params;
  const vettura = getVetturaBySlug(slug);
  if (!vettura) notFound();

  const specs = [
    { label: "Anno", value: vettura.year.toString() },
    { label: "Chilometri", value: formatKm(vettura.km) },
    { label: "Potenza", value: `${vettura.cv} CV` },
    { label: "Cambio", value: vettura.cambio },
    { label: "Carburante", value: vettura.carburante },
    ...(vettura.colore ? [{ label: "Colore", value: vettura.colore }] : []),
    ...(vettura.cilindrata ? [{ label: "Cilindrata", value: vettura.cilindrata }] : []),
    ...(vettura.trasmissione ? [{ label: "Trasmissione", value: vettura.trasmissione }] : []),
  ];

  const waMessage = encodeURIComponent(
    `Ciao Brando, sono interessato alla ${vettura.make} ${vettura.model} ${vettura.year}. Puoi darmi più informazioni?`
  );

  return (
    <div className="bg-warm-white min-h-screen">
      {/* Header scuro */}
      <div className="bg-luxury-black pt-[52px] pb-10 px-8">
        <div className="max-w-6xl mx-auto pt-10">
          <div className="flex items-center gap-2 text-muted-grey font-body text-[10px] tracking-widest uppercase mb-4">
            <a href="/vetture" className="hover:text-champagne-gold transition-colors">
              Vetture
            </a>
            <span>/</span>
            <span className="text-muted-grey">{vettura.make} {vettura.model}</span>
          </div>
          <span className="inline-block font-body text-[9px] tracking-[0.2em] uppercase text-champagne-gold border border-[0.5px] border-champagne-gold px-3 py-1 mb-4">
            {vettura.badge}
          </span>
          <h1 className="font-display text-[36px] md:text-[48px] font-light text-warm-white leading-tight">
            {vettura.make} {vettura.model}
          </h1>
          <div className="font-display text-[32px] font-light text-champagne-gold mt-2">
            {formatPrezzo(vettura.prezzo)}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="flex flex-col gap-3">
            {/* Main image */}
            <div className="aspect-[16/10] bg-anthracite flex items-center justify-center">
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-grey">
                {vettura.make} {vettura.model} · {vettura.year}
              </span>
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] bg-dark-graphite flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <span className="font-body text-[8px] text-mid-grey">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-8">
            {/* Specs table */}
            <div>
              <SectionLabel className="mb-5">Specifiche tecniche</SectionLabel>
              <div className="divide-y divide-[0.5px] divide-border-light">
                {specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex justify-between items-center py-3"
                  >
                    <span className="font-body text-[10px] tracking-[0.1em] uppercase text-mid-grey">
                      {s.label}
                    </span>
                    <span className="font-body text-[11px] text-luxury-black font-medium">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3">
              <Button
                href={`https://wa.me/393395027983?text=${waMessage}`}
                variant="primary"
                external
                className="w-full justify-center"
              >
                Contatta Brando su WhatsApp
              </Button>
              <Button
                href="/contatti"
                variant="outline-dark"
                className="w-full justify-center"
              >
                Richiedi informazioni
              </Button>
            </div>
          </div>
        </div>

        {/* Perché questa vettura */}
        {(vettura.descrizione || vettura.note) && (
          <div className="mt-16 max-w-2xl">
            <SectionLabel className="mb-5">La nostra valutazione</SectionLabel>
            <h2 className="font-display text-[28px] font-light text-luxury-black mb-5">
              Perché questa vettura
            </h2>
            {vettura.descrizione && (
              <p className="font-body text-[12px] text-mid-grey leading-[1.9] mb-4">
                {vettura.descrizione}
              </p>
            )}
            {vettura.note && (
              <p className="font-body text-[12px] text-mid-grey leading-[1.9]">
                {vettura.note}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Sticky CTA mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-luxury-black border-t border-[0.5px] border-dark-graphite p-4 flex gap-3 z-40">
        <Button
          href={`https://wa.me/393395027983?text=${waMessage}`}
          variant="primary"
          external
          className="flex-1 justify-center"
        >
          Contatta Brando
        </Button>
        <div className="font-display text-[18px] text-champagne-gold self-center ml-auto whitespace-nowrap">
          {formatPrezzo(vettura.prezzo)}
        </div>
      </div>
    </div>
  );
}
