"use client"

import { startTransition, useActionState, useState } from "react"
import { Button } from "@/components/ui/Button"
import type { Vettura } from "@/data/vetture"
import { saveVettura, type ActionState } from "./actions"
import { inputClass, labelClass, shrink } from "./forms"

const FUELS = ["Benzina", "Diesel", "Ibrida", "Elettrica", "GPL", "Metano"]
const GEARBOXES = ["Manuale", "Automatico", "Semiautomatico"]
const MAX_TOTAL_BYTES = 3.8 * 1024 * 1024

export function VetturaForm({ initial }: { initial?: Vettura }) {
  const [state, action, pending] = useActionState<ActionState | null, FormData>(saveVettura, null)
  const [preparing, setPreparing] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const [fileCount, setFileCount] = useState(0)
  const busy = pending || preparing
  const editing = Boolean(initial)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setLocalError(null)
    const photos = fd.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0)
    fd.delete("photos")
    if (!editing && photos.length === 0) {
      setLocalError("Aggiungi almeno una foto.")
      return
    }
    setPreparing(true)
    try {
      let total = 0
      for (const p of photos) {
        const small = await shrink(p)
        total += small.size
        fd.append("photos", small)
      }
      if (total > MAX_TOTAL_BYTES) {
        setLocalError("Le foto sono troppo pesanti insieme: caricane meno per volta (le altre si aggiungono dopo con Modifica).")
        setPreparing(false)
        return
      }
    } catch {
      setLocalError("Non riesco a leggere una delle foto: prova con JPG o PNG.")
      setPreparing(false)
      return
    }
    setPreparing(false)
    startTransition(() => {
      action(fd)
    })
  }

  // dopo un inserimento riuscito il modulo si svuota; in modifica resta com'è
  const formKey = !editing && state?.ok ? state.nonce : "form"

  return (
    <form key={formKey} onSubmit={onSubmit} className="space-y-5">
      {initial && <input type="hidden" name="id" value={initial.id} />}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="v-make" className={labelClass}>Marca</label>
          <input id="v-make" name="make" required maxLength={40} defaultValue={initial?.make} placeholder="Porsche" className={inputClass} />
        </div>
        <div>
          <label htmlFor="v-model" className={labelClass}>Modello</label>
          <input id="v-model" name="model" required maxLength={60} defaultValue={initial?.model} placeholder="911" className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="v-version" className={labelClass}>Versione / titolo annuncio</label>
          <input id="v-version" name="version" maxLength={120} defaultValue={initial?.version} placeholder="992 Carrera T Ufficiale Italiana" className={inputClass} />
        </div>
        <div>
          <label htmlFor="v-year" className={labelClass}>Anno</label>
          <input id="v-year" name="year" type="number" inputMode="numeric" required min={1930} max={new Date().getFullYear() + 1} defaultValue={initial?.year} className={inputClass} />
        </div>
        <div>
          <label htmlFor="v-km" className={labelClass}>Chilometri</label>
          <input id="v-km" name="km" type="number" inputMode="numeric" required min={0} max={999999} defaultValue={initial?.km} className={inputClass} />
        </div>
        <div>
          <label htmlFor="v-cv" className={labelClass}>Potenza (CV)</label>
          <input id="v-cv" name="cv" type="number" inputMode="numeric" required min={0} max={3000} defaultValue={initial?.cv} className={inputClass} />
        </div>
        <div>
          <label htmlFor="v-price" className={labelClass}>Prezzo (€)</label>
          <input id="v-price" name="price" type="number" inputMode="numeric" required min={1} defaultValue={initial?.price} className={inputClass} />
        </div>
        <div>
          <label htmlFor="v-fuel" className={labelClass}>Alimentazione</label>
          <select id="v-fuel" name="fuel" required defaultValue={initial?.fuel ?? "Benzina"} className={inputClass}>
            {FUELS.map((f) => <option key={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="v-gearbox" className={labelClass}>Cambio</label>
          <select id="v-gearbox" name="gearbox" required defaultValue={initial?.gearbox ?? "Automatico"} className={inputClass}>
            {GEARBOXES.map((g) => <option key={g}>{g}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="v-color" className={labelClass}>Colore</label>
          <input id="v-color" name="color" maxLength={30} defaultValue={initial?.color} placeholder="Grigio" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="v-description" className={labelClass}>Descrizione</label>
        <textarea id="v-description" name="description" rows={10} maxLength={8000} defaultValue={initial?.description} className={inputClass} />
        <p className="mt-1.5 text-xs text-muted-foreground">Una riga vuota separa i paragrafi.</p>
      </div>

      <div>
        <label htmlFor="v-autoscout" className={labelClass}>Link annuncio AutoScout24 (facoltativo)</label>
        <input id="v-autoscout" name="autoscoutUrl" type="url" defaultValue={initial?.autoscoutUrl} placeholder="https://www.autoscout24.it/annunci/..." className={inputClass} />
      </div>

      {initial && initial.images.length > 0 && (
        <fieldset>
          <legend className={labelClass}>Foto attuali ({initial.images.length})</legend>
          <ul className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {initial.images.map((src, i) => (
              <li key={src} className="text-xs text-muted-foreground">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover bg-secondary" />
                <label className="mt-1.5 flex items-center gap-1.5">
                  <input type="radio" name="cover" value={src} /> {i === 0 ? "Copertina attuale" : "Metti in copertina"}
                </label>
                <label className="mt-1 flex items-center gap-1.5 text-red-700">
                  <input type="checkbox" name="removeImage" value={src} /> Togli
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      )}

      <div>
        <label htmlFor="v-photos" className={labelClass}>{editing ? "Aggiungi foto" : "Foto"}</label>
        <input
          id="v-photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFileCount(e.target.files?.length ?? 0)}
          className={`${inputClass} file:mr-4 file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:text-primary-foreground`}
        />
        <p className="mt-1.5 text-xs text-muted-foreground">
          {fileCount > 0
            ? `${fileCount} foto selezionate`
            : "Fino a 12 foto per volta; la prima è la copertina. Le altre si aggiungono dopo con Modifica."}
        </p>
      </div>

      {(localError || (state && !state.ok)) && (
        <p role="alert" className="text-sm text-red-700">{localError ?? state?.message}</p>
      )}
      {state?.ok && <p role="status" className="text-sm text-green-800">{state.message}</p>}

      <Button type="submit" size="lg" disabled={busy} className="w-full sm:w-auto">
        {preparing ? "Preparo le foto…" : pending ? "Pubblico…" : editing ? "Salva modifiche" : "Pubblica"}
      </Button>
    </form>
  )
}
