import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function LoadingProductPage() {
  return (
    <div className="grid grid-cols-1 items-start gap-6 py-6 md:grid-cols-2 lg:gap-x-24">
      <div className="">
        <Skeleton className="relative h-[600px] w-full" />
        <div className="mt-6 grid grid-cols-5 gap-4">
          <Skeleton className="size-24" />
          <Skeleton className="size-24" />
          <Skeleton className="size-24" />
          <Skeleton className="size-24" />
          <Skeleton className="size-24" />
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <Skeleton className="h-12 w-56" />
        <div className="mt-4 flex items-center gap-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="mt-4 h-10 w-full" />
      </div>
    </div>
  );
}
