import { defineConfig } from "@playwright/test"

// I test girano su una build di produzione locale (npm run build && npm test) con il Chrome già installato.
export default defineConfig({
  testDir: "tests",
  timeout: 45_000,
  fullyParallel: true,
  workers: 4,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3200",
    channel: "chrome",
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  },
  webServer: {
    command: "npx next start -p 3200",
    url: "http://localhost:3200/it",
    reuseExistingServer: true,
    timeout: 60_000,
  },
})
