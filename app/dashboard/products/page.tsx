import { createProduct } from "@/actions"
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
import { ScrollArea } from "@/components/ui/scroll-area"
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
import { currency } from "@/utils/currency"
import { MoreHorizontalIcon, PlusCircleIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProductsProps {}

async function getProducts() {
  const data = await prisma.product.findMany()
  return data
}
export default async function Products({}: ProductsProps) {
  const products = await getProducts()
  return (
    <>
      <div className={cn("flex items-center justify-end")}>
        <Button asChild className="flex items-center gap-x-2">
          <Link href="/dashboard/products/create">
            <PlusCircleIcon size={20} />
            <span>Add product</span>
          </Link>
        </Button>
      </div>
      <Card className="mt-5 w-full">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their details. Create, update, or
            delete products as needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="">
            <TableHeader className="">
              <TableRow className="">
                <TableHead className="w-16 md:w-44">Image</TableHead>
                <TableHead className=" md:w-80">Name</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">Net</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className=" text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <ScrollArea className="h-[60vh] pt-4">
            <Table className="">
              {products.map((product) => (
                <TableBody key={product.id}>
                  <TableRow>
                    <TableCell className="">
                      <Image
                        src={product.images[0]}
                        alt={`${product.name} imagem`}
                        width={80}
                        height={80}
                        className="w-14 h-14 md:w-20 md:h-20 rounded-lg md:shadow-sm p-1 object-cover"
                      />
                    </TableCell>
                    <TableCell
                      className={cn(
                        " md:w-80",
                        product.isFeatured ? "font-bold" : ""
                      )}
                    >
                      {product.name}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                      {product.status}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {currency(product.price, product.discount)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.net}gr
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Intl.DateTimeFormat("pt-PT", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }).format(new Date(product.createdAt))}
                    </TableCell>
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
                            <Link href={`/dashboard/products/${product.id}`}>
                              <span>Edit</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/products/${product.id}/delete`}
                            >
                              Delete
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  )
}
