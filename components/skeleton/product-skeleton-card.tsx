import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export function ProductSkeletonCard() {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-2 rounded-lg border p-4 shadow-md",
      )}
    >
      <Skeleton className="h-80 w-full rounded-lg" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-24" />
      </div>
      <Separator className="" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}
