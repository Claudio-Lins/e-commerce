"use client";

import { cn } from "@/lib/utils";
import { ingredientSchema } from "@/zodSchema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadDropzone } from "@/lib/uploadthing";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, XIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createCategory } from "@/actions/create-category";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { DialogClose } from "@radix-ui/react-dialog";

export function IngredientsDialogForm() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ingredientSchema>>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      name: "",
      color: "",
      ingredientImageUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ingredientSchema>) {
    console.log("Submitting form...", values);
    startTransition(async () => {
      try {
        // await createCategory(values);
        setImage(undefined);
        form.reset();
        console.log("Category created successfully!");
      } catch (error) {
        console.error("Error creating category:", error);
      }
    });
  }

  function handleDelete() {
    setImage(undefined);
    form.setValue("ingredientImageUrl", "");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+ Add Ingredient</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Ingredient</DialogTitle>
          <DialogDescription></DialogDescription>
          <Separator />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={cn("")}>
            <div className={cn("flex w-full flex-col items-center space-y-6")}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Name of ingredient"
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
                name="color"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input
                        type="color"
                        placeholder="/..."
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

              {image ? (
                <div className="flex gap-5">
                  <div className="relative h-48 w-48">
                    <Image
                      src={image}
                      alt="Ingredient Image"
                      width={192}
                      height={192}
                      className="h-full w-full rounded-lg border object-cover shadow-md"
                    />
                    <button
                      onClick={handleDelete}
                      type="button"
                      className="absolute -right-2 -top-2 rounded-md bg-red-500 p-2 text-white"
                    >
                      <XIcon className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="ingredientImageUrl"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Ingredient Image</FormLabel>
                      <FormControl>
                        <UploadDropzone
                          endpoint="bannerImageRoute"
                          onClientUploadComplete={(res) => {
                            const imageUrl = res[0].url;
                            setImage(imageUrl);
                            form.setValue("ingredientImageUrl", imageUrl);
                          }}
                          onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <DialogFooter className="w-full">
                <DialogClose asChild>
                  <Button className="w-full" type="submit" disabled={isPending}>
                    {isPending ? (
                      <LoaderIcon className="animate-spin" />
                    ) : (
                      "Create"
                    )}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
