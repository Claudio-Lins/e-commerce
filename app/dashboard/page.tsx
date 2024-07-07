import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  DollarSignIcon,
  PartyPopperIcon,
  ShoppingBagIcon,
  User2,
} from "lucide-react"

interface DashboardProps {}

export default function Dashboard({}: DashboardProps) {
  return (
    <>
      <div className={cn("grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4")}>
        <Card>
          <CardHeader className="flex flex-row pb-2 items-center justify-between">
            <CardTitle>Total Revenue</CardTitle>
            <DollarSignIcon className="size-5 text-emerald-500 font-medium" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">100,00 €</p>
            <p className="text-xs text-muted-foreground">Based 100 charges</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row pb-2 items-center justify-between">
            <CardTitle>Total Sales</CardTitle>
            <ShoppingBagIcon className="size-5 text-blue-500 font-medium" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">+ 50</p>
            <p className="text-xs text-muted-foreground">
              Total sales on store
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row pb-2 items-center justify-between">
            <CardTitle>Total Products</CardTitle>
            <PartyPopperIcon className="size-5 text-indigo-500 font-medium" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">47</p>
            <p className="text-xs text-muted-foreground">
              Total products created
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row pb-2 items-center justify-between">
            <CardTitle>Total Users</CardTitle>
            <User2 className="size-5 text-orange-500 font-medium" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">147</p>
            <p className="text-xs text-muted-foreground">
              Total Users Signed Up
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Recent transactions of your store</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <Avatar className="hidden sm:flex w-9 h-9">
                <AvatarFallback>CL</AvatarFallback>
              </Avatar>
              <div className="grid gap-0">
                <p className="text-sm font-medium">Claudio Lins</p>
                <p className="text-xs text-muted-foreground">
                  claudio.lins@me.com
                </p>
              </div>
              <p className="ml-auto font-medium">+ 147,00 €</p>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden sm:flex w-9 h-9">
                <AvatarFallback>CL</AvatarFallback>
              </Avatar>
              <div className="grid gap-0">
                <p className="text-sm font-medium">Claudio Lins</p>
                <p className="text-xs text-muted-foreground">
                  claudio.lins@me.com
                </p>
              </div>
              <p className="ml-auto font-medium">+ 147,00 €</p>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden sm:flex w-9 h-9">
                <AvatarFallback>CL</AvatarFallback>
              </Avatar>
              <div className="grid gap-0">
                <p className="text-sm font-medium">Claudio Lins</p>
                <p className="text-xs text-muted-foreground">
                  claudio.lins@me.com
                </p>
              </div>
              <p className="ml-auto font-medium">+ 147,00 €</p>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden sm:flex w-9 h-9">
                <AvatarFallback>CL</AvatarFallback>
              </Avatar>
              <div className="grid gap-0">
                <p className="text-sm font-medium">Claudio Lins</p>
                <p className="text-xs text-muted-foreground">
                  claudio.lins@me.com
                </p>
              </div>
              <p className="ml-auto font-medium">+ 147,00 €</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
