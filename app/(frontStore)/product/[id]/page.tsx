import { ImageSlide } from "@/components/FrontStore/image-slide";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

interface ProductProps {
  params: {
    id: string;
  };
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

export default async function Product({ params }: ProductProps) {
  const product = await getProduct(params.id);

  return (
    <>
      <div className="grid grid-cols-2 items-start gap-6 py-6 md:grid-cols-2 lg:gap-x-24">
        <ImageSlide images={product.images} />
      </div>
    </>
  );
}
