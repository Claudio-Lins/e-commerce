"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarLinks = [
  { id: 0, name: "Home", href: "/" },
  { id: 1, name: "All Products", href: "/products/all" },
  { id: 2, name: "Jams", href: "/products/jam" },
  { id: 3, name: "Gift Packages", href: "/products/packages" },
  { id: 4, name: "Utensils", href: "/products/utensils" },
];

interface NavbarLinksProps {}

export function NavbarLinks({}: NavbarLinksProps) {
  const pathName = usePathname();
  return (
    <div
      className={cn("ml-8 hidden items-center justify-center gap-x-4 md:flex")}
    >
      {navbarLinks.map((link) => (
        <Link
          href={link.href}
          key={link.id}
          className={cn(
            "text-base font-medium text-gray-500 hover:text-zinc-900",
            pathName === link.href &&
              "font-bold text-zinc-950 underline underline-offset-8 hover:text-zinc-700",
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
