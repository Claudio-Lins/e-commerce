"use client";

import { cn } from "@/lib/utils";
import { categorySchema } from "@/zodSchema";

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

interface CategoryFormProps {}

export function CategoryDialogForm({}: CategoryFormProps) {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: "",
      href: "",
      description: "",
      categoryImageUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    console.log("Submitting form...", values);
    startTransition(async () => {
      try {
        await createCategory(values);
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
    form.setValue("categoryImageUrl", "");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+ Add category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Category</DialogTitle>
          <DialogDescription></DialogDescription>
          <Separator />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={cn("")}>
            <div className={cn("flex w-full flex-col items-center space-y-6")}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Name of category"
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
                name="href"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description of the category"
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
              {image ? (
                <div className="flex gap-5">
                  <div className="relative h-48 w-48">
                    <Image
                      src={image}
                      alt="Category Image"
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
                  name="categoryImageUrl"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Category Image</FormLabel>
                      <FormControl>
                        <UploadDropzone
                          endpoint="bannerImageRoute"
                          onClientUploadComplete={(res) => {
                            const imageUrl = res[0].url;
                            setImage(imageUrl);
                            form.setValue("categoryImageUrl", imageUrl);
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
