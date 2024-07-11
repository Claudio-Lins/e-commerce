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
        <h2 className="font-bold">{product.name}</h2>
        <strong className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs">
          {currency(product.price, product.discount)}
        </strong>
      </div>
    </div>
  );
}
