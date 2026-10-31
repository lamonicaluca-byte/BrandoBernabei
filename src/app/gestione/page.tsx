import { redirect } from "next/navigation"

// Aprendo la gestione si parte dalle auto disponibili; le consegnate stanno in /gestione/consegnate.
export default function GestioneIndex() {
  redirect("/gestione/disponibili")
}
