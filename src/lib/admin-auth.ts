import { createHash, createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

const COOKIE = "gestione_session"
const MAX_AGE = 60 * 60 * 24 * 7 // 7 giorni

function secret(): string | null {
  return process.env.ADMIN_SECRET ?? process.env.ADMIN_PASSWORD ?? null
}

function sign(value: string, key: string) {
  return createHmac("sha256", key).update(value).digest("hex")
}

function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest()
  const hb = createHash("sha256").update(b).digest()
  return timingSafeEqual(ha, hb)
}

export function passwordMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  return safeEqual(input, expected)
}

export async function startSession() {
  const key = secret()
  if (!key) throw new Error("ADMIN_PASSWORD non configurata")
  const expires = Date.now() + MAX_AGE * 1000
  const jar = await cookies()
  jar.set(COOKIE, `${expires}.${sign(String(expires), key)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/gestione",
    maxAge: MAX_AGE,
  })
}

export async function endSession() {
  const jar = await cookies()
  jar.delete({ name: COOKIE, path: "/gestione" })
}

export async function isAuthenticated(): Promise<boolean> {
  const key = secret()
  if (!key) return false
  const jar = await cookies()
  const raw = jar.get(COOKIE)?.value
  if (!raw) return false
  const [expires, sig] = raw.split(".")
  if (!expires || !sig || Number(expires) < Date.now()) return false
  return safeEqual(sig, sign(expires, key))
}
