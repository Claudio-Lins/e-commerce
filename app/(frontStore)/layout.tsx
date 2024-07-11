import { Navbar } from "@/components/FrontStore/navbar"
import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

interface FrontStoreLayoutProps {}

export default function FrontStoreLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className={cn("")}>
      <Navbar />
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
