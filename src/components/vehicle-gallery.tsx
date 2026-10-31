"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface VehicleGalleryProps {
  images: string[]
  alt: string
  labels: { previous: string; next: string; photo: string }
}

export function VehicleGallery({ images, alt, labels }: VehicleGalleryProps) {
  const [index, setIndex] = useState(0)
  const go = useCallback(
    (step: number) => setIndex((i) => (i + step + images.length) % images.length),
    [images.length],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1)
      if (e.key === "ArrowRight") go(1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go])

  if (images.length === 0) return null

  return (
    <div>
      <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
        <Image
          key={images[index]}
          src={images[index]}
          alt={`${alt} - ${labels.photo} ${index + 1}`}
          fill
          priority={index === 0}
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={labels.previous}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center bg-black/55 text-white hover:bg-black/75 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={labels.next}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center bg-black/55 text-white hover:bg-black/75 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute bottom-3 right-3 bg-black/60 px-2.5 py-1 text-xs text-white tabular-nums">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 sm:grid-cols-6 gap-2">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${labels.photo} ${i + 1}`}
                aria-current={i === index}
                className={`relative block aspect-[4/3] w-full overflow-hidden bg-secondary border transition-opacity ${
                  i === index ? "border-foreground" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
