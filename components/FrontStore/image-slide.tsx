"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Separator } from "../ui/separator";

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
    <div className={cn("grid items-start gap-6 md:gap-3")}>
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={images[mainImageIndex]}
          alt="Image"
          width={600}
          height={600}
          className="h-[600px] w-[600px] object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button onClick={handlePreviewsClick} variant="ghost" size="icon">
            <ChevronLeft size={24} />
          </Button>
          <Button onClick={handleNextClick} variant="ghost" size="icon">
            <ChevronRight size={24} />
          </Button>
        </div>
      </div>
      <Separator className="my-2" />
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(index)}
            className={cn(
              "cursor-pointer overflow-hidden rounded-md p-1",
              index === mainImageIndex
                ? "scale-110 border-2 border-blue-500"
                : "border border-muted-foreground/30",
            )}
          >
            <Image
              src={image}
              alt="Image"
              width={100}
              height={100}
              className="transform cursor-pointer rounded-lg object-cover object-center shadow-sm transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
