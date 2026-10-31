"use client"

import { Button } from "@/components/ui/Button"

/** Pulsante di invio che chiede conferma prima di procedere (per le eliminazioni). */
export function ConfirmButton({ children, message }: { children: React.ReactNode; message: string }) {
  return (
    <Button
      type="submit"
      variant="ghost"
      size="sm"
      className="text-red-700 hover:text-red-800"
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault()
      }}
    >
      {children}
    </Button>
  )
}
