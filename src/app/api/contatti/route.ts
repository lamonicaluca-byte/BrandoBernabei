import { NextResponse } from "next/server"

// Invio del modulo contatti via Resend (https://resend.com).
// Variabili d'ambiente su Vercel:
//   RESEND_API_KEY  obbligatoria
//   CONTACT_TO      destinatario (predefinito: info@bernabeiautomobili.com)
//   CONTACT_FROM    mittente verificato su Resend, es. "Bernabei Automobili <sito@bernabeiautomobili.com>"
//                   (predefinito: onboarding@resend.dev, che però invia solo all'indirizzo del proprio account Resend)

const MIN_FILL_MS = 3000 // un essere umano non compila il modulo in meno di 3 secondi
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear() // evita che la mappa cresca senza limite
  return recent.length > MAX_PER_WINDOW
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

const clean = (v: unknown, max: number) => String(v ?? "").replace(/\r/g, "").trim().slice(0, max)

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 })
  }

  // il campo "website" è invisibile: solo i bot lo compilano. Rispondiamo "ok" senza inviare nulla.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true })

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim()
  if (rateLimited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 })

  const nome = clean(body.nome, 120)
  const telefono = clean(body.telefono, 40)
  const email = clean(body.email, 160)
  const messaggio = clean(body.messaggio, 4000)
  const lang = clean(body.lang, 5)
  const consent = body.consent === true
  const elapsed = Number(body.elapsed)

  if (!nome || !telefono || !messaggio) return NextResponse.json({ error: "invalid" }, { status: 400 })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "invalid" }, { status: 400 })
  if (!/^[+\d][\d\s().-]{5,}$/.test(telefono)) return NextResponse.json({ error: "invalid" }, { status: 400 })
  if (!consent) return NextResponse.json({ error: "consent" }, { status: 400 })
  if (Number.isFinite(elapsed) && elapsed < MIN_FILL_MS) return NextResponse.json({ ok: true }) // troppo veloce: bot

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY non configurata: messaggio dal sito non inviato")
    return NextResponse.json({ error: "not_configured" }, { status: 503 })
  }

  const text = [
    `Nome: ${nome}`,
    `Telefono: ${telefono}`,
    `Email: ${email}`,
    `Lingua del sito: ${lang || "n/d"}`,
    `Consenso privacy: sì (${new Date().toISOString()})`,
    "",
    messaggio,
  ].join("\n")

  const html = `<p><strong>Nuovo messaggio dal sito</strong></p>
<p>Nome: ${esc(nome)}<br>Telefono: <a href="tel:${esc(telefono)}">${esc(telefono)}</a><br>Email: <a href="mailto:${esc(email)}">${esc(email)}</a><br>Lingua: ${esc(lang || "n/d")}</p>
<p style="white-space:pre-wrap">${esc(messaggio)}</p>`

  const res = await fetch(process.env.RESEND_API_URL ?? "https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Bernabei Automobili <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO ?? "info@bernabeiautomobili.com"],
      reply_to: email,
      subject: `Nuovo messaggio dal sito: ${nome}`,
      text,
      html,
    }),
  })

  if (!res.ok) {
    console.error("Resend ha risposto", res.status, (await res.text()).slice(0, 300))
    return NextResponse.json({ error: "send_failed" }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
