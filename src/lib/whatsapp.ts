// Un solo punto per numero e link WhatsApp del sito.

export const WHATSAPP_NUMBER = "393395027983"
export const PHONE_TEL = "tel:+393395027983"

/** Link WhatsApp, con messaggio precompilato se fornito. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** Sostituisce i segnaposto {nome} di un testo tradotto. */
export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match))
}
