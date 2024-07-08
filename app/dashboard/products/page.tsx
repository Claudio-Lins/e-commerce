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
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their details. Create, update, or
            delete products as needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead className="">Price</TableHead>
                <TableHead className="">Net</TableHead>
                <TableHead className="">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {products.map((product) => (
              <TableBody key={product.id}>
                <TableRow>
                  <TableCell>
                    <Image
                      src={product.images[0]}
                      alt={`${product.name} imagem`}
                      width={80}
                      height={80}
                      className="w-14 h-14 md:w-20 md:h-20 rounded-lg md:shadow-sm p-1 object-cover"
                    />
                  </TableCell>
                  <TableCell
                    className={cn(product.isFeatured ? "font-bold" : "")}
                  >
                    {product.name}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {product.status}
                  </TableCell>
                  <TableCell className="">
                    {Intl.NumberFormat("pt-PT", {
                      style: "currency",
                      currency: "EUR",
                    }).format(product.price)}
                  </TableCell>
                  <TableCell className="">{product.net}gr</TableCell>
                  <TableCell className="">
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
        </CardContent>
      </Card>
    </>
  )
}
