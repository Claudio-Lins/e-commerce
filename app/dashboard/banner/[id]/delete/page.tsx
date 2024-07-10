import { deleteBanner } from "@/actions"
import { SubmitBottom } from "@/components/submit-bottom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface DeleteProductProps {
  params: { id: string }
}

export default function DeleteBanner({ params }: DeleteProductProps) {
  return (
    <div className={cn("h-[80vh] w-full flex items-center justify-center")}>
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you sure?</CardTitle>
          <CardDescription>
            You are about to delete this Banner. This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex it justify-between">
          <Button asChild variant="ghost" size="default" className="mr-4">
            <Link href="/dashboard/banner">Cancel</Link>
          </Button>
          <form action={deleteBanner}>
            <input type="hidden" name="bannerId" value={params.id} />
            <SubmitBottom variant="destructive" label="Delete banner" />
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
