import { isAuthenticated } from "@/lib/admin-auth"
import { getGithubConfig, readTextFile } from "@/lib/github"
import { Button } from "@/components/ui/Button"
import type { Venduta } from "@/data/vendute"
import { logout, removeVenduta } from "./actions"
import { AddForm, LoginForm } from "./forms"

export const dynamic = "force-dynamic"

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

export default async function GestionePage() {
  const missing = [
    !process.env.ADMIN_PASSWORD && "ADMIN_PASSWORD",
    !process.env.GITHUB_TOKEN && "GITHUB_TOKEN",
  ].filter(Boolean)

  const shell = (children: React.ReactNode) => (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl">{children}</div>
    </main>
  )

  if (missing.length) {
    return shell(
      <>
        <h1 className="font-serif text-3xl text-foreground">Configurazione incompleta</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Mancano queste variabili d&apos;ambiente su Vercel: <strong>{missing.join(", ")}</strong>.
        </p>
      </>,
    )
  }

  if (!(await isAuthenticated())) {
    return shell(
      <div className="max-w-sm">
        <h1 className="font-serif text-3xl text-foreground">Area riservata</h1>
        <p className="mt-2 mb-8 text-sm text-muted-foreground">Gestione delle auto consegnate.</p>
        <LoginForm />
      </div>,
    )
  }

  const { entries, error } = await loadEntries()
  const sorted = [...entries].sort((a, b) => b.soldAt.localeCompare(a.soldAt))

  return shell(
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Auto consegnate</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Aggiungi un&apos;auto: compare sul sito entro un minuto circa.
          </p>
        </div>
        <form action={logout}>
          <Button type="submit" variant="ghost" size="sm">Esci</Button>
        </form>
      </div>

      <section className="mt-10 border border-border bg-card p-6">
        <h2 className="text-xs uppercase tracking-[0.12em] text-muted-foreground mb-5">Nuova auto</h2>
        <AddForm />
      </section>

      <section className="mt-12">
        <h2 className="text-xs uppercase tracking-[0.12em] text-muted-foreground mb-4">
          Già inserite ({sorted.length})
        </h2>
        {error && <p className="text-sm text-red-700">{error}</p>}
        {!error && sorted.length === 0 && (
          <p className="text-sm text-muted-foreground">Nessuna auto ancora: il sito mostra solo gli esempi.</p>
        )}
        <ul className="divide-y divide-border border-y border-border">
          {sorted.map((e) => (
            <li key={e.image} className="flex items-center justify-between gap-4 py-3 text-sm">
              <div>
                <span className="text-foreground">{e.make} {e.model}</span>
                <span className="text-muted-foreground"> · {e.year} · {e.km.toLocaleString("it-IT")} km · {e.soldAt}</span>
              </div>
              <form action={removeVenduta}>
                <input type="hidden" name="image" value={e.image} />
                <Button type="submit" variant="ghost" size="sm" className="text-red-700 hover:text-red-800">
                  Elimina
                </Button>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </>,
  )
}
