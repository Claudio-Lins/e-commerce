import { ImageSlide } from "@/components/FrontStore/image-slide";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { currency } from "@/utils/currency";
import { ShoppingBagIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedProduct } from "@/components/FrontStore/featured-product";
import { Price } from "@/components/price";

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
      <div className="grid grid-cols-1 items-start gap-6 py-6 md:grid-cols-2 lg:gap-x-24">
        <ImageSlide images={product.images} />
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">
            {product.name}
          </h1>
          <Price big={true} price={product.price} discount={product.discount} />
          <div className="flex items-center gap-x-4">
            <p className="text-sm font-bold capitalize">{product.category}</p>
            <p className="text-sm font-medium">{product.net} gr</p>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon size={16} className="fill-yellow-500 text-yellow-500" />
            <StarIcon size={16} className="fill-yellow-500 text-yellow-500" />
            <StarIcon size={16} className="fill-yellow-500 text-yellow-500" />
            <StarIcon size={16} className="fill-yellow-500 text-yellow-500" />
            <StarIcon size={16} className="fill-yellow-500 text-yellow-500" />
          </div>
          <p className="text-sm font-medium">{product.complementary}</p>
          <div className="mt-4">
            <Button className="mt-5 w-full">
              {" "}
              <ShoppingBagIcon size={20} className="mr-4" /> Add to cart
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-15">
        <FeaturedProduct />
      </div>
    </>
  );
}
