import { Chart } from "@/components/Dashboard/chart";
import { DashboardStats } from "@/components/Dashboard/dashboarb-stats";
import { RecentSales } from "@/components/Dashboard/recent-sales";
import { unstable_noStore as noStore } from "next/cache";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

interface DashboardProps {}

async function getData() {
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  const result = data.map((order) => ({
    date: new Intl.DateTimeFormat("pt-PT").format(order.createdAt),
    revenue: order.amount / 100,
  }));

  return result;
}

export default async function Dashboard({}: DashboardProps) {
  noStore();
  const data = await getData();
  return (
    <>
      <DashboardStats />
      <div className="mt-10 grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Recent transactions from the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart data={data} />
          </CardContent>
        </Card>
        <RecentSales />
      </div>
    </>
  );
}
