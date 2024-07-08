"use client"

import { cn } from "@/lib/utils"
import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

interface SubmitBottomProps {
  label: string
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined
}

export function SubmitBottom({ label, variant }: SubmitBottomProps) {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button variant={variant} disabled>
          <Loader2 size={16} className={cn("animate-spin mr-2 w-4 h-4")} />
          Please wait...
        </Button>
      ) : (
        <Button variant={variant} type="submit">
          {label}
        </Button>
      )}
    </>
  )
}
