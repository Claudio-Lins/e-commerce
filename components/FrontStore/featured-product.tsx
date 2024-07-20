import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { Suspense } from "react";
import { ProductSkeletonCard } from "../skeleton/product-skeleton-card";

interface FeaturedProductProps {}

async function getProducts() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const data = await prisma.product.findMany({
    where: { status: "published", isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
  return data;
}

export function FeaturedProduct({}: FeaturedProductProps) {
  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight">Featured Items</h2>
      <Suspense
        fallback={
          <div className="mt-5 grid gap-20 sm:grid-cols-2 lg:grid-cols-3">
            <ProductSkeletonCard />
            <ProductSkeletonCard />
            <ProductSkeletonCard />
          </div>
        }
      >
        <LoadFeaturedProduct />
      </Suspense>
    </>
  );
}
export async function LoadFeaturedProduct({}: FeaturedProductProps) {
  const products = await getProducts();
  return (
    <>
      {/* <h2 className="text-2xl font-extrabold tracking-tight">Featured Items</h2> */}
      <div className="mt-5 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
