import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { prisma } from "@/lib/prisma";

interface RecentSalesProps {}

async function getRecentSales() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      amount: true,
      User: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
          profileImage: true,
        },
      },
    },
    take: 7,
  });
  return orders;
}

export async function RecentSales({}: RecentSalesProps) {
  const recentSales = await getRecentSales();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {recentSales.map((order) => (
          <div key={order.id} className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src={order.User?.profileImage} />
              <AvatarFallback>
                {order.User?.firstName?.[0] || "?"}
                {order.User?.lastName?.[0] || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-0">
              <p className="text-sm font-medium">{order.User?.firstName}</p>
              <p className="text-xs text-muted-foreground">
                {order.User?.email}
              </p>
            </div>
            <p className="ml-auto font-medium">
              +{" "}
              {Intl.NumberFormat("pt-PT", {
                style: "currency",
                currency: "EUR",
              }).format(order.amount / 100)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
