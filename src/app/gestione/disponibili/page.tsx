import Link from "next/link"
import { getGithubConfig, readTextFile } from "@/lib/github"
import { Button } from "@/components/ui/Button"
import type { Vettura } from "@/data/vetture"
import { markSold, moveVettura, removeVettura } from "../actions"
import { OrderControls } from "../order-controls"
import { AdminFrame, adminGate } from "../shared"
import { VetturaForm } from "../vettura-form"
import { ConfirmButton } from "../widgets"

export const dynamic = "force-dynamic"
export const maxDuration = 60

async function loadEntries(): Promise<{ entries: Vettura[]; error?: string }> {
  const cfg = getGithubConfig()
  if (!cfg) return { entries: [], error: "GITHUB_TOKEN non configurato" }
  try {
    const raw = await readTextFile(cfg, "src/data/vetture.json")
    return { entries: raw ? (JSON.parse(raw) as Vettura[]) : [] }
  } catch {
    return { entries: [], error: "Impossibile leggere l'elenco da GitHub" }
  }
}

export default async function GestioneDisponibiliPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>
}) {
  const gate = await adminGate()
  if (gate) return gate

  const { edit } = await searchParams
  const { entries, error } = await loadEntries()
  const editing = edit ? entries.find((e) => e.id === edit) : undefined
  const eur = new Intl.NumberFormat("it-IT")
  const thisMonth = new Date().toISOString().slice(0, 7)

  return (
    <AdminFrame
      active="disponibili"
      title="Auto disponibili"
      intro="Le auto in vendita, con foto e descrizione. L'ordine qui sotto è quello del sito: le nuove si aggiungono in cima."
    >
      <section className="mt-10 border border-border bg-card p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
            {editing ? `Modifica: ${editing.make} ${editing.model}` : "Nuova auto"}
          </h2>
          {editing && (
            <Button asChild variant="ghost" size="sm">
              <Link href="/gestione/disponibili">Annulla</Link>
            </Button>
          )}
        </div>
        {edit && !editing && !error && (
          <p className="mb-4 text-sm text-red-700">Auto non trovata.</p>
        )}
        <VetturaForm key={editing?.id ?? "new"} initial={editing} />
      </section>

      <section className="mt-12">
        <h2 className="text-xs uppercase tracking-[0.12em] text-muted-foreground mb-4">
          Già inserite ({entries.length})
        </h2>
        {error && <p className="text-sm text-red-700">{error}</p>}
        {!error && entries.length === 0 && (
          <p className="text-sm text-muted-foreground">Nessuna auto ancora.</p>
        )}
        <ul className="divide-y divide-border border-y border-border">
          {entries.map((e, i) => (
            <li key={e.id} className="flex items-center justify-between gap-4 py-3 text-sm">
              <div className="flex min-w-0 items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={e.images[0]} alt="" loading="lazy" className="h-12 w-16 shrink-0 object-cover bg-secondary" />
                <div className="min-w-0">
                  <div className="truncate text-foreground">{e.make} {e.model}</div>
                  <div className="truncate text-muted-foreground">
                    {e.year} · {eur.format(e.km)} km · € {eur.format(e.price)} · {e.images.length} foto
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <OrderControls action={moveVettura} name="id" value={e.id} index={i} total={entries.length} />
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/gestione/disponibili?edit=${encodeURIComponent(e.id)}#top`}>Modifica</Link>
                </Button>
                <details className="relative">
                  <summary className="inline-flex h-8 cursor-pointer list-none items-center rounded-md px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                    Consegnata
                  </summary>
                  <form
                    action={markSold}
                    className="absolute right-0 top-full z-10 mt-1 w-64 space-y-3 border border-border bg-card p-4 shadow-md"
                  >
                    <input type="hidden" name="id" value={e.id} />
                    <p className="text-xs text-muted-foreground">
                      Sposta l&apos;auto tra le consegnate. Resta solo la foto di copertina.
                    </p>
                    <label className="block text-xs uppercase tracking-[0.1em] text-muted-foreground">
                      Mese di consegna
                      <input
                        type="month"
                        name="soldAt"
                        required
                        defaultValue={thisMonth}
                        className="mt-1.5 w-full border border-border bg-background px-3 py-2 text-sm normal-case tracking-normal text-foreground"
                      />
                    </label>
                    <Button type="submit" size="sm" className="w-full">Sposta tra le consegnate</Button>
                  </form>
                </details>
                <form action={removeVettura}>
                  <input type="hidden" name="id" value={e.id} />
                  <ConfirmButton message={`Eliminare ${e.make} ${e.model} e tutte le sue foto?`}>Elimina</ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </AdminFrame>
  )
}
