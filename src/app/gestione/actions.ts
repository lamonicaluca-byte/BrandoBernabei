"use server"

import { randomBytes } from "node:crypto"
import { revalidatePath } from "next/cache"
import sharp from "sharp"
import { endSession, isAuthenticated, passwordMatches, startSession } from "@/lib/admin-auth"
import { commitFiles, getGithubConfig, readTextFile, type FileChange, type GithubConfig } from "@/lib/github"
import type { Venduta } from "@/data/vendute"
import type { Vettura } from "@/data/vetture"

const VENDUTE_PATH = "src/data/vendute.json"
const VETTURE_PATH = "src/data/vetture.json"
const MAX_PHOTO_BYTES = 4 * 1024 * 1024 // limite di Vercel per il corpo della richiesta: 4,5 MB
const MAX_PHOTOS_PER_SAVE = 12
const FUELS = ["Benzina", "Diesel", "Ibrida", "Elettrica", "GPL", "Metano"]
const GEARBOXES = ["Manuale", "Automatico", "Semiautomatico"]
const IMAGE_PATH = /^\/vetture\/[a-z0-9-]+\/[a-z0-9]+\.(jpg|webp)$/
// una consegnata ha la foto in /vendute oppure, se arriva dalle disponibili, quella di copertina rimasta in /vetture
const SOLD_IMAGE_PATH = /^\/(vendute\/[a-z0-9-]+\.jpg|vetture\/[a-z0-9-]+\/[a-z0-9]+\.(jpg|webp))$/

export interface ActionState {
  ok: boolean
  message: string
  nonce: number
}

const fail = (message: string): ActionState => ({ ok: false, message, nonce: Date.now() })
const done = (message: string): ActionState => ({ ok: true, message, nonce: Date.now() })
const clean = (v: FormDataEntryValue | null) => String(v ?? "").trim().replace(/[ \t]+/g, " ")
const toJson = (v: unknown) => JSON.stringify(v, null, 2) + "\n"

async function readList<T>(cfg: GithubConfig, path: string): Promise<T[]> {
  const raw = await readTextFile(cfg, path)
  return raw ? (JSON.parse(raw) as T[]) : []
}

function moved<T>(list: T[], index: number, dir: string): T[] | null {
  const to = dir === "up" ? index - 1 : index + 1
  if (index < 0 || to < 0 || to >= list.length) return null
  const copy = [...list]
  ;[copy[index], copy[to]] = [copy[to], copy[index]]
  return copy
}

/** rotate() applica l'orientamento EXIF; l'output non conserva i metadati (posizione GPS inclusa). */
async function toJpeg(file: File): Promise<Buffer> {
  return sharp(Buffer.from(await file.arrayBuffer()))
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer()
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

async function guard(): Promise<{ cfg: GithubConfig } | { error: ActionState }> {
  if (!(await isAuthenticated())) return { error: fail("Sessione scaduta: rientra con la password.") }
  const cfg = getGithubConfig()
  if (!cfg) return { error: fail("Il collegamento a GitHub non è configurato (GITHUB_TOKEN).") }
  return { cfg }
}

// ───────────────────────────── accesso ─────────────────────────────

export async function login(_prev: ActionState | null, formData: FormData): Promise<ActionState> {
  // piccolo rallentamento contro i tentativi a raffica
  await new Promise((r) => setTimeout(r, 800))
  if (!process.env.ADMIN_PASSWORD) return fail("Password non configurata sul server.")
  if (!passwordMatches(String(formData.get("password") ?? ""))) return fail("Password errata.")
  await startSession()
  revalidatePath("/gestione")
  return done("ok")
}

export async function logout() {
  await endSession()
  revalidatePath("/gestione")
}

// ───────────────────────────── consegnate ─────────────────────────────

export async function addVenduta(_prev: ActionState | null, formData: FormData): Promise<ActionState> {
  const g = await guard()
  if ("error" in g) return g.error
  const { cfg } = g

  const make = clean(formData.get("make"))
  const model = clean(formData.get("model"))
  const year = Number(formData.get("year"))
  const km = Number(formData.get("km"))
  const soldAt = clean(formData.get("soldAt"))
  const photo = formData.get("photo")

  const thisYear = new Date().getFullYear()
  if (make.length < 2 || make.length > 40) return fail("Marca non valida.")
  if (model.length < 1 || model.length > 60) return fail("Modello non valido.")
  if (!Number.isInteger(year) || year < 1960 || year > thisYear + 1) return fail("Anno non valido.")
  if (!Number.isInteger(km) || km < 0 || km > 999_999) return fail("Chilometri non validi.")
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(soldAt)) return fail("Mese di consegna non valido.")
  if (!(photo instanceof File) || photo.size === 0) return fail("Aggiungi una foto.")
  if (photo.size > MAX_PHOTO_BYTES) return fail("La foto è troppo pesante (massimo 4 MB).")

  let jpeg: Buffer
  try {
    jpeg = await toJpeg(photo)
  } catch {
    return fail("Non riesco a leggere la foto: prova con un JPG o PNG.")
  }

  const image = `/vendute/${slugify(`${make}-${model}-${soldAt}`)}-${randomBytes(2).toString("hex")}.jpg`
  try {
    const entries = await readList<Venduta>(cfg, VENDUTE_PATH)
    entries.unshift({ make, model, year, km, image, soldAt }) // le nuove in cima
    await commitFiles(cfg, `feat: aggiunge ${make} ${model} alle consegnate`, [
      { path: `public${image}`, content: jpeg },
      { path: VENDUTE_PATH, content: toJson(entries) },
    ])
  } catch (e) {
    console.error(e)
    return fail("Pubblicazione non riuscita. Riprova tra poco; se persiste avvisa Luca.")
  }
  revalidatePath("/gestione")
  return done(`${make} ${model} salvata. Sarà online sul sito tra circa un minuto.`)
}

