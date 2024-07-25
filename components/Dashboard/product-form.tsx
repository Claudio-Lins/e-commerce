"use client";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useTransition } from "react";
import { productSchema } from "@/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import SelectReact from "react-select";
import * as z from "zod";
import { SubmitBottom } from "../submit-bottom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { IngredientsDialogForm } from "./ingredients-dialog-form";
import { IngredientsType } from "@/@types/ingredient-types";

interface ProductFormProps {
  categories: CategoryTypes[];
  ingredients: IngredientsType[];
}

export function ProductForm({ categories, ingredients }: ProductFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      harmonization: "",
      coverUrl: "",
      images: [],
      isDestack: false,
      status: "draft",
      isFeatured: false,
      categoryId: "",
      ingredients: [],
      productDetails: [],
    },
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    startTransition(async () => {
      try {
        console.log("Submitting form...", values);
        // await createProduct(values);
        form.reset();
      } catch (error) {
        console.error("Error creating product:", error);
      }
    });
  }
  return (
    <div className="w-full">
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
      <Form {...form}>
        <form className={cn("w-full")}>
          <Card className="mt-5 w-full">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>
                Enter the details of the new product. Make sure to provide
                accurate information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex w-full flex-col gap-6 md:grid md:grid-cols-2">
                <div className="flex w-full gap-2">
                  <div className="flex w-full flex-col gap-3">
                    <Label>Category</Label>
                    <div className="flex w-full items-center gap-2">
                      {categories.length > 0 && (
                        <Select name="categoryId">
                          <SelectTrigger className="text-base text-[#808080]">
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
                    <Label>Ingredients</Label>
                    <div className="flex w-full items-center gap-2">
                      {ingredients.length > 0 && (
                        <Controller
                          name="ingredients"
                          control={form.control}
                          render={({ field }) => (
                            <SelectReact
                              className={cn("w-full")}
                              {...field}
                              isMulti
                              options={ingredients}
                              getOptionLabel={(option) => option.name}
                              getOptionValue={(option) => option.id!}
                              placeholder="Select Ingredients"
                            />
                          )}
                        />
                      )}
                      <IngredientsDialogForm />
                    </div>
                    <div
                      className={cn(
                        "flex w-full flex-col items-center space-y-6",
                      )}
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Name of product"
                                required
                                {...field}
                                disabled={isPending}
                                autoComplete="off"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="harmonization"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Harmonization</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="The harmonization of the product"
                                required
                                {...field}
                                disabled={isPending}
                                value={field.value ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex w-full items-center gap-2">
                        <FormField
                          control={form.control}
                          name="isDestack"
                          render={({ field }) => (
                            <FormItem className="flex w-full flex-col items-center">
                              <FormLabel>Is Destackable?</FormLabel>
                              <FormControl>
                                <Switch
                                  {...field}
                                  disabled={isPending}
                                  checked={field.value}
                                  onCheckedChange={(checked) =>
                                    field.onChange(checked)
                                  }
                                  value={field.value ? "true" : "false"}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="isFeatured"
                          render={({ field }) => (
                            <FormItem className="flex w-full flex-col items-center">
                              <FormLabel>Is Featured?</FormLabel>
                              <FormControl>
                                <Switch
                                  {...field}
                                  disabled={isPending}
                                  checked={field.value}
                                  onCheckedChange={(checked) =>
                                    field.onChange(checked)
                                  }
                                  value={field.value ? "true" : "false"}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 rounded-lg border border-dashed"></div>
              </div>
            </CardContent>
            <CardFooter>
              <SubmitBottom label="Create Product" />
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
