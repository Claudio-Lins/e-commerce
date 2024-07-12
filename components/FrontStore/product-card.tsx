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

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    complementary: string;
    net: number;
    price: number;
    discount: number;
    images: string[];
    ingredients: string;
    category: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className={cn("rounded-lg border p-4 shadow-md")}>
      <Carousel className="mx-auto w-full">
        <CarouselContent>
          {product.images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-80">
                <Image
                  className="h-full w-full rounded-lg object-cover object-center"
                  src={image}
                  alt={product.name}
                  fill
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {product.images.length > 1 && <CarouselPrevious className="ml-16" />}
        {product.images.length > 1 && <CarouselNext className="mr-16" />}
      </Carousel>
      <div className="mt-2 flex items-center justify-between">
        <h2 className="text-lg font-bold">{product.name}</h2>
        <strong className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs ring-1 ring-inset ring-primary/10">
          {currency(product.price, product.discount)}
        </strong>
      </div>
      <Separator className="my-2" />
      <div className="space-y-2">
        <p className="line-clamp-2 text-sm font-medium">
          {product.complementary}
        </p>
      </div>
      <div className="ga-4 mt-4 flex items-center justify-between">
        <Button asChild variant="link" className="w-full">
          <Link href={`/product/${product.id}`}>More details...</Link>
        </Button>
        <Button className="w-full">Add to cart</Button>
      </div>
    </div>
  );
}
