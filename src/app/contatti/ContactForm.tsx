"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    messaggio: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="p-8 bg-green-50 border border-green-200 rounded-sm text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Send className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">Messaggio inviato!</h3>
        <p className="text-green-700">
          Grazie per avermi contattato. Ti risponderò il prima possibile.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-foreground mb-2">
            Nome e Cognome *
          </label>
          <Input
            id="nome"
            type="text"
            required
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            className="bg-card border-border focus:border-accent"
            placeholder="Mario Rossi"
          />
        </div>
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-2">
            Telefono *
          </label>
          <Input
            id="telefono"
            type="tel"
            required
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            className="bg-card border-border focus:border-accent"
            placeholder="+39 333 000 0000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email *
        </label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-card border-border focus:border-accent"
          placeholder="mario@email.com"
        />
      </div>

      <div>
        <label htmlFor="messaggio" className="block text-sm font-medium text-foreground mb-2">
          Messaggio *
        </label>
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

      <p className="text-xs text-muted-foreground">
        * Campi obbligatori. I tuoi dati saranno trattati nel rispetto della privacy.
      </p>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6"
      >
        {isSubmitting ? (
          "Invio in corso..."
        ) : (
          <>
            Invia messaggio
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
