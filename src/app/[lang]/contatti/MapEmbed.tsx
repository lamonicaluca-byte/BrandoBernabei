"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/Button"

const MAPS_URL = "https://maps.app.goo.gl/EhJjdfo2syPRQTgKA"

/** La mappa di Google si carica solo dopo il clic: prima di allora nessun dato parte verso Google. */
export function MapEmbed({
  lang,
  title,
  labels,
}: {
  lang: string
  title: string
  labels: { load: string; notice: string; open: string }
}) {
  const [loaded, setLoaded] = useState(false)

  if (loaded) {
    return (
      <iframe
        src={`https://maps.google.com/maps?q=Bernabei+Automobili+di+Brando+Bernabei+Via+Flaminia+318a+Roma&output=embed&hl=${lang}&z=17`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    )
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 bg-secondary px-6 text-center">
      <MapPin className="h-8 w-8 text-gold-brand" aria-hidden="true" />
      <p className="max-w-md text-sm text-muted-foreground">{labels.notice}</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="button" onClick={() => setLoaded(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          {labels.load}
        </Button>
        <Button asChild variant="outline" className="border-border hover:border-accent">
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">{labels.open}</a>
        </Button>
      </div>
    </div>
  )
}
