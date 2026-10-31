import type { ChapterKey } from "@/lib/gallery"

export interface GalleryPhoto {
  src: string
  width: number
  height: number
  /** Miniatura sfocata incorporata (segnaposto) */
  blur?: string
  chapter: ChapterKey
  caption?: string
  /** Testo alternativo già composto: marca, modello, allestimento, anno, capitolo, didascalia */
  alt: string
}

export interface GalleryLabels {
  label: string
  slide: string
  chaptersNav: string
  chapters: Record<string, string>
  counter: string
  allPhotos: string
  allPhotosTitle: string
  openPhoto: string
  close: string
  previous: string
  next: string
  zoom: string
  loadError: string
  actionTitle: string
  actionText: string
  actionBook: string
  actionVideo: string
  videoMessage: string
  askPhoto: string
  photoMessage: string
}
