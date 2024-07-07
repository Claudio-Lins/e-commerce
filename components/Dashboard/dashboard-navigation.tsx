"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/dashboard", name: "Dashboard" },
  { href: "/dashboard/orders", name: "Orders" },
  { href: "/dashboard/products", name: "Products" },
  { href: "/dashboard/categories", name: "Categories" },
]

interface DashboardNavigationProps {}

export function DashboardNavigation({}: DashboardNavigationProps) {
  const pathName = usePathname()
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "",
            link.href === pathName
              ? "text-foreground underline underline-offset-8"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {link.name}
        </Link>
      ))}
    </>
  )
}
