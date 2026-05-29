import { redirect } from 'next/navigation'

// Fallback: il middleware gestisce già / → /it/ via Accept-Language.
// Questo redirect è una rete di sicurezza per casi edge (es. CDN bypass).
export default function RootPage() {
  redirect('/it')
}
