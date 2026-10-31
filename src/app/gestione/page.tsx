import { getGithubConfig, readTextFile } from "@/lib/github"
import type { Venduta } from "@/data/vendute"
import { moveVenduta, removeVenduta } from "./actions"
import { AddForm } from "./forms"
import { OrderControls } from "./order-controls"
import { AdminFrame, adminGate } from "./shared"
import { ConfirmButton } from "./widgets"

export const dynamic = "force-dynamic"
export const maxDuration = 60

async function loadEntries(): Promise<{ entries: Venduta[]; error?: string }> {
  const cfg = getGithubConfig()
  if (!cfg) return { entries: [], error: "GITHUB_TOKEN non configurato" }
  try {
    const raw = await readTextFile(cfg, "src/data/vendute.json")
    return { entries: raw ? (JSON.parse(raw) as Venduta[]) : [] }
  } catch {
    return { entries: [], error: "Impossibile leggere l'elenco da GitHub" }
  }
}

export default async function GestioneConsegnatePage() {
  const gate = await adminGate()
  if (gate) return gate

  const { entries, error } = await loadEntries()

  return (
    <AdminFrame
      active="consegnate"
      title="Auto consegnate"
      intro="Aggiungi un'auto: compare sul sito entro un minuto circa. L'ordine qui sotto è quello del sito."
    >
      <section className="mt-10 border border-border bg-card p-6">
        <h2 className="text-xs uppercase tracking-[0.12em] text-muted-foreground mb-5">Nuova auto</h2>
        <AddForm />
      </section>

      <section className="mt-12">
        <h2 className="text-xs uppercase tracking-[0.12em] text-muted-foreground mb-4">
          Già inserite ({entries.length})
        </h2>
        {error && <p className="text-sm text-red-700">{error}</p>}
        {!error && entries.length === 0 && (
          <p className="text-sm text-muted-foreground">Nessuna auto ancora: il sito mostra solo gli esempi.</p>
        )}
        <ul className="divide-y divide-border border-y border-border">
          {entries.map((e, i) => (
            <li key={e.image} className="flex items-center justify-between gap-4 py-3 text-sm">
              <div className="min-w-0">
                <span className="text-foreground">{e.make} {e.model}</span>
                <span className="text-muted-foreground"> · {e.year} · {e.km.toLocaleString("it-IT")} km · {e.soldAt}</span>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <OrderControls action={moveVenduta} name="image" value={e.image} index={i} total={entries.length} />
                <form action={removeVenduta}>
                  <input type="hidden" name="image" value={e.image} />
                  <ConfirmButton message={`Eliminare ${e.make} ${e.model} dalle consegnate?`}>Elimina</ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </AdminFrame>
  )
}
