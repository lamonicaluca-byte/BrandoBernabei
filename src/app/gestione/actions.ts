"use server"

import { randomBytes } from "node:crypto"
import { revalidatePath } from "next/cache"
import sharp from "sharp"
import { endSession, isAuthenticated, passwordMatches, startSession } from "@/lib/admin-auth"
import { commitFiles, getGithubConfig, readTextFile } from "@/lib/github"
import type { Venduta } from "@/data/vendute"

const DATA_PATH = "src/data/vendute.json"
const MAX_PHOTO_BYTES = 4 * 1024 * 1024 // limite di Vercel per il corpo della richiesta: 4,5 MB

export interface ActionState {
  ok: boolean
  message: string
  nonce: number
}

const fail = (message: string): ActionState => ({ ok: false, message, nonce: Date.now() })
const done = (message: string): ActionState => ({ ok: true, message, nonce: Date.now() })

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

async function readEntries(cfg: NonNullable<ReturnType<typeof getGithubConfig>>): Promise<Venduta[]> {
  const raw = await readTextFile(cfg, DATA_PATH)
  return raw ? (JSON.parse(raw) as Venduta[]) : []
}

const clean = (v: FormDataEntryValue | null) => String(v ?? "").trim().replace(/\s+/g, " ")

export async function addVenduta(_prev: ActionState | null, formData: FormData): Promise<ActionState> {
  if (!(await isAuthenticated())) return fail("Sessione scaduta: rientra con la password.")
  const cfg = getGithubConfig()
  if (!cfg) return fail("Il collegamento a GitHub non è configurato (GITHUB_TOKEN).")

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
    // rotate() applica l'orientamento EXIF; l'output non conserva i metadati (posizione GPS inclusa)
    jpeg = await sharp(Buffer.from(await photo.arrayBuffer()))
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer()
  } catch {
    return fail("Non riesco a leggere la foto: prova con un JPG o PNG.")
  }

  const slug = `${make}-${model}-${soldAt}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  const image = `/vendute/${slug}-${randomBytes(2).toString("hex")}.jpg`

  try {
    const entries = await readEntries(cfg)
    entries.push({ make, model, year, km, image, soldAt })
    await commitFiles(cfg, `feat: aggiunge ${make} ${model} alle consegnate`, [
      { path: `public${image}`, content: jpeg },
      { path: DATA_PATH, content: JSON.stringify(entries, null, 2) + "\n" },
    ])
  } catch (e) {
    console.error(e)
    return fail("Pubblicazione non riuscita. Riprova tra poco; se persiste avvisa Luca.")
  }
  revalidatePath("/gestione")
  return done(`${make} ${model} salvata. Sarà online sul sito tra circa un minuto.`)
}

export async function removeVenduta(formData: FormData): Promise<void> {
  if (!(await isAuthenticated())) return
  const cfg = getGithubConfig()
  if (!cfg) return
  const image = String(formData.get("image") ?? "")
  if (!/^\/vendute\/[a-z0-9-]+\.jpg$/.test(image)) return
  const entries = await readEntries(cfg)
  const next = entries.filter((e) => e.image !== image)
  if (next.length === entries.length) return
  await commitFiles(cfg, "chore: rimuove un'auto dalle consegnate", [
    { path: `public${image}`, delete: true },
    { path: DATA_PATH, content: JSON.stringify(next, null, 2) + "\n" },
  ])
  revalidatePath("/gestione")
}
