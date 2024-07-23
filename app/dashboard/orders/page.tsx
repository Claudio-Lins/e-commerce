import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { currency } from "@/utils/currency";
import { unstable_noStore as noStore } from "next/cache";

interface OrdersProps {}

async function getOrders() {
  const data = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      amount: true,
      status: true,
      createdAt: true,
      User: {
        select: {
          email: true,
          firstName: true,
          profileImage: true,
        },
      },
    },
  });
  return data;
}

export default async function Orders({}: OrdersProps) {
  noStore();
  const orders = await getOrders();
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
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <p className="font-medium">{order.User?.firstName}</p>
                  <p className="hidden text-sm text-muted-foreground md:flex">
                    {order.User?.email}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="font-medium">Order</p>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{order.status}</p>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-muted-foreground">
                    {new Intl.DateTimeFormat("pt-PT", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(order.createdAt)}
                  </p>
                </TableCell>
                <TableCell className="text-right">
                  <p className="font-medium">{currency(order.amount / 100)}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
