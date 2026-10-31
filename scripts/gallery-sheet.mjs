// Foglio numerato con tutte le foto di un'auto, per classificarle in pochi secondi.
//
// Uso:    node scripts/gallery-sheet.mjs <id-auto>        (basta una parte dell'id, es. "macan")
// Elenco: node scripts/gallery-sheet.mjs                  (mostra le auto e quante foto hanno già classificato)
// Esito:  .gallery-sheets/<id>.jpg  (aprilo e guarda i numeri), poi usa scripts/tag-gallery.mjs

import { mkdir, readFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const root = process.cwd()
const cars = JSON.parse(await readFile(path.join(root, "src/data/vetture.json"), "utf8"))
const query = process.argv[2]

if (!query) {
  for (const c of cars) console.log(`${c.id}  ${c.images.length} foto  ${c.gallery ? "classificata" : "da classificare"}`)
  process.exit(0)
}

const matches = cars.filter((c) => c.id.includes(query))
if (matches.length !== 1) {
  console.error(matches.length === 0 ? `Nessuna auto con "${query}".` : `Più auto corrispondono: ${matches.map((m) => m.id).join(", ")}`)
  process.exit(1)
}
const car = matches[0]

const W = 360
const H = 270
const COLS = 4
const rows = Math.ceil(car.images.length / COLS)
const tiles = await Promise.all(
  car.images.map(async (src, i) => {
    const photo = await sharp(path.join(root, "public", src)).resize(W, H, { fit: "cover" }).toBuffer()
    const label = Buffer.from(
      `<svg width="${W}" height="${H}"><rect x="0" y="0" width="64" height="40" fill="black"/><text x="10" y="28" font-family="Arial" font-size="24" fill="white">${i + 1}</text></svg>`,
    )
    return {
      input: await sharp(photo).composite([{ input: label }]).toBuffer(),
      left: (i % COLS) * W,
      top: Math.floor(i / COLS) * H,
    }
  }),
)

await mkdir(path.join(root, ".gallery-sheets"), { recursive: true })
const out = path.join(root, ".gallery-sheets", `${car.id}.jpg`)
await sharp({ create: { width: W * COLS, height: H * rows, channels: 3, background: "#ffffff" } })
  .composite(tiles)
  .jpeg({ quality: 85 })
  .toFile(out)

console.log(`${car.id}: ${car.images.length} foto`)
console.log(`Foglio: ${out}`)
console.log(`Poi, per esempio:\n  node scripts/tag-gallery.mjs ${query} "1-6:esterni,7-11:interni,12-${car.images.length}:dettagli"`)
