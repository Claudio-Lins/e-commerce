import { ProductCard } from "@/components/FrontStore/product-card";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

interface CategoriesPageProps {
  params: { name: string };
}

async function getCategories(productCategory: string) {
  switch (productCategory) {
    case "all": {
      const data = await prisma.product.findMany({
        where: { status: "published" },
        orderBy: { createdAt: "desc" },
        include: {
          ingredients: true,
          category: {
            select: {
              id: true,
              title: true,
              href: true,
              description: true,
              categoryImageUrl: true,
            },
          },
          productDetails: true,
        },
      });
      return {
        products: data.map((product) => ({
          ...product,
          ingredients: product.ingredients.map((ingredient) => ({
            ...ingredient,
            imageUrl: ingredient.ingredientImageUrl || null, // Ensure imageUrl is present
          })),
        })),
        title: "All Products",
      };
    }
    case "jam": {
      const data = await prisma.product.findMany({
        where: { status: "published", category: { title: "jam" } },
        orderBy: { createdAt: "desc" },
        include: {
          ingredients: true,
          category: {
            select: {
              id: true,
              title: true,
              href: true,
              description: true,
              categoryImageUrl: true,
            },
          },
          productDetails: true,
        },
      });
      return {
        products: data.map((product) => ({
          ...product,
          ingredients: product.ingredients.map((ingredient) => ({
            ...ingredient,
            imageUrl: ingredient.ingredientImageUrl || null, // Ensure imageUrl is present
          })),
        })),
        title: "Jams",
      };
    }
    case "utensils": {
      const data = await prisma.product.findMany({
        where: { status: "published", category: { title: "utensils" } },
        orderBy: { createdAt: "desc" },
        include: {
          ingredients: true,
          category: {
            select: {
              id: true,
              title: true,
              href: true,
              description: true,
              categoryImageUrl: true,
            },
          },
          productDetails: true,
        },
      });
      return {
        products: data.map((product) => ({
          ...product,
          ingredients: product.ingredients.map((ingredient) => ({
            ...ingredient,
            imageUrl: ingredient.ingredientImageUrl || null, // Ensure imageUrl is present
          })),
        })),
        title: "Utensils",
      };
    }
    case "packages": {
      const data = await prisma.product.findMany({
        where: { status: "published", category: { title: "packages" } },
        orderBy: { createdAt: "desc" },
        include: {
          ingredients: true,
          category: {
            select: {
              id: true,
              title: true,
              href: true,
              description: true,
              categoryImageUrl: true,
            },
          },
          productDetails: true,
        },
      });
      return {
        products: data.map((product) => ({
          ...product,
          ingredients: product.ingredients.map((ingredient) => ({
            ...ingredient,
            imageUrl: ingredient.ingredientImageUrl || null, // Ensure imageUrl is present
          })),
        })),
        title: "Gift Packages",
      };
    }
    default: {
      return notFound();
    }
  }
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  noStore();
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
