import { cn } from "@/lib/utils"
import Link from "next/link"

export const navbarLinks = [
  { id: 0, name: "Home", href: "/" },
  { id: 1, name: "All Products", href: "/products/all" },
]

interface NavbarLinksProps {}

export function NavbarLinks({}: NavbarLinksProps) {
  return (
    <div
      className={cn("hidden md:flex items-center justify-center gap-x-4 ml-8")}
    >
      {navbarLinks.map((link) => (
        <Link
          href={link.href}
          key={link.id}
          className="text-base font-medium text-gray-500 hover:text-gray-900"
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}
