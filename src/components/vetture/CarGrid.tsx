import CarCard from "./CarCard";
import { Vettura } from "@/data/vetture";

interface Props {
  vetture: Vettura[];
}

export default function CarGrid({ vetture }: Props) {
  if (vetture.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-display text-[24px] font-light text-mid-grey">
          Nessuna vettura corrisponde ai filtri selezionati.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {vetture.map((v) => (
        <CarCard key={v.slug} vettura={v} />
      ))}
    </div>
  );
}
