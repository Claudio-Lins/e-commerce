import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"
import { MoreHorizontalIcon, PlusCircleIcon, User2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CategoriesProps {}

async function getBanners() {
  const data = await prisma.banner.findMany()
  return data
}

export default async function BannerPage({}: CategoriesProps) {
  const banners = await getBanners()
  return (
    <>
      <div className={cn("flex items-center justify-end")}>
        <Button asChild className="flex items-center gap-2">
          <Link href="/dashboard/banner/create">
            <PlusCircleIcon size={20} />
            <span>Add banner</span>
          </Link>
        </Button>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Banners</CardTitle>
          <CardDescription>
            Manage your banners and view their details. Create, update, or
            delete banners as needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {banners.map((banner) => (
              <TableBody key={banner.id}>
                <TableRow>
                  <TableCell>
                    <Image
                      src={banner.imageString}
                      alt={`${banner.title} imagem`}
                      width={80}
                      height={80}
                      className="w-14 h-14 md:w-28 md:h-28 rounded-lg md:shadow-sm p-1 object-cover"
                    />
                  </TableCell>
                  <TableCell>{banner.title}</TableCell>
                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="">
                          <MoreHorizontalIcon size={20} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link href={`/dashboard/products/`}>
                            <span>Edit</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/products/`}>Delete</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
