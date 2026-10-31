import { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { privacy } from "@/data/legal"
import { getDictionary, buildMetadata } from "../../i18n"
import type { Locale } from "../layout"

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  return buildMetadata({ title: privacy[lang].title, description: privacy[lang].intro, path: "/privacy", lang })
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  return <LegalPage doc={privacy[lang]} lang={lang} dict={await getDictionary(lang)} />
}
