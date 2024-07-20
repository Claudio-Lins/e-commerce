"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageSlideProps {
  images: string[];
}

export function ImageSlide({ images }: ImageSlideProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  function handlePreviewsClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  }
  function handleNextClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  }
  function handleImageClick(index: number) {
    setMainImageIndex(index);
  }

  return (
    <div className={cn("grid grid-cols-1 items-start gap-6 md:gap-3")}>
      <div className="relative overflow-hidden rounded-lg">
        <AspectRatio ratio={1}>
          <Image
            src={images[mainImageIndex]}
            alt="Image"
            width={600}
            height={600}
            className="object-cover object-center"
          />
        </AspectRatio>
        {images.length > 2 && (
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <Button onClick={handlePreviewsClick} variant="ghost" size="icon">
              <ChevronLeft size={24} />
            </Button>
            <Button onClick={handleNextClick} variant="ghost" size="icon">
              <ChevronRight size={24} />
            </Button>
          </div>
        )}
      </div>
      <Separator className="my-2" />
      <div className="flex items-center gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(index)}
            className={cn(
              "size-6 transform cursor-pointer overflow-hidden rounded-full transition-transform duration-500 hover:scale-105 md:size-20 md:rounded-md md:p-2",
              index === mainImageIndex
                ? "scale-110 border-2 border-blue-500"
                : "border border-muted-foreground/30",
            )}
          >
            <AspectRatio ratio={1}>
              <Image
                src={image}
                alt="Image"
                width={100}
                height={100}
                className="size-6 object-contain object-center md:size-20 md:object-cover"
              />
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  );
}
