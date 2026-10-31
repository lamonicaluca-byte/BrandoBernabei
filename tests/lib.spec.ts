import { expect, test } from "@playwright/test"
import { altText, groupChapters, resolveGallery } from "../src/lib/gallery"
import { fillTemplate, whatsappUrl } from "../src/lib/whatsapp"

const images = ["/vetture/x/01.webp", "/vetture/x/02.webp", "/vetture/x/03.webp", "/vetture/x/04.webp"]

test.describe("capitoli della galleria", () => {
  test("senza gallery tutte le foto stanno in un unico capitolo, nell'ordine originale", () => {
    const items = resolveGallery({ images }, "it")
    expect(items.map((i) => i.src)).toEqual(images)
    expect(new Set(items.map((i) => i.chapter))).toEqual(new Set(["foto"]))
    expect(groupChapters(items)).toEqual([{ key: "foto", count: 4, first: 0 }])
  })

  test("le foto si ordinano per capitolo e le didascalie seguono la lingua", () => {
    const gallery = [
      { file: "03.webp", chapter: "interni" as const, caption: { it: "Plancia", en: "Dashboard" } },
      { file: "01.webp", chapter: "esterni" as const, caption: "3/4 anteriore" },
      { file: "02.webp", chapter: "esterni" as const },
      { file: "04.webp", chapter: "dettagli" as const },
    ]
    const it = resolveGallery({ images, gallery }, "it")
    expect(it.map((i) => i.chapter)).toEqual(["esterni", "esterni", "interni", "dettagli"])
    expect(it.map((i) => i.src)).toEqual([images[0], images[1], images[2], images[3]])
    expect(it[2].caption).toBe("Plancia")
    expect(resolveGallery({ images, gallery }, "en")[2].caption).toBe("Dashboard")
    // lingua senza traduzione: ripiega sull'italiano
    expect(resolveGallery({ images, gallery }, "fr")[2].caption).toBe("Plancia")
    expect(groupChapters(it).map((g) => `${g.key}:${g.count}`)).toEqual(["esterni:2", "interni:1", "dettagli:1"])
  })

  test("voci che puntano a file assenti si ignorano, le foto senza voce vanno in 'altre'", () => {
    const gallery = [
      { file: "01.webp", chapter: "esterni" as const },
      { file: "99.webp", chapter: "interni" as const }, // file inesistente
    ]
    const items = resolveGallery({ images, gallery }, "it")
    expect(items).toHaveLength(4)
    expect(items[0]).toMatchObject({ src: images[0], chapter: "esterni" })
    expect(items.slice(1).every((i) => i.chapter === "altre")).toBe(true)
  })

  test("una foto non compare due volte anche se la voce è duplicata", () => {
    const gallery = [
      { file: "01.webp", chapter: "esterni" as const },
      { file: "01.webp", chapter: "interni" as const },
    ]
    expect(resolveGallery({ images, gallery }, "it").filter((i) => i.src === images[0])).toHaveLength(1)
  })

  test("il testo alternativo non è mai vuoto", () => {
    expect(altText("Rolls-Royce Ghost 2026", "Interni", "Plancia")).toBe("Rolls-Royce Ghost 2026, Interni, Plancia")
    expect(altText("Rolls-Royce Ghost 2026", "Esterni")).toBe("Rolls-Royce Ghost 2026, Esterni")
  })
})

test.describe("link WhatsApp", () => {
  test("il messaggio sulla foto è precompilato e codificato", () => {
    const text = fillTemplate("Buongiorno, mi interessa la {car}. Ho una domanda sulla foto {chapter} {n}.", {
      car: "Rolls-Royce Ghost 2026",
      chapter: "Interni",
      n: 2,
    })
    expect(text).toBe("Buongiorno, mi interessa la Rolls-Royce Ghost 2026. Ho una domanda sulla foto Interni 2.")
    const url = whatsappUrl(text)
    expect(url.startsWith("https://wa.me/393395027983?text=")).toBe(true)
    expect(new URL(url).searchParams.get("text")).toBe(text)
  })

  test("senza messaggio il link è quello semplice; segnaposto sconosciuti restano intatti", () => {
    expect(whatsappUrl()).toBe("https://wa.me/393395027983")
    expect(fillTemplate("ciao {x} {y}", { x: 1 })).toBe("ciao 1 {y}")
  })
})
