"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

interface ContactFormDict {
  formName: string
  formPhone: string
  formEmail: string
  formMessage: string
  formPrivacy: string
  formConsent: string
  privacyLabel: string
  formError: string
  formSubmit: string
  formSubmitting: string
  formSuccess: string
  formSuccessMsg: string
}

export function ContactForm({
  dict,
  lang,
  defaultMessage = "",
}: {
  dict: ContactFormDict
  lang: string
  defaultMessage?: string
}) {
  const [formData, setFormData] = useState({ nome: "", email: "", telefono: "", messaggio: defaultMessage })
  const [consent, setConsent] = useState(false)
  const [website, setWebsite] = useState("") // trappola per i bot: resta vuoto per le persone
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const openedAt = useRef(Date.now())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(false)
    try {
      const res = await fetch("/api/contatti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, consent, website, lang, elapsed: Date.now() - openedAt.current }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setIsSubmitted(true)
    } catch {
      setError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div role="status" className="p-8 bg-green-50 border border-green-200 rounded-sm text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Send className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">{dict.formSuccess}</h3>
        <p className="text-green-800">{dict.formSuccessMsg}</p>
      </div>
    )
  }

  const [consentBefore, consentAfter = ""] = dict.formConsent.split("{privacy}")

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-foreground mb-2">{dict.formName}</label>
          <Input
            id="nome"
            type="text"
            required
            autoComplete="name"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            className="bg-card border-border focus:border-accent"
            placeholder="Mario Rossi"
          />
        </div>
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-2">{dict.formPhone}</label>
          <Input
            id="telefono"
            type="tel"
            required
            autoComplete="tel"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            className="bg-card border-border focus:border-accent"
            placeholder="+39 333 000 0000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">{dict.formEmail}</label>
        <Input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-card border-border focus:border-accent"
          placeholder="mario@email.com"
        />
      </div>

      <div>
        <label htmlFor="messaggio" className="block text-sm font-medium text-foreground mb-2">{dict.formMessage}</label>
        <Textarea
          id="messaggio"
          required
          rows={5}
          value={formData.messaggio}
          onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
          className="bg-card border-border focus:border-accent"
          placeholder="Salve, sono interessato a..."
        />
      </div>

      {/* Trappola antispam: invisibile e fuori dalla tastiera */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[#0A0A0A]"
        />
        <span>
          {consentBefore}
          <Link href={`/${lang}/privacy`} target="_blank" className="text-foreground underline underline-offset-4">
            {dict.privacyLabel}
          </Link>
          {consentAfter}
        </span>
      </label>

      <p className="text-xs text-muted-foreground">{dict.formPrivacy}</p>

      {error && (
        <p role="alert" className="text-sm text-red-700">{dict.formError}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6"
      >
        {isSubmitting ? (
          dict.formSubmitting
        ) : (
          <>
            {dict.formSubmit}
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
