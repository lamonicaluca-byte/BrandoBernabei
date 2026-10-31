import { expect, test, type Page } from "@playwright/test"

const region = (page: Page) => page.getByRole("region", { name: "Auto disponibili" })

test.describe("fila scorrevole delle auto in home (mobile)", () => {
  test("sei auto più la scheda 'Vedi tutte', con la successiva in parte visibile", async ({ page }) => {
    await page.goto("/it", { waitUntil: "networkidle" })
    const track = region(page)
    await track.scrollIntoViewIfNeeded()
    await expect(track.getByRole("group")).toHaveCount(7)
    const first = track.getByRole("group").nth(0)
    const second = track.getByRole("group").nth(1)
    const [a, b] = [(await first.boundingBox())!, (await second.boundingBox())!]
    expect(a.x).toBeGreaterThanOrEqual(0)
    expect(a.x + a.width).toBeLessThanOrEqual(375) // la prima è intera
    expect(b.x).toBeGreaterThan(a.x + a.width - 1) // la seconda è a destra...
    expect(b.x).toBeLessThan(375) // ...ma ne spunta un pezzo: si capisce che si scorre
    expect(b.x + b.width).toBeGreaterThan(375) // e non è tutta visibile
  })

  test("scorrendo fino in fondo compare 'Vedi tutte le auto' e porta all'elenco", async ({ page }) => {
    await page.goto("/it", { waitUntil: "networkidle" })
    const track = region(page)
    await track.evaluate((el) => el.scrollTo({ left: el.scrollWidth }))
    const all = track.getByRole("link", { name: /Vedi tutte le auto \(\d+\)/ })
    await expect(all).toBeVisible()
    await all.click()
    await expect(page).toHaveURL(/\/it\/vetture$/)
  })

  test("le schede portano alla scheda auto e la pagina non ha scorrimento orizzontale", async ({ page }) => {
    await page.goto("/it", { waitUntil: "networkidle" })
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0)
    const link = region(page).getByRole("link").first()
    expect(await link.getAttribute("href")).toMatch(/^\/it\/vetture\/[a-z0-9-]+$/)
  })

  test("tastiera: freccia destra sposta di una scheda", async ({ page }) => {
    await page.goto("/it", { waitUntil: "networkidle" })
    const track = region(page)
    await track.focus()
    const before = await track.evaluate((el) => el.scrollLeft)
    await page.keyboard.press("ArrowRight")
    await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(before + 50)
  })

  test("le immagini fuori vista non si scaricano tutte subito e non superano 1080 px", async ({ page }) => {
    const widths: number[] = []
    page.on("request", (r) => {
      const m = r.url().match(/_next\/image\?url=%2Fvetture.*[?&]w=(\d+)/)
      if (m) widths.push(Number(m[1]))
    })
    await page.goto("/it", { waitUntil: "networkidle" })
    await region(page).scrollIntoViewIfNeeded()
    await page.waitForTimeout(800)
    expect(widths.length).toBeLessThanOrEqual(6)
    expect(Math.max(0, ...widths)).toBeLessThanOrEqual(1080)
  })
})

test.describe("altre lingue", () => {
  test("inglese e francese: nome della fila e scheda finale tradotti", async ({ page }) => {
    await page.goto("/en", { waitUntil: "networkidle" })
    await expect(page.getByRole("region", { name: "Available cars" }).getByRole("link", { name: /See all cars/ })).toHaveCount(1)
    await page.goto("/fr", { waitUntil: "networkidle" })
    await expect(page.getByRole("region", { name: "Voitures disponibles" }).getByRole("link", { name: /Voir toutes les voitures/ })).toHaveCount(1)
  })
})

test.describe("Android 360 px", () => {
  test.use({ viewport: { width: 360, height: 800 } })
  test("nessuno scorrimento orizzontale", async ({ page }) => {
    await page.goto("/it", { waitUntil: "networkidle" })
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0)
  })
})

test.describe("desktop", () => {
  test.use({ viewport: { width: 1280, height: 900 }, isMobile: false, hasTouch: false, deviceScaleFactor: 1 })

  test("tre schede in fila, frecce che scorrono e si disattivano agli estremi", async ({ page }) => {
    await page.goto("/it", { waitUntil: "networkidle" })
    const track = region(page)
    await track.scrollIntoViewIfNeeded()
    const prev = page.getByRole("button", { name: "Auto precedente" })
    const next = page.getByRole("button", { name: "Auto successiva" })
    await expect(next).toBeVisible()
    await expect(prev).toBeDisabled()
    const widths = await track.getByRole("group").evaluateAll((els) => els.slice(0, 4).map((e) => Math.round(e.getBoundingClientRect().left)))
    expect(widths.filter((x) => x < 1280).length).toBeGreaterThanOrEqual(3)
    await next.click()
    await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(100)
    await expect(prev).toBeEnabled()
    await track.evaluate((el) => el.scrollTo({ left: el.scrollWidth }))
    await expect(next).toBeDisabled()
  })
})
