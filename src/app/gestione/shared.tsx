import Link from "next/link"
import { isAuthenticated } from "@/lib/admin-auth"
import { Button } from "@/components/ui/Button"
import { logout } from "./actions"
import { LoginForm } from "./forms"

const Shell = ({ children }: { children: React.ReactNode }) => (
  <main className="min-h-screen px-6 py-16">
    <div className="mx-auto max-w-3xl">{children}</div>
  </main>
)

/** Restituisce la schermata da mostrare se l'accesso non è possibile, altrimenti null. */
export async function adminGate(): Promise<React.ReactNode | null> {
  const missing = [
    !process.env.ADMIN_PASSWORD && "ADMIN_PASSWORD",
    !process.env.GITHUB_TOKEN && "GITHUB_TOKEN",
  ].filter(Boolean)

  if (missing.length) {
    return (
      <Shell>
        <h1 className="font-serif text-3xl text-foreground">Configurazione incompleta</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Mancano queste variabili d&apos;ambiente su Vercel: <strong>{missing.join(", ")}</strong>.
        </p>
      </Shell>
    )
  }

  if (!(await isAuthenticated())) {
    return (
      <Shell>
        <div className="max-w-sm">
          <h1 className="font-serif text-3xl text-foreground">Area riservata</h1>
          <p className="mt-2 mb-8 text-sm text-muted-foreground">Gestione delle auto del sito.</p>
          <LoginForm />
        </div>
      </Shell>
    )
  }
  return null
}

const TABS = [
  { key: "disponibili", href: "/gestione/disponibili", label: "Disponibili" },
  { key: "consegnate", href: "/gestione/consegnate", label: "Consegnate" },
] as const

export function AdminFrame({
  active,
  title,
  intro,
  children,
}: {
  active: (typeof TABS)[number]["key"]
  title: string
  intro: string
  children: React.ReactNode
}) {
  return (
    <Shell>
      <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
        <nav className="flex gap-6 text-sm">
          {TABS.map((t) => (
            <Link
              key={t.key}
              href={t.href}
              aria-current={t.key === active ? "page" : undefined}
              className={`pb-1 border-b ${t.key === active ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {t.label}
            </Link>
          ))}
        </nav>
        <form action={logout}>
          <Button type="submit" variant="ghost" size="sm">Esci</Button>
        </form>
      </div>
      <h1 className="mt-8 font-serif text-3xl text-foreground">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{intro}</p>
      {children}
    </Shell>
  )
}
