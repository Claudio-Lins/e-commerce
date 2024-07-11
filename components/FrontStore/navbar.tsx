import { cn } from "@/lib/utils"
import Link from "next/link"
import { NavbarLinks } from "./navbar-links"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components"
import { ShoppingBagIcon } from "lucide-react"
import { UserDropdown } from "./user-dropdown"
import { Button } from "../ui/button"

interface NavbarProps {}

export async function Navbar({}: NavbarProps) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  return (
    <nav
      className={cn(
        "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between"
      )}
    >
      <div className="flex items-center">
        <Link href="/">
          <h1>
            <span className="text-3xl font-bold tracking-tight">NextJS</span>
            <span className="text-sm font-medium">Tailwind CSS</span>
          </h1>
        </Link>
        <NavbarLinks />
      </div>
      <div className="flex items-center">
        {user ? (
          <>
            <Link href="/bag" className="group p-2 items-center mr-2 flex">
              <ShoppingBagIcon
                size={24}
                className="text-zinc-400 group-hover:text-zinc-600"
              />
              <span className="ml-2 font-medium text-sm text-zinc-400 group-hover:text-zinc-800">
                5
              </span>
            </Link>
            <UserDropdown
              email={user.email as string}
              firstName={user.given_name as string}
              lastName={user.family_name as string}
              avatarUrl={user.picture ?? "https://via.placeholder.com/150"}
            />
          </>
        ) : (
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end">
            <Button variant="ghost" asChild>
              <LoginLink>Sign in</LoginLink>
            </Button>
            <Button variant="ghost" asChild>
              <RegisterLink>Sign up</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
