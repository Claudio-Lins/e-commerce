import { CategoryDialogForm } from "@/components/Dashboard/category-dialog-form";
import { ProductForm } from "@/components/Dashboard/product-form";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

interface CreateProps {}

async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

async function getIngredients() {
  const ingredients = await prisma.ingredient.findMany();
  return ingredients;
}
export default async function CreateProductPage({}: CreateProps) {
  const categories = await getCategories();
  const ingredients = await getIngredients();
  return (
    <div className={cn("")}>
      <ProductForm categories={categories} ingredients={ingredients} />
    </div>
  );
}
