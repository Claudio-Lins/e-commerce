import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  DollarSignIcon,
  ShoppingBagIcon,
  PartyPopperIcon,
  User2,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

interface DashboardStatsProps {}

async function getData() {
  const [users, products, orders] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
      },
    }),
    prisma.product.findMany({
      select: {
        id: true,
      },
    }),
    prisma.order.findMany({
      select: {
        amount: true,
      },
    }),
  ]);

  return {
    users,
    products,
    orders,
  };
}

export async function DashboardStats({}: DashboardStatsProps) {
  const { users, products, orders } = await getData();
  const totalAmount = orders.reduce((acc, order) => acc + order.amount, 0);

  return (
    <div className={cn("grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4")}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Revenue</CardTitle>
          <DollarSignIcon className="size-5 font-medium text-emerald-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {Intl.NumberFormat("pt-PT", {
              style: "currency",
              currency: "EUR",
            }).format(totalAmount / 100)}
          </p>
          <p className="text-xs text-muted-foreground">Based 100 charges</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Sales</CardTitle>
          <ShoppingBagIcon className="size-5 font-medium text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">+ {orders.length}</p>
          <p className="text-xs text-muted-foreground">Total sales on store</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Products</CardTitle>
          <PartyPopperIcon className="size-5 font-medium text-indigo-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{products.length}</p>
          <p className="text-xs text-muted-foreground">
            Total products created
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Users</CardTitle>
          <User2 className="size-5 font-medium text-orange-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{users.length}</p>
          <p className="text-xs text-muted-foreground">Total Users Signed Up</p>
        </CardContent>
      </Card>
    </div>
  );
}
