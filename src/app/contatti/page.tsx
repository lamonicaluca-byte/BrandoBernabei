"use client";

import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { vetture } from "@/data/vetture";

const orari = [
  { giorno: "Lunedì – Venerdì", orario: "09:00 – 13:00 / 15:00 – 19:00" },
  { giorno: "Sabato", orario: "09:00 – 13:00" },
  { giorno: "Domenica", orario: "Su appuntamento" },
];

export default function ContattiPage() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefono: "",
    vettura: "",
    messaggio: "",
  });
  const [sent, setSent] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="bg-warm-white min-h-screen">
      {/* Hero */}
      <div className="bg-luxury-black pt-[52px] pb-16 px-8">
        <div className="max-w-6xl mx-auto pt-12">
          <SectionLabel light className="mb-5">
            Contattaci
          </SectionLabel>
          <h1 className="font-display text-[44px] md:text-[56px] font-light text-warm-white mb-4">
            Inizia una conversazione.
          </h1>
          <p className="font-body text-[12px] text-mid-grey max-w-lg leading-[1.9]">
            Che tu abbia trovato una vettura specifica o voglia una consulenza generale, siamo
            qui. Rispondiamo sempre entro poche ore.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Form */}
          <div>
            <SectionLabel className="mb-6">Scrivici</SectionLabel>
            {sent ? (
              <div className="flex flex-col gap-4 py-12">
                <div className="font-display text-[28px] font-light text-luxury-black">
                  Messaggio ricevuto.
                </div>
                <p className="font-body text-[12px] text-mid-grey leading-relaxed">
                  Ti risponderemo il prima possibile, di solito entro poche ore.
                </p>
                <Button
                  href="/vetture"
                  variant="outline-dark"
                  className="self-start mt-4"
                >
                  Torna alle vetture
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="nome"
                      className="font-body text-[9px] tracking-[0.2em] uppercase text-mid-grey"
                    >
                      Nome *
                    </label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      required
                      value={form.nome}
                      onChange={handleChange}
                      className="bg-pure-white border border-[0.5px] border-border-light px-4 py-3 font-body text-[11px] text-luxury-black focus:outline-none focus:border-champagne-gold transition-colors"
                      placeholder="Il tuo nome"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="telefono"
                      className="font-body text-[9px] tracking-[0.2em] uppercase text-mid-grey"
                    >
                      Telefono
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={form.telefono}
                      onChange={handleChange}
                      className="bg-pure-white border border-[0.5px] border-border-light px-4 py-3 font-body text-[11px] text-luxury-black focus:outline-none focus:border-champagne-gold transition-colors"
                      placeholder="+39 XXX XXX XXXX"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="font-body text-[9px] tracking-[0.2em] uppercase text-mid-grey"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="bg-pure-white border border-[0.5px] border-border-light px-4 py-3 font-body text-[11px] text-luxury-black focus:outline-none focus:border-champagne-gold transition-colors"
                    placeholder="la-tua@email.it"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="vettura"
                    className="font-body text-[9px] tracking-[0.2em] uppercase text-mid-grey"
                  >
                    Vettura di interesse (opzionale)
                  </label>
                  <select
                    id="vettura"
                    name="vettura"
                    value={form.vettura}
                    onChange={handleChange}
                    className="bg-pure-white border border-[0.5px] border-border-light px-4 py-3 font-body text-[11px] text-luxury-black focus:outline-none focus:border-champagne-gold transition-colors cursor-pointer"
                  >
                    <option value="">Seleziona una vettura</option>
                    {vetture.map((v) => (
                      <option key={v.slug} value={v.slug}>
                        {v.make} {v.model} {v.year}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="messaggio"
                    className="font-body text-[9px] tracking-[0.2em] uppercase text-mid-grey"
                  >
                    Messaggio *
                  </label>
                  <textarea
                    id="messaggio"
                    name="messaggio"
                    required
                    rows={5}
                    value={form.messaggio}
                    onChange={handleChange}
                    className="bg-pure-white border border-[0.5px] border-border-light px-4 py-3 font-body text-[11px] text-luxury-black focus:outline-none focus:border-champagne-gold transition-colors resize-none"
                    placeholder="Descrivi la tua richiesta..."
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary">
                    Invia messaggio
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-10">
            {/* WhatsApp */}
            <div className="bg-luxury-black p-7 flex flex-col gap-4">
              <div className="font-body text-[9px] tracking-[0.2em] uppercase text-champagne-gold">
                Risposta immediata
              </div>
              <h3 className="font-display text-[22px] font-light text-warm-white">
                Scrivici su WhatsApp
              </h3>
              <p className="font-body text-[11px] text-mid-grey leading-relaxed">
                Per una risposta più veloce, scrivici direttamente su WhatsApp. Brando risponde
                personalmente.
              </p>
              <a
                href="https://wa.me/39XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1A2E1A] text-[#7ABF7A] font-body text-[10px] tracking-[0.15em] uppercase px-5 py-3 hover:bg-[#1f3a1f] transition-colors self-start"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Apri WhatsApp
              </a>
            </div>

            {/* Orari */}
            <div>
              <div className="font-body text-[9px] tracking-[0.2em] uppercase text-champagne-gold mb-4">
                Orari di apertura
              </div>
              <div className="divide-y divide-[0.5px] divide-border-light">
                {orari.map((o) => (
                  <div key={o.giorno} className="flex justify-between items-center py-3">
                    <span className="font-body text-[11px] text-luxury-black">{o.giorno}</span>
                    <span className="font-body text-[11px] text-mid-grey">{o.orario}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Indirizzo */}
            <div>
              <div className="font-body text-[9px] tracking-[0.2em] uppercase text-champagne-gold mb-4">
                Dove siamo
              </div>
              <address className="not-italic font-body text-[12px] text-mid-grey leading-[1.9]">
                Via Esempio 00<br />
                00100 Roma (RM)<br />
                <a
                  href="tel:+3906XXXXXXXX"
                  className="hover:text-champagne-gold transition-colors"
                >
                  +39 06 XXX XXXXX
                </a>
                <br />
                <a
                  href="mailto:info@bernabeiautomobili.it"
                  className="hover:text-champagne-gold transition-colors"
                >
                  info@bernabeiautomobili.it
                </a>
              </address>

              {/* Google Maps placeholder */}
              <div className="mt-5 aspect-[16/9] bg-dark-graphite flex items-center justify-center">
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-mid-grey">
                  [Google Maps]
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
