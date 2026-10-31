import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { LegalDoc } from "@/data/legal"
import type { getDictionary } from "@/app/i18n"

type Dict = Awaited<ReturnType<typeof getDictionary>>

export function LegalPage({ doc, lang, dict }: { doc: LegalDoc; lang: string; dict: Dict }) {
  return (
    <>
      <Header lang={lang} dict={dict} />
      <main className="pt-16 bg-background">
        <article className="py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-foreground tracking-tight">{doc.title}</h1>
            <p className="mt-3 text-xs text-muted-foreground">{doc.updated}</p>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">{doc.intro}</p>

            {doc.sections.map((s) => (
              <section key={s.heading} className="mt-12">
                <h2 className="font-serif text-2xl font-light text-foreground">{s.heading}</h2>
                {s.items && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/80 leading-relaxed">
                    {s.items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                )}
                {s.paragraphs?.map((p) => (
                  <p key={p} className="mt-4 text-foreground/80 leading-relaxed">{p}</p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  )
}
