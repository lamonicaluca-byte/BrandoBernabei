import { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { cookies } from "@/data/legal"
import { getDictionary, buildMetadata } from "../../i18n"
import type { Locale } from "../layout"

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  return buildMetadata({ title: cookies[lang].title, description: cookies[lang].intro, path: "/cookie", lang })
}

export default async function CookiePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  return <LegalPage doc={cookies[lang]} lang={lang} dict={await getDictionary(lang)} />
}
