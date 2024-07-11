import { cn } from "@/lib/utils";
import Link from "next/link";
import jam from "@/public/categories/h-450px_IMG_7157.png";
import utensils from "@/public/categories/h-450px_IMG_7429.png";
import giftPackage from "@/public/categories/h-450px_IMG_8583.png";
import Image from "next/image";

interface CategorySelectionProps {}

export function CategorySelection({}: CategorySelectionProps) {
  return (
    <div className={cn("py-24 sm:py-32")}>
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
        <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-xl shadow-sm transition-transform duration-500 sm:aspect-w-1 hover:scale-105 sm:row-span-2">
          <Image
            src={jam}
            alt="Jam"
            layout="fill"
            className="object-cover object-center"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-60" />
          <div className="flex items-end p-6">
            <Link href="/products/jams" className="">
              <h3 className="font-semibold text-white">Jams</h3>
              <p className="mt-1 text-sm text-white">Shop now</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-xl shadow-sm transition-transform duration-500 sm:aspect-none hover:scale-105 sm:relative sm:h-full">
          <Image
            src={giftPackage}
            alt="Jam"
            layout="fill"
            className="object-cover object-center sm:absolute sm:inset-0 sm:h-full sm:w-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-60 sm:absolute sm:inset-0" />
          <div className="flex items-end p-6 sm:absolute sm:inset-0">
            <Link href="/products/gift-package" className="">
              <h3 className="font-semibold text-white">Gift Packages</h3>
              <p className="mt-1 text-sm text-white">Shop now</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-xl shadow-sm transition-transform duration-500 sm:aspect-none hover:scale-105 sm:relative sm:h-full">
          <Image
            src={utensils}
            alt="Jam"
            layout="fill"
            className="object-cover object-center sm:absolute sm:inset-0 sm:h-full sm:w-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-60 sm:absolute sm:inset-0" />
          <div className="flex items-end p-6 sm:absolute sm:inset-0">
            <Link href="/products/utensils" className="">
              <h3 className="font-semibold text-white">Utensils</h3>
              <p className="mt-1 text-sm text-white">Shop now</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
