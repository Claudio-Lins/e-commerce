import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface OrdersProps {}

export default function Orders({}: OrdersProps) {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <p className="font-medium">Estela Lins</p>
                <p className="hidden md:flex text-sm text-muted-foreground">
                  estela.lins@me.com
                </p>
              </TableCell>
              <TableCell>
                <p className="font-medium">Sales</p>
              </TableCell>
              <TableCell>
                <p className="font-medium">Delivered</p>
              </TableCell>
              <TableCell>
                <p className="text-sm text-muted-foreground">12/02/2023</p>
              </TableCell>
              <TableCell className="text-right">
                <p className="font-medium">+ 147,00 €</p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
