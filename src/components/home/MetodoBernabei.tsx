import SectionLabel from "@/components/ui/SectionLabel";

const steps = [
  {
    number: "01",
    title: "Selezione",
    desc: "Ogni vettura viene scelta personalmente da Brando. Nessun acquisto automatico, nessun compromesso sulla qualità.",
  },
  {
    number: "02",
    title: "Verifica",
    desc: "Ispezione tecnica approfondita, storico completo, verifica carrozzeria e meccanica da tecnici di fiducia.",
  },
  {
    number: "03",
    title: "Preparazione",
    desc: "La vettura arriva da te in condizioni perfette. Detailing professionale, eventuali interventi già eseguiti.",
  },
  {
    number: "04",
    title: "Consegna",
    desc: "Accompagnamento durante tutta la pratica. Consegna in tutta Italia, assistenza anche dopo la firma.",
  },
];

export default function MetodoBernabei() {
  return (
    <section className="bg-[#080808] py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <SectionLabel className="mb-4" light>
          Il nostro approccio
        </SectionLabel>
        <h2 className="font-display font-light text-[32px] text-[#F5F0E8] mb-12">
          Il metodo Bernabei
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`py-8 pr-8 flex flex-col gap-4 ${
                i > 0
                  ? "border-t lg:border-t-0 lg:border-l border-[#1E1E1E] lg:pl-8"
                  : ""
              }`}
            >
              <div className="font-display text-5xl text-[#555] leading-none select-none">
                {step.number}
              </div>
              <div className="uppercase tracking-[.2em] text-[10px] text-[#C9A96E]">
                {step.title}
              </div>
              <p className="text-[10px] text-[#C0C0C0] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
