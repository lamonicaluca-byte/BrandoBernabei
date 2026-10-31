import { expect, test, type Page } from "@playwright/test"

const GHOST = "/it/vetture/rolls-royce-ghost-ii-6-7-v12-black-badge-iva-esposta-2026"
const MACAN = "/it/vetture/porsche-macan-t-265cv-ufficiale-italiana-2023"

const region = (page: Page) => page.getByRole("region", { name: "Galleria fotografica" })
const chip = (page: Page, name: RegExp) =>
  page.getByRole("navigation", { name: "Capitoli della galleria" }).first().getByRole("button", { name })

test.describe("galleria della scheda (mobile)", () => {
  test("chip dei capitoli con conteggio e salto al primo scatto", async ({ page }) => {
    await page.goto(GHOST)
    await expect(chip(page, /^Esterni 6$/)).toBeVisible()
    await expect(chip(page, /^Interni 5$/)).toBeVisible()
    await expect(chip(page, /^Dettagli 2$/)).toBeVisible()
    await expect(page.getByText("Esterni 1/6")).toBeVisible()

    await chip(page, /^Interni/).click()
    await expect(page.getByText("Interni 1/5")).toBeVisible()
    await expect(chip(page, /^Interni/)).toHaveAttribute("aria-pressed", "true")
    await expect(chip(page, /^Esterni/)).toHaveAttribute("aria-pressed", "false")

    await chip(page, /^Dettagli/).click()
    await expect(page.getByText("Dettagli 1/2")).toBeVisible()
  })

  test("la pagina non ha scorrimento orizzontale (né con la galleria né con la griglia aperta)", async ({ page }) => {
    for (const url of [GHOST, MACAN]) {
      await page.goto(url, { waitUntil: "networkidle" })
      const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(await overflow()).toBeLessThanOrEqual(0)
      expect(await page.evaluate(() => window.innerWidth)).toBe(375)
    }
    await page.getByRole("button", { name: /Tutte le foto/ }).click()
    const close = page.getByRole("dialog").getByRole("button", { name: "Chiudi" })
    const box = (await close.boundingBox())!
    expect(box.x + box.width).toBeLessThanOrEqual(375) // il pulsante Chiudi resta dentro lo schermo
  })

  test("carosello con scroll-snap nativo e controllo da tastiera", async ({ page }) => {
    await page.goto(GHOST)
    const track = region(page)
    await expect(track).toHaveAttribute("aria-roledescription", "carousel")
    expect(await track.evaluate((el) => getComputedStyle(el).scrollSnapType)).toContain("x mandatory")
    await track.focus()
    await page.keyboard.press("ArrowRight")
    await expect(page.getByText("Esterni 2/6")).toBeVisible()
    await page.keyboard.press("ArrowLeft")
    await expect(page.getByText("Esterni 1/6")).toBeVisible()
  })

  test("l'ultima slide è la card d'azione con prenotazione e video su WhatsApp", async ({ page }) => {
    await page.goto(GHOST)
    await region(page).evaluate((el) => el.scrollTo({ left: el.scrollWidth }))
    const card = page.getByRole("group", { name: "Vuoi vederla dal vivo o in video?" })
    await expect(card.getByRole("link", { name: "Prenota una visita" })).toHaveAttribute("href", /\/it\/contatti\?visita=1&auto=rolls-royce/)
    const video = card.getByRole("link", { name: "Video walkaround su WhatsApp" })
    const href = (await video.getAttribute("href")) ?? ""
    expect(href).toContain("https://wa.me/393395027983?text=")
    expect(decodeURIComponent(href)).toContain("Rolls-Royce Ghost 2026")
  })

  test("tutte le foto: si apre, raggruppa per capitolo e il tasto indietro chiude senza uscire dalla pagina", async ({ page }) => {
    await page.goto(GHOST)
    await page.getByRole("button", { name: "Tutte le foto (13)" }).click()
    const dialog = page.getByRole("dialog", { name: "Tutte le foto" })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole("heading", { name: /Esterni/ })).toBeVisible()
    await expect(dialog.getByRole("heading", { name: /Interni/ })).toBeVisible()
    await expect(dialog.getByRole("heading", { name: /Dettagli/ })).toBeVisible()
    expect(page.url()).toContain("#foto")

    await page.goBack()
    await expect(dialog).toBeHidden()
    expect(new URL(page.url()).pathname).toBe(GHOST) // siamo ancora sulla scheda
  })

  test("Esc chiude la griglia e il focus torna al pulsante che l'ha aperta", async ({ page }) => {
    await page.goto(GHOST)
    const opener = page.getByRole("button", { name: "Tutte le foto (13)" })
    await opener.click()
    const dialog = page.getByRole("dialog", { name: "Tutte le foto" })
    await expect(dialog).toBeVisible()
    await page.keyboard.press("Escape")
    await expect(dialog).toBeHidden()
    await expect(opener).toBeFocused()
  })

  test("lightbox: messaggio WhatsApp sulla foto e tasto indietro a livelli", async ({ page }) => {
    await page.goto(GHOST)
    await page.getByRole("button", { name: "Tutte le foto (13)" }).click()
    const dialog = page.getByRole("dialog", { name: "Tutte le foto" })
    await dialog.getByRole("button", { name: /Interni, Plancia e volante/ }).click()

    const pswp = page.locator(".pswp")
    await expect(pswp).toBeVisible()
    const ask = pswp.getByRole("link", { name: "Chiedi info su questa foto" })
    await expect(ask).toBeVisible()
    const text = new URL((await ask.getAttribute("href"))!).searchParams.get("text")
    expect(text).toBe("Buongiorno, mi interessa la Rolls-Royce Ghost 2026. Ho una domanda sulla foto Interni 2.")

    await page.goBack() // chiude solo il lightbox
    await expect(pswp).toBeHidden()
    await expect(dialog).toBeVisible()
    await page.goBack() // poi la griglia
    await expect(dialog).toBeHidden()
    expect(new URL(page.url()).pathname).toBe(GHOST)
  })

  test("lightbox: un trascinamento verso il basso lo chiude", async ({ page }) => {
    await page.goto(GHOST)
    await page.getByRole("button", { name: "Tutte le foto (13)" }).click()
    await page.getByRole("dialog", { name: "Tutte le foto" }).getByRole("button", { name: /Esterni, Frontale/ }).click()
    const pswp = page.locator(".pswp")
    await expect(pswp).toBeVisible()
    await page.waitForTimeout(500) // fine dell'animazione di apertura
    await page.mouse.move(187, 300)
    await page.mouse.down()
    await page.mouse.move(187, 420, { steps: 6 })
    await page.mouse.move(187, 640, { steps: 10 })
    await page.mouse.up()
    await expect(pswp).toBeHidden()
  })

  test("auto senza 'gallery': un solo capitolo, nessun chip, tutto funziona come prima", async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", (e) => errors.push(e.message))
    await page.goto(MACAN)
    await expect(page.getByRole("navigation", { name: "Capitoli della galleria" })).toHaveCount(0)
    await expect(page.getByText("Foto 1/15")).toBeVisible()
    await page.getByRole("button", { name: "Tutte le foto (15)" }).click()
    await expect(page.getByRole("dialog", { name: "Tutte le foto" })).toBeVisible()
    expect(errors).toEqual([])
  })

  test("alt text sempre compilato", async ({ page }) => {
    await page.goto(GHOST)
    const alts = await region(page).locator("img").evaluateAll((imgs) => imgs.map((i) => (i as HTMLImageElement).alt))
    expect(alts.length).toBeGreaterThan(0)
    expect(alts.every((a) => a.length > 10)).toBe(true)
    expect(alts[0]).toBe("Rolls-Royce Ghost II 6.7 V12 Black Badge IVA Esposta 2026, Esterni, 3/4 anteriore")
  })

  test("su telefono non arrivano mai immagini a 3840 px e si caricano solo le slide vicine", async ({ page }) => {
    const widths: number[] = []
    page.on("request", (r) => {
      const m = r.url().match(/_next\/image\?.*[?&]w=(\d+)/)
      if (m) widths.push(Number(m[1]))
    })
    await page.goto(GHOST, { waitUntil: "networkidle" })
    expect(widths.length).toBeGreaterThan(0)
    expect(Math.max(...widths)).toBeLessThanOrEqual(1200)
    const loaded = await region(page).locator("img").count()
    expect(loaded).toBeLessThanOrEqual(3) // prima foto e vicine, non tutte e 13
  })
})

