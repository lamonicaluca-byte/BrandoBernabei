import { readFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

export interface PhotoMeta {
  width: number
  height: number
  /** Miniatura sfocata incorporata, per il segnaposto senza salti di layout */
  blur?: string
}

const cache = new Map<string, PhotoMeta>()

/** Legge dimensioni e miniatura sfocata di una foto in /public. Da usare solo lato server (in fase di build). */
export async function photoMeta(src: string): Promise<PhotoMeta> {
  const hit = cache.get(src)
  if (hit) return hit
  let meta: PhotoMeta = { width: 1280, height: 960 }
  try {
    const input = await readFile(path.join(process.cwd(), "public", src))
    const image = sharp(input)
    const info = await image.metadata()
    const tiny = await image.resize(16).webp({ quality: 40 }).toBuffer()
    meta = {
      width: info.width ?? 1280,
      height: info.height ?? 960,
      blur: `data:image/webp;base64,${tiny.toString("base64")}`,
    }
  } catch {
    // file non trovato: si usano misure di riserva, la pagina funziona lo stesso
  }
  cache.set(src, meta)
  return meta
}
