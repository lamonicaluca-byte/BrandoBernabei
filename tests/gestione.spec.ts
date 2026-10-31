import { expect, test } from "@playwright/test"

test.describe("area riservata: percorsi", () => {
  test("aprire /gestione porta alle auto disponibili", async ({ page }) => {
    await page.goto("/gestione")
    await expect(page).toHaveURL(/\/gestione\/disponibili$/)
  })

  test("le consegnate stanno in /gestione/consegnate e le pagine non si indicizzano", async ({ page }) => {
    const res = await page.goto("/gestione/consegnate")
    expect(res?.status()).toBe(200)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/)
    // senza accesso non compare nessun dato: o il login o l'avviso di configurazione
    await expect(page.getByText(/Area riservata|Configurazione incompleta/)).toBeVisible()
    await expect(page.getByText("Auto consegnate")).toHaveCount(0)
  })
})
