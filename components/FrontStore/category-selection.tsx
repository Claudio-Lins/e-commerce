import { cn } from "@/lib/utils";
import Link from "next/link";
import jam from "@/public/categories/h-450px_IMG_7157.png";
import utensils from "@/public/categories/h-450px_IMG_7429.png";
import giftPackage from "@/public/categories/h-450px_IMG_8583.png";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";

interface CategorySelectionProps {}

export function CategorySelection({}: CategorySelectionProps) {
  return (
    <div className={cn("py-12 sm:py-20")}>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-extrabold tracking-tight">
          Shop by Category
        </h3>
        <Link
          href="/products/all"
          className="text-sm font-semibold text-primary hover:text-primary/80"
        >
          Browse all products &rarr;
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-x-8">
        <Link
          href="/products/jam"
          className="group aspect-h-1 aspect-w-2 cursor-pointer overflow-hidden rounded-xl shadow-sm transition-transform duration-500 sm:aspect-w-1 hover:scale-105 sm:row-span-2"
        >
          <Image
            src={jam}
            alt="Jam"
            layout="fill"
            className="object-cover object-center"
          />

          <div className="bg-gradient-to-b from-transparent to-black opacity-60 group-hover:opacity-0" />
          <div className="flex flex-col justify-end p-6">
            <h3 className="font-semibold text-white group-hover:text-black">
              Jams
            </h3>
            <p className="text-sm text-white group-hover:text-black">
              Shop now
            </p>
          </div>
        </Link>

        <Link
          href="/products//packages"
          className="group aspect-h-1 aspect-w-2 cursor-pointer overflow-hidden rounded-xl shadow-sm transition-transform duration-500 sm:aspect-none hover:scale-105 sm:relative sm:h-full"
        >
          <Image
            src={giftPackage}
            alt="Jam"
            layout="fill"
            className="object-cover object-center sm:absolute sm:inset-0 sm:h-full sm:w-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-60 group-hover:opacity-0 sm:absolute sm:inset-0" />
          <div className="flex items-end p-6 sm:absolute sm:inset-0">
            <div>
              <h3 className="font-semibold text-white group-hover:text-black">
                Gift Packages
              </h3>
              <p className="mt-1 text-sm text-white group-hover:text-black">
                Shop now
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/products/utensils"
          className="group aspect-h-1 aspect-w-2 cursor-pointer overflow-hidden rounded-xl shadow-sm transition-transform duration-500 sm:aspect-none hover:scale-105 sm:relative sm:h-full"
        >
          <Image
            src={utensils}
            alt="Jam"
            layout="fill"
            className="object-cover object-center sm:absolute sm:inset-0 sm:h-full sm:w-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-60 group-hover:opacity-0 sm:absolute sm:inset-0" />
          <div className="flex items-end p-6 sm:absolute sm:inset-0">
            <div className="">
              <h3 className="font-semibold text-white group-hover:text-black">
                Utensils
              </h3>
              <p className="mt-1 text-sm text-white group-hover:text-black">
                Shop now
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
