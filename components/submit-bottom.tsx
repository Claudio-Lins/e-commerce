"use client";

import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2, LoaderCircle, ShoppingBagIcon } from "lucide-react";

interface SubmitBottomProps {
  label: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

export function SubmitBottom({ label, variant }: SubmitBottomProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant={variant} disabled>
          <Loader2 size={16} className={cn("mr-2 h-4 w-4 animate-spin")} />
          Please wait...
        </Button>
      ) : (
        <Button variant={variant} type="submit">
          {label}
        </Button>
      )}
    </>
  );
}

export function ShoppingBagButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="mt-5 w-full">
          {" "}
          <Loader2 size={20} className="mr-4 animate-spin" /> Please await...
        </Button>
      ) : (
        <Button className="mt-5 w-full" type="submit">
          {" "}
          <ShoppingBagIcon size={20} className="mr-4" /> Add to cart!
        </Button>
      )}
    </>
  );
}

export function DeleteItem() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <button disabled className="text-end">
          <LoaderCircle size={16} className={cn("mr-2 h-4 w-4 animate-spin")} />
          Removing...
        </button>
      ) : (
        <button type="submit" className="w-full text-right">
          Delete
        </button>
      )}
    </>
  );
}
