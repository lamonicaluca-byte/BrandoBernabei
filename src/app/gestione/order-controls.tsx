import { ArrowDown, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/Button"

/** Frecce per spostare una scheda su o giù: ogni freccia è un piccolo modulo che chiama l'azione. */
export function OrderControls({
  action,
  name,
  value,
  index,
  total,
}: {
  action: (formData: FormData) => Promise<void>
  name: string
  value: string
  index: number
  total: number
}) {
  return (
    <div className="flex items-center">
      {(["up", "down"] as const).map((dir) => {
        const disabled = dir === "up" ? index === 0 : index === total - 1
        const Icon = dir === "up" ? ArrowUp : ArrowDown
        return (
          <form key={dir} action={action}>
            <input type="hidden" name={name} value={value} />
            <input type="hidden" name="dir" value={dir} />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              disabled={disabled}
              aria-label={dir === "up" ? "Sposta su" : "Sposta giù"}
              className="size-8"
            >
              <Icon className="h-4 w-4" />
            </Button>
          </form>
        )
      })}
    </div>
  )
}
