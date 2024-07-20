import { ProductCard } from "@/components/FrontStore/product-card";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: { name: string };
}

async function getCategories(productCategory: string) {
  // acrescentar um delay de 5 segundos
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  switch (productCategory) {
    case "all": {
      const data = await prisma.product.findMany({
        where: { status: "published" },
        orderBy: { createdAt: "desc" },
      });
      return {
        products: data,
        title: "All Products",
      };
    }
    case "jam": {
      const data = await prisma.product.findMany({
        where: { status: "published", category: "jam" },
        orderBy: { createdAt: "desc" },
      });
      return {
        products: data,
        title: "Jams",
      };
    }
    case "utensils": {
      const data = await prisma.product.findMany({
        where: { status: "published", category: "utensils" },
        orderBy: { createdAt: "desc" },
      });
      return {
        products: data,
        title: "Utensils",
      };
    }
    case "packages": {
      const data = await prisma.product.findMany({
        where: { status: "published", category: "packages" },
        orderBy: { createdAt: "desc" },
      });
      return {
        products: data,
        title: "Gift Packages",
      };
    }
    default: {
      return notFound();
    }
  }
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const { products, title } = await getCategories(params.name);
  return (
    <section className={cn("")}>
      <h1 className="my-5 text-3xl font-semibold">{title}</h1>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
