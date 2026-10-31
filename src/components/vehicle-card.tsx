import Image from "next/image"
import Link from "next/link"
import { Gauge, Settings } from "lucide-react"
import type { Vettura } from "@/data/vetture"
import { displayVersion } from "@/lib/vehicle"

export interface VehicleCardLabels {
  discover: string
  fuels: Record<string, string>
  gearboxes: Record<string, string>
}

const LOCALE_TAG: Record<string, string> = { it: "it-IT", en: "en-GB", fr: "fr-FR" }

export function VehicleCard({
  car,
  lang,
  labels,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: {
  car: Vettura
  lang: string
  labels: VehicleCardLabels
  priority?: boolean
  sizes?: string
}) {
  const fmt = new Intl.NumberFormat(LOCALE_TAG[lang] ?? "it-IT")
  return (
    <Link
      href={`/${lang}/vetture/${car.id}`}
      className="group flex h-full flex-col bg-card border border-border overflow-hidden hover:border-accent/40 transition-colors duration-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {car.images[0] && (
          <Image
            src={car.images[0]}
            alt={`${car.make} ${car.model} ${car.year}`}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-gold-brand transition-colors">
              {car.make} {car.model}
            </h3>
            {displayVersion(car) && (
              <p className="mt-0.5 truncate text-sm text-foreground/70">{displayVersion(car)}</p>
            )}
            <p className="mt-0.5 text-sm text-muted-foreground">
              {car.year} · {labels.fuels[car.fuel] ?? car.fuel} · {car.cv} CV
            </p>
          </div>
          <p className="font-serif text-xl font-light text-foreground whitespace-nowrap">
            € {fmt.format(car.price)}
          </p>
        </div>
        <div className="h-5 shrink-0" aria-hidden="true" />
        <div className="mt-auto flex items-center gap-5 border-t border-border pt-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Settings className="h-3.5 w-3.5" />
            {labels.gearboxes[car.gearbox] ?? car.gearbox}
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5" />
            {fmt.format(car.km)} km
          </span>
          <span className="ml-auto text-gold-brand font-medium">{labels.discover}</span>
        </div>
      </div>
    </Link>
  )
}
