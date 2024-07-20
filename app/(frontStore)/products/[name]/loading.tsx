import { ProductSkeletonCard } from "@/components/skeleton/product-skeleton-card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function LoadingProductPage() {
  return (
    <section className={cn("")}>
      <Skeleton className="my-10 h-8 w-60" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <ProductSkeletonCard />
        <ProductSkeletonCard />
        <ProductSkeletonCard />
        <ProductSkeletonCard />
        <ProductSkeletonCard />
        <ProductSkeletonCard />
      </div>
    </section>
  );
}
