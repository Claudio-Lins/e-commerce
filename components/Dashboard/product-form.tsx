"use client";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CategoryDialogForm } from "./category-dialog-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { CategoryTypes } from "@/@types/category-types";

interface ProductFormProps {
  categories: CategoryTypes[];
}

export function ProductForm({ categories }: ProductFormProps) {
  return (
    <form className={cn("")}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
            <Link href="/dashboard/products">
              <ChevronLeftIcon size={20} />
            </Link>
          </Button>
          <h2 className="text-xl font-semibold tracking-tight">New Product</h2>
        </div>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            Enter the details of the new product. Make sure to provide accurate
            information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex w-full max-w-sm gap-2">
              <div className="flex w-full flex-col gap-3">
                <Label>Category</Label>
                <div className="flex items-center gap-2">
                  {categories.length > 0 && (
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <CategoryDialogForm />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