test.describe("altre lingue", () => {
  test("inglese: capitoli e pulsanti tradotti", async ({ page }) => {
    await page.goto("/en/vetture/rolls-royce-ghost-ii-6-7-v12-black-badge-iva-esposta-2026")
    await expect(page.getByRole("region", { name: "Photo gallery" })).toBeVisible()
    await expect(page.getByRole("navigation", { name: "Gallery chapters" }).first().getByRole("button", { name: /^Exterior 6$/ })).toBeVisible()
    await expect(page.getByRole("button", { name: "All photos (13)" })).toBeVisible()
  })

  test("francese: capitoli e pulsanti tradotti", async ({ page }) => {
    await page.goto("/fr/vetture/rolls-royce-ghost-ii-6-7-v12-black-badge-iva-esposta-2026")
    await expect(page.getByRole("navigation", { name: "Chapitres de la galerie" }).first().getByRole("button", { name: /^Extérieur 6$/ })).toBeVisible()
    await expect(page.getByRole("button", { name: "Toutes les photos (13)" })).toBeVisible()
  })
})

test.describe("desktop", () => {
  test.use({ viewport: { width: 1280, height: 900 }, isMobile: false, hasTouch: false, deviceScaleFactor: 1 })

  test("una foto grande con miniature cliccabili e frecce", async ({ page }) => {
    await page.goto(GHOST)
    await expect(page.getByRole("button", { name: "Foto successiva" })).toBeVisible()
    await page.getByRole("button", { name: "Foto successiva" }).click()
    await expect(page.getByText("Esterni 2/6")).toBeVisible()
    await page.getByRole("button", { name: "Foto precedente" }).click()
    await expect(page.getByText("Esterni 1/6")).toBeVisible()
  })
})

test.describe("Android (360 px)", () => {
  test.use({ viewport: { width: 360, height: 800 }, deviceScaleFactor: 3 })

  test("nessuno scorrimento orizzontale, Chiudi raggiungibile e chip funzionanti", async ({ page }) => {
    await page.goto(GHOST, { waitUntil: "networkidle" })
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0)
    await chip(page, /^Interni/).click()
    await expect(page.getByText("Interni 1/5")).toBeVisible()
    await page.getByRole("button", { name: "Tutte le foto (13)" }).click()
    const close = page.getByRole("dialog").getByRole("button", { name: "Chiudi" })
    const box = (await close.boundingBox())!
    expect(box.x + box.width).toBeLessThanOrEqual(360)
    expect(box.width).toBeGreaterThanOrEqual(44)
    expect(box.height).toBeGreaterThanOrEqual(44)
    await close.click()
    await expect(page.getByRole("dialog", { name: "Tutte le foto" })).toBeHidden()
  })
})