export async function moveVenduta(formData: FormData): Promise<void> {
  const g = await guard()
  if ("error" in g) return
  const image = String(formData.get("image") ?? "")
  const entries = await readList<Venduta>(g.cfg, VENDUTE_PATH)
  const next = moved(entries, entries.findIndex((e) => e.image === image), String(formData.get("dir")))
  if (!next) return
  await commitFiles(g.cfg, "chore: cambia l'ordine delle consegnate", [{ path: VENDUTE_PATH, content: toJson(next) }])
  revalidatePath("/gestione")
}

export async function removeVenduta(formData: FormData): Promise<void> {
  const g = await guard()
  if ("error" in g) return
  const image = String(formData.get("image") ?? "")
  if (!SOLD_IMAGE_PATH.test(image)) return
  const entries = await readList<Venduta>(g.cfg, VENDUTE_PATH)
  const next = entries.filter((e) => e.image !== image)
  if (next.length === entries.length) return
  await commitFiles(g.cfg, "chore: rimuove un'auto dalle consegnate", [
    { path: `public${image}`, delete: true },
    { path: VENDUTE_PATH, content: toJson(next) },
  ])
  revalidatePath("/gestione")
}

// ───────────────────────────── disponibili ─────────────────────────────


/** Crea una vettura, oppure ne modifica una esistente se il modulo contiene "id". */
export async function saveVettura(_prev: ActionState | null, formData: FormData): Promise<ActionState> {
  const g = await guard()
  if ("error" in g) return g.error
  const { cfg } = g

  const editId = clean(formData.get("id"))
  const make = clean(formData.get("make"))
  const model = clean(formData.get("model"))
  const version = clean(formData.get("version"))
  const year = Number(formData.get("year"))
  const km = Number(formData.get("km"))
  const cv = Number(formData.get("cv"))
  const price = Number(formData.get("price"))
  const fuel = clean(formData.get("fuel"))
  const gearbox = clean(formData.get("gearbox"))
  const color = clean(formData.get("color"))
  const description = String(formData.get("description") ?? "").replace(/\r\n/g, "\n").trim()
  const autoscoutUrl = clean(formData.get("autoscoutUrl"))
  const photos = formData.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0)

  const thisYear = new Date().getFullYear()
  if (make.length < 2 || make.length > 40) return fail("Marca non valida.")
  if (model.length < 1 || model.length > 60) return fail("Modello non valido.")
  if (version.length > 120) return fail("Versione troppo lunga.")
  if (!Number.isInteger(year) || year < 1930 || year > thisYear + 1) return fail("Anno non valido.")
  if (!Number.isInteger(km) || km < 0 || km > 999_999) return fail("Chilometri non validi.")
  if (!Number.isInteger(cv) || cv < 0 || cv > 3000) return fail("Potenza non valida.")
  if (!Number.isInteger(price) || price <= 0 || price > 99_999_999) return fail("Prezzo non valido.")
  if (!FUELS.includes(fuel)) return fail("Alimentazione non valida.")
  if (!GEARBOXES.includes(gearbox)) return fail("Cambio non valido.")
  if (color.length > 30) return fail("Colore troppo lungo.")
  if (description.length > 8000) return fail("Descrizione troppo lunga (massimo 8000 caratteri).")
  if (autoscoutUrl && !/^https:\/\/www\.autoscout24\.[a-z]{2,3}\//.test(autoscoutUrl)) {
    return fail("Il link AutoScout24 non sembra corretto.")
  }
  if (photos.length > MAX_PHOTOS_PER_SAVE) return fail(`Carica al massimo ${MAX_PHOTOS_PER_SAVE} foto per volta.`)
  if (photos.reduce((n, f) => n + f.size, 0) > MAX_PHOTO_BYTES) {
    return fail("Le foto sono troppo pesanti insieme: caricane meno per volta (puoi aggiungerne altre dopo con Modifica).")
  }

  try {
    const entries = await readList<Vettura>(cfg, VETTURE_PATH)
    const index = editId ? entries.findIndex((e) => e.id === editId) : -1
    if (editId && index < 0) return fail("Auto non trovata: ricarica la pagina.")
    const existing = index >= 0 ? entries[index] : undefined

    let slug = existing?.id
    if (!slug) {
      const base = slugify(`${make} ${version || model} ${year}`) || "auto"
      slug = base
      for (let n = 2; entries.some((e) => e.id === slug); n++) slug = `${base}-${n}`
    }

    const changes: FileChange[] = []
    const removed = new Set(
      formData.getAll("removeImage").map(String).filter((p) => IMAGE_PATH.test(p) && existing?.images.includes(p)),
    )
    let images = (existing?.images ?? []).filter((p) => !removed.has(p))
    for (const p of removed) changes.push({ path: `public${p}`, delete: true })

    for (const file of photos) {
      let jpeg: Buffer
      try {
        jpeg = await toJpeg(file)
      } catch {
        return fail("Non riesco a leggere una delle foto: prova con JPG o PNG.")
      }
      const path = `/vetture/${slug}/${randomBytes(3).toString("hex")}.jpg`
      changes.push({ path: `public${path}`, content: jpeg })
      images.push(path)
    }

    const cover = clean(formData.get("cover"))
    if (cover && images.includes(cover)) images = [cover, ...images.filter((p) => p !== cover)]
    if (images.length === 0) return fail("Serve almeno una foto.")

    const entry: Vettura = {
      ...existing,
      id: slug,
      make,
      model,
      version,
      year,
      km,
      cv,
      price,
      fuel,
      gearbox,
      color,
      description,
      images,
      autoscoutUrl: autoscoutUrl || undefined,
    }
    if (index >= 0) entries[index] = entry
    else entries.unshift(entry) // le nuove in cima

    changes.push({ path: VETTURE_PATH, content: toJson(entries) })
    await commitFiles(cfg, `feat: ${index >= 0 ? "aggiorna" : "aggiunge"} ${make} ${model} tra le disponibili`, changes)
  } catch (e) {
    console.error(e)
    return fail("Pubblicazione non riuscita. Riprova tra poco; se persiste avvisa Luca.")
  }
  revalidatePath("/gestione/disponibili")
  return done(`${make} ${model} salvata. Sarà online sul sito tra circa un minuto.`)
}

