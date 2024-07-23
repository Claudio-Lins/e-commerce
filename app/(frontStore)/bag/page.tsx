import { CartTypes } from "@/@types/cart-types";
import { checkOut, deleteItem } from "@/actions";
import { CheckOutButton, DeleteItem } from "@/components/submit-bottom";
import { Button } from "@/components/ui/button";
import { redis } from "@/lib/redis";
import { cn } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

interface BagProps {}

export default async function Bag({}: BagProps) {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }

  const cart: CartTypes | null = await redis.get(`cart-${user.id}`);
  let totalPrice = 0;

  cart?.items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  return (
    <div className={cn("mx-auto mt-10 min-h-[55vh] max-w-2xl")}>
      {!cart || !cart.items ? (
        <div className="mt-20 flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag size={40} className="text-primary" />
          </div>
          <h3 className="mt-6 text-center text-xl font-semibold">
            Your shopping cart is empty. Add some items to start shopping.
          </h3>
        </div>
      ) : (
        <div className="flex flex-col gap-y-10">
          {cart?.items.map((item) => (
            <div
              key={item.id}
              className="mt-4 flex items-center justify-between"
            >
              <div className="relative size-24 sm:size-32">
                <Image
                  src={item.imageString}
                  alt={item.name}
                  width={160}
                  height={160}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="ml-4 flex w-full items-center justify-between font-semibold">
                <p className="text-lg font-semibold">{item.name}</p>
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center gap-x-2">
                    <p>{item.quantity} x</p>
                    <p>
                      {Intl.NumberFormat("pt-PT", {
                        style: "currency",
                        currency: "EUR",
                      }).format(item.price / 100)}
                    </p>
                  </div>
                  <form action={deleteItem}>
                    <input type="hidden" value={item.id} name="productId" />
                    <DeleteItem />
                  </form>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-10">
            <div className="flex items-center justify-between font-medium">
              <p className="text-2xl font-bold">Total</p>
              <p className="text-xl font-bold">
                {Intl.NumberFormat("pt-PT", {
                  style: "currency",
                  currency: "EUR",
                }).format(totalPrice / 100)}
              </p>
            </div>
            <form action={checkOut}>
              <CheckOutButton />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
