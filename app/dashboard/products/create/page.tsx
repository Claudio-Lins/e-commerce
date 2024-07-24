import { CategoryDialogForm } from "@/components/Dashboard/category-dialog-form";
import { ProductForm } from "@/components/Dashboard/product-form";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

interface CreateProps {}

async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

export default async function CreateProductPage({}: CreateProps) {
  const categories = await getCategories();
  return (
    <div className={cn("")}>
      <ProductForm categories={categories} />
    </div>
  );
}
