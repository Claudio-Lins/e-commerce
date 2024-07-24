import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { currency } from "@/utils/currency";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import { Price } from "../price";
import { AspectRatio } from "../ui/aspect-ratio";
import { ProductType } from "@/@types/product-types";

interface ProductCardProps {
  product: ProductType;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col justify-between gap-2 rounded-lg border p-4 shadow-md",
      )}
    >
      <Carousel className="mx-auto w-full">
        <CarouselContent>
          {product.images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-80">
                <AspectRatio ratio={1}>
                  <Image
                    className="h-full w-full rounded-lg object-cover object-center"
                    src={product.coverUrl}
                    alt={product.name}
                    fill
                  />
                </AspectRatio>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {product.images.length > 1 && <CarouselPrevious className="ml-16" />}
        {product.images.length > 1 && <CarouselNext className="mr-16" />}
      </Carousel>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold leading-5">{product.name}</h2>
        {product?.productDetails?.map((productDetail) => (
          <div className="" key={productDetail.id}>
            <Price
              price={productDetail.price}
              discount={productDetail.discount || 0}
              big={true}
            />
          </div>
        ))}
        {/* <Price
          price={product?.productDetails[0]?.price}
          discount={product?.productDetails[0]?.discount || 0}
        /> */}
      </div>
      <Separator className="" />
      <div className="space-y-2">
        <p className="line-clamp-2 text-sm font-medium">
          {product.harmonization}
        </p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <Button asChild variant="link" className="w-full">
          <Link href={`/product/${product.id}`}>More details...</Link>
        </Button>
        <Button className="w-full">Add to cart</Button>
      </div>
    </div>
  );
}
