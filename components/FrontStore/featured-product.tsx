import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";

interface FeaturedProductProps {}

async function getProducts() {
  const data = await prisma.product.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
  });
  return data;
}

export async function FeaturedProduct({}: FeaturedProductProps) {
  const products = await getProducts();
  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight">Featured Items</h2>
      <div className="mt-5 grid gap-20 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
