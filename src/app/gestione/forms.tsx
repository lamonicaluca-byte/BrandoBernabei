"use client"

import { startTransition, useActionState, useState } from "react"
import { Button } from "@/components/ui/Button"
import { addVenduta, login, type ActionState } from "./actions"

const inputClass =
  "w-full border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-foreground/60"
const labelClass = "block text-xs uppercase tracking-[0.12em] text-muted-foreground mb-1.5"

/** Ridimensiona la foto nel browser: i telefoni producono file da 5-10 MB, oltre il limite del server. */
async function shrink(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" })
  const scale = Math.min(1, 1800 / bitmap.width)
  const canvas = document.createElement("canvas")
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.85))
  if (!blob) throw new Error("conversione non riuscita")
  return new File([blob], "foto.jpg", { type: "image/jpeg" })
}

export function LoginForm() {
  const [state, action, pending] = useActionState<ActionState | null, FormData>(login, null)
  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="password" className={labelClass}>Password</label>
        <input id="password" name="password" type="password" required autoFocus autoComplete="current-password" className={inputClass} />
      </div>
      {state && !state.ok && <p role="alert" className="text-sm text-red-700">{state.message}</p>}
      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Accesso…" : "Entra"}
      </Button>
    </form>
  )
}

export function AddForm() {
  const [state, action, pending] = useActionState<ActionState | null, FormData>(addVenduta, null)
  const [preparing, setPreparing] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const [fileName, setFileName] = useState("")
  const busy = pending || preparing

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const photo = fd.get("photo")
    setLocalError(null)
    if (photo instanceof File && photo.size > 0) {
      setPreparing(true)
      try {
        fd.set("photo", await shrink(photo))
      } catch {
        setLocalError("Non riesco a leggere la foto: prova con un JPG o PNG.")
        setPreparing(false)
        return
      }
      setPreparing(false)
    }
    startTransition(() => {
      action(fd)
    })
  }

  // quando il salvataggio riesce, svuota il modulo
  const formKey = state?.ok ? state.nonce : "form"

  return (
    <form key={formKey} onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="make" className={labelClass}>Marca</label>
          <input id="make" name="make" required maxLength={40} placeholder="Porsche" className={inputClass} />
        </div>
        <div>
          <label htmlFor="model" className={labelClass}>Modello</label>
          <input id="model" name="model" required maxLength={60} placeholder="911 Carrera S" className={inputClass} />
        </div>
        <div>
          <label htmlFor="year" className={labelClass}>Anno</label>
          <input id="year" name="year" type="number" inputMode="numeric" required min={1960} max={new Date().getFullYear() + 1} placeholder="2021" className={inputClass} />
        </div>
        <div>
          <label htmlFor="km" className={labelClass}>Chilometri</label>
          <input id="km" name="km" type="number" inputMode="numeric" required min={0} max={999999} placeholder="18000" className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="soldAt" className={labelClass}>Mese di consegna</label>
          <input id="soldAt" name="soldAt" type="month" required className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="photo" className={labelClass}>Foto</label>
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/*"
          required
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          className={`${inputClass} file:mr-4 file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:text-primary-foreground`}
        />
        <p className="mt-1.5 text-xs text-muted-foreground">
          {fileName || "Meglio orizzontale. Nessuna targa o persona riconoscibile."}
        </p>
      </div>

      {(localError || (state && !state.ok)) && (
        <p role="alert" className="text-sm text-red-700">{localError ?? state?.message}</p>
      )}
      {state?.ok && <p role="status" className="text-sm text-green-800">{state.message}</p>}

      <Button type="submit" size="lg" disabled={busy} className="w-full sm:w-auto">
        {preparing ? "Preparo la foto…" : pending ? "Pubblico…" : "Pubblica"}
      </Button>
    </form>
  )
}
