import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeft, Home, ShoppingBagIcon, XCircle } from "lucide-react";
import Link from "next/link";

interface CancelPageProps {}

export default function CancelPage({}: CancelPageProps) {
  return (
    <section
      className={cn("flex min-h-[80dvh] w-full items-center justify-center")}
    >
      <Card className="w-full max-w-xs p-4 sm:max-w-sm">
        <div className="p-6">
          <div className="flex w-full justify-center">
            <XCircle className="size-12 rounded-full bg-red-600/30 p-2 text-red-600" />
          </div>
          <div className="mt-3 w-full text-center sm:mt-5">
            <h4 className="text-lg font-bold leading-7">Payment cancelled!</h4>
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              Your order has been cancelled. Please review your order and make
              any necessary changes.
            </p>
            <Button asChild className="mt-6">
              <div className="flex w-full items-center gap-x-2">
                <Link href="/products/all">Back to Shop</Link>
                <ShoppingBagIcon className="size-4" />
              </div>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
