import Link from "next/link";

const pageLinks = [
  { label: "Vetture", href: "/vetture" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Servizi", href: "/servizi" },
  { label: "Recensioni", href: "/recensioni" },
];

export default function Footer() {
  return (
    <footer className="bg-[#050505] pt-12 pb-6 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
          {/* Col 1 – Brand */}
          <div className="flex flex-col gap-3">
            <span className="font-display text-[#C9A96E] text-[28px] font-light tracking-[.1em]">
              Bernabei Automobili
            </span>
            <p className="font-body text-[12px] text-[#8A8A8A] leading-relaxed max-w-[280px]">
              Concessionaria specializzata in vetture premium e sportive · Roma
            </p>
          </div>

          {/* Col 2 – Pages */}
          <div className="flex flex-col gap-4">
            <span className="uppercase tracking-[.22em] text-[9px] text-[#888]">
              Pagine
            </span>
            <nav className="flex flex-col gap-2.5">
              {pageLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-[12px] text-[#9A9A9A] hover:text-[#C9A96E] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 – Contacts */}
          <div className="flex flex-col gap-4">
            <span className="uppercase tracking-[.22em] text-[9px] text-[#888]">
              Contatti
            </span>
            <address className="not-italic flex flex-col gap-2 font-body text-[12px] text-[#9A9A9A]">
              <span>Via Flaminia, 318/a · 00196 Roma (RM)</span>
              <a
                href="tel:+393395027983"
                className="hover:text-[#C9A96E] transition-colors"
              >
                +39 339 502 7983
              </a>
              <a
                href="mailto:info@bernabeiautomobili.it"
                className="hover:text-[#C9A96E] transition-colors"
              >
                info@bernabeiautomobili.it
              </a>
            </address>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#2A2A2A]" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-5 gap-3">
          <span className="font-body text-[9px] text-[#666]">
            © {new Date().getFullYear()} Bernabei Automobili di Brando Bernabei · P.IVA 15074791003
          </span>
          <a
            href="https://wa.me/393395027983"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1A2E1A] text-[#7ABF7A] font-body text-[9px] tracking-[.15em] uppercase px-4 py-2 hover:bg-[#1f3a1f] transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Scrivici su WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
