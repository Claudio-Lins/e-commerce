import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import { prisma } from "@/lib/prisma"
import Image from "next/image"

interface HeroProps {}

async function getBanners() {
  const data = await prisma.banner.findMany({
    orderBy: { createdAt: "desc" },
  })
  return data
}

export async function Hero({}: HeroProps) {
  const banners = await getBanners()
  return (
    <Carousel>
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id}>
            <div className={cn("relative h-[60vh] lg:h-[80vh] group")}>
              <Image
                src={banner.imageString}
                alt={banner.title}
                fill
                className="object-contain w-full h-full rounded-xl shadow-sm bg-zinc-100"
              />
              <div className="absolute top-6 left-6 rounded-lg p-4 bg-zinc-700 text-white transition-transform hover:scale-105">
                <h2 className="text-xl lg:text-4xl font-bold">
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
  )
}
