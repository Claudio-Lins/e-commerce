import { cn } from "@/lib/utils";
import Link from "next/link";
import { NavbarLinks } from "./navbar-links";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { ShoppingBagIcon, User2 } from "lucide-react";
import { UserDropdown } from "./user-dropdown";
import { Button } from "../ui/button";
import { redis } from "@/lib/redis";
import { CartTypes } from "@/@types/cart-types";

interface NavbarProps {}

export async function Navbar({}: NavbarProps) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const cart: CartTypes | null = await redis.get(`cart-${user?.id}`);
  const totalItems = cart?.items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <nav
      className={cn(
        "mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8",
      )}
    >
      <div className="flex items-center">
        <Link href="/">
          <h1>
            <span className="text-3xl font-black tracking-tight">Logo</span>
          </h1>
        </Link>
        <NavbarLinks />
      </div>
      <div className="flex items-center">
        {user ? (
          <>
            <Link href="/bag" className="group mr-2 flex items-center p-2">
              <ShoppingBagIcon
                size={24}
                className="text-zinc-400 group-hover:text-zinc-600"
              />
              <span className="ml-2 text-sm font-semibold text-zinc-500 group-hover:text-zinc-800">
                ({totalItems})
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
          <div className="flex md:flex-1 md:items-center md:justify-end">
            <Button variant="ghost" asChild>
              <LoginLink>
                <User2 />
              </LoginLink>
            </Button>
            <Button variant="ghost" asChild>
              <RegisterLink>Sign up</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
