const brands = [
  'Porsche',
  'Ferrari',
  'BMW M',
  'Mercedes-AMG',
  'Lamborghini',
  'Bentley',
  'Maserati',
  'Aston Martin',
  'McLaren',
  'Pagani',
]

interface BrandStripDict {
  label: string
}

export function BrandStripSection({ dict }: { dict: BrandStripDict }) {
  return (
    <section className="bg-[#050505] border-b border-white/5 py-5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span className="font-sans text-[9px] uppercase tracking-[.3em] text-[#C9A96E] shrink-0 hidden sm:inline">
            {dict.label}
          </span>
          <div className="w-px h-3 bg-[#C9A96E]/15 hidden sm:block" />
          {brands.map((brand) => (
            <span
              key={brand}
              className="font-sans text-[10px] uppercase tracking-[.22em] text-white whitespace-nowrap hover:text-[#C9A96E] transition-colors"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
