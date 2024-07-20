import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { prisma } from "@/lib/prisma";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

interface HeroProps {}

async function getBanners() {
  const data = await prisma.banner.findMany({
    orderBy: { createdAt: "desc" },
  });
  return data;
}

export async function Hero({}: HeroProps) {
  const banners = await getBanners();
  return (
    <Carousel className="md:mt-10">
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id}>
            <div className={cn("group relative")}>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={banner.imageString}
                  alt={banner.title}
                  fill
                  className="h-full w-full rounded-xl bg-zinc-800 object-contain shadow-sm"
                />
              </AspectRatio>
              <div className="absolute left-0 top-0 rounded-lg p-4 text-white transition-transform hover:scale-105">
                <h2 className="text-xl font-bold lg:text-4xl">
                  {banner.title}
                </h2>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  );
}
