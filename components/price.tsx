import { cn } from "@/lib/utils";

interface PriceProps {
  price: number;
  discount: number;
  big?: boolean;
}

export function Price({ price, discount, big }: PriceProps) {
  const discountedPrice = price - (price * discount) / 100;
  if (!discount) {
    return (
      <span
        className={cn(
          "font-bold",
          big
            ? "inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-2xl ring-1 ring-inset ring-primary/10"
            : "text-sm",
        )}
      >
        {new Intl.NumberFormat("pt-PT", {
          style: "currency",
          currency: "EUR",
        }).format(price)}
      </span>
    );
  } else {
    return (
      <span
        className={cn(
          big
            ? "inline-flex items-center rounded-md px-2 py-1 text-2xl"
            : "text-sm font-medium",
        )}
      >
        <span
          className={cn(
            "line-through",
            big ? "inline-flex items-center text-base" : "text-xs font-medium",
          )}
        >
          {new Intl.NumberFormat("pt-PT", {
            style: "currency",
            currency: "EUR",
          }).format(price)}
        </span>
        <span className="ml-2 font-bold">
          {new Intl.NumberFormat("pt-PT", {
            style: "currency",
            currency: "EUR",
          }).format(discountedPrice)}
        </span>
      </span>
    );
  }
}
