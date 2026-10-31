// Assegna le foto di un'auto ai capitoli della galleria, per intervalli.
//
// Uso:    node scripts/tag-gallery.mjs <id-auto> "1-6:esterni,7-11:interni,12-13:dettagli"
// Numeri: posizione della foto nel foglio di scripts/gallery-sheet.mjs (partono da 1).
// Capitoli ammessi: esterni, interni, dettagli, documenti. Un numero singolo va bene ("9:documenti").
// Le foto non nominate finiscono nel capitolo "altre foto". Per togliere la classificazione: usa "-" al posto dei capitoli.
//
// Le didascalie sono facoltative e si aggiungono a mano in src/data/vetture.json:
//   { "file": "01.webp", "chapter": "esterni", "caption": { "it": "3/4 anteriore", "en": "Front three-quarter", "fr": "Trois quarts avant" } }

import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const CHAPTERS = ["esterni", "interni", "dettagli", "documenti"]
const [query, spec] = process.argv.slice(2)
if (!query || !spec) {
  console.error('Uso: node scripts/tag-gallery.mjs <id-auto> "1-6:esterni,7-11:interni,12-13:dettagli"')
  process.exit(1)
}

const file = path.join(process.cwd(), "src/data/vetture.json")
const cars = JSON.parse(await readFile(file, "utf8"))
const matches = cars.filter((c) => c.id.includes(query))
if (matches.length !== 1) {
  console.error(matches.length === 0 ? `Nessuna auto con "${query}".` : `Più auto corrispondono: ${matches.map((m) => m.id).join(", ")}`)
  process.exit(1)
}
const car = matches[0]

if (spec.trim() === "-") {
  delete car.gallery
  await writeFile(file, JSON.stringify(cars, null, 2) + "\n")
  console.log(`${car.id}: classificazione rimossa`)
  process.exit(0)
}

const chapterOf = new Map()
for (const part of spec.split(",")) {
  const m = part.trim().match(/^(\d+)(?:-(\d+))?:(\w+)$/)
  if (!m) fail(`Non capisco "${part.trim()}". Formato: 1-6:esterni`)
  const [from, to, chapter] = [Number(m[1]), Number(m[2] ?? m[1]), m[3]]
  if (!CHAPTERS.includes(chapter)) fail(`Capitolo "${chapter}" non valido. Ammessi: ${CHAPTERS.join(", ")}`)
  if (from < 1 || to > car.images.length || from > to) fail(`Intervallo ${from}-${to} fuori dalle ${car.images.length} foto`)
  for (let n = from; n <= to; n++) {
    if (chapterOf.has(n)) fail(`La foto ${n} è assegnata due volte`)
    chapterOf.set(n, chapter)
  }
}

// le didascalie già scritte non si perdono
const previous = new Map((car.gallery ?? []).map((g) => [g.file, g.caption]))
car.gallery = car.images.flatMap((src, i) => {
  const chapter = chapterOf.get(i + 1)
  if (!chapter) return []
  const name = src.split("/").pop()
  const entry = { file: name, chapter }
  if (previous.get(name)) entry.caption = previous.get(name)
  return [entry]
})

await writeFile(file, JSON.stringify(cars, null, 2) + "\n")
const counts = CHAPTERS.map((c) => `${c} ${car.gallery.filter((g) => g.chapter === c).length}`).join(" · ")
console.log(`${car.id}: ${counts} · altre foto ${car.images.length - car.gallery.length}`)

function fail(message) {
  console.error(message)
  process.exit(1)
}
