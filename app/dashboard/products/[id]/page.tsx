import { EditProductForm } from "@/components/Dashboard/edit-product-form";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

interface EditProductProps {
  params: { id: string };
}

async function getProduct(productId: string) {
  const data = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!data) {
    return notFound();
  }
  return data;
}
export default async function EditProduct({ params }: EditProductProps) {
  noStore();
  const product = await getProduct(params.id);
  return <EditProductForm data={product} />;
}