export async function moveVettura(formData: FormData): Promise<void> {
  const g = await guard()
  if ("error" in g) return
  const id = String(formData.get("id") ?? "")
  const entries = await readList<Vettura>(g.cfg, VETTURE_PATH)
  const next = moved(entries, entries.findIndex((e) => e.id === id), String(formData.get("dir")))
  if (!next) return
  await commitFiles(g.cfg, "chore: cambia l'ordine delle auto disponibili", [{ path: VETTURE_PATH, content: toJson(next) }])
  revalidatePath("/gestione/disponibili")
}

/**
 * Sposta un'auto dalle disponibili alle consegnate. Della scheda resta solo la foto di copertina
 * (usata per la card nelle consegnate); le altre foto vengono tolte per non appesantire il sito.
 */
export async function markSold(formData: FormData): Promise<void> {
  const g = await guard()
  if ("error" in g) return
  const id = String(formData.get("id") ?? "")
  const soldAt = clean(formData.get("soldAt"))
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(soldAt)) return

  const [vetture, vendute] = await Promise.all([
    readList<Vettura>(g.cfg, VETTURE_PATH),
    readList<Venduta>(g.cfg, VENDUTE_PATH),
  ])
  const car = vetture.find((v) => v.id === id)
  const cover = car?.images[0]
  if (!car || !cover || !SOLD_IMAGE_PATH.test(cover)) return

  vendute.unshift({ make: car.make, model: car.model, year: car.year, km: car.km, image: cover, soldAt }) // in cima
  await commitFiles(g.cfg, `feat: ${car.make} ${car.model} passa alle consegnate`, [
    ...car.images.slice(1).filter((p) => IMAGE_PATH.test(p)).map((p) => ({ path: `public${p}`, delete: true as const })),
    { path: VETTURE_PATH, content: toJson(vetture.filter((v) => v.id !== id)) },
    { path: VENDUTE_PATH, content: toJson(vendute) },
  ])
  revalidatePath("/gestione/disponibili")
  revalidatePath("/gestione")
}

export async function removeVettura(formData: FormData): Promise<void> {
  const g = await guard()
  if ("error" in g) return
  const id = String(formData.get("id") ?? "")
  const entries = await readList<Vettura>(g.cfg, VETTURE_PATH)
  const target = entries.find((e) => e.id === id)
  if (!target) return
  await commitFiles(g.cfg, `chore: rimuove ${target.make} ${target.model} dalle disponibili`, [
    ...target.images.filter((p) => IMAGE_PATH.test(p)).map((p) => ({ path: `public${p}`, delete: true as const })),
    { path: VETTURE_PATH, content: toJson(entries.filter((e) => e.id !== id)) },
  ])
  revalidatePath("/gestione/disponibili")
}
