"use client"

import { createProduct } from "@/actions"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { UploadButton, UploadDropzone } from "@/lib/uploadthing"
import { cn } from "@/lib/utils"
import {
  ChevronLeftIcon,
  PlusCircle,
  PlusCircleIcon,
  TrashIcon,
  X,
  XIcon,
} from "lucide-react"
import Link from "next/link"
import { useFormState } from "react-dom"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { productSchema } from "@/zodSchema"
import { useState } from "react"
import Image from "next/image"
import { SubmitBottom } from "@/components/submit-bottom"

interface CreateProps {}

export default function ProductCreatePage({}: CreateProps) {
  const [images, setImages] = useState<string[]>([])
  const [lastResult, action] = useFormState(createProduct, undefined)
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema })
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  })

  function handleDelete(index: number) {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      className={cn("")}
    >
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/dashboard/products">
            <ChevronLeftIcon size={20} />
          </Link>
        </Button>
        <h2 className="font-semibold text-xl tracking-tight">New Product</h2>
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
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={fields.name.initialValue}
                className="w-full"
                id="name"
                placeholder="Enter product name"
              />
              <p className="text-xs text-red-600">{fields.name.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Complementary</Label>
              <Textarea
                key={fields.complementary.key}
                name={fields.complementary.name}
                defaultValue={fields.complementary.initialValue}
                className="w-full"
                placeholder="Combine with..."
              />
              <p className="text-xs text-red-600">
                {fields.complementary.errors}
              </p>
            </div>
            {/* <div className="flex flex-col gap-3">
              <Label htmlFor="name">Ingredients</Label>
              <Textarea
                key={fields.ingredients.key}
                name={fields.ingredients.name}
                defaultValue={fields.ingredients.initialValue}
                className="w-full"
                placeholder="Ingredients of products"
              />
              <p className="text-xs text-red-600">
                {fields.ingredients.errors}
              </p>
            </div> */}

            <div className="flex w-full items-center gap-4">
              <div className="flex flex-col gap-3 w-full">
                <Label htmlFor="price">Price</Label>
                <Input
                  key={fields.price.key}
                  name={fields.price.name}
                  defaultValue={fields.price.initialValue}
                  inputMode="numeric"
                  type="number"
                  className="w-full"
                  id="price"
                  placeholder="47 €"
                />
                <p className="text-xs text-red-600">{fields.price.errors}</p>
              </div>
              {/* <div className="flex flex-col gap-3 w-full">
                <Label htmlFor="discount">Discount</Label>
                <Input
                  key={fields.discount.key}
                  name={fields.discount.name}
                  defaultValue={fields.discount.initialValue}
                  inputMode="numeric"
                  type="number"
                  className="w-full"
                  id="discount"
                  placeholder="10"
                />
                <p className="text-xs text-red-600">{fields.discount.errors}</p>
              </div> */}
              <div className="flex flex-col gap-3 w-full">
                <Label htmlFor="net">Net</Label>
                <Input
                  key={fields.net.key}
                  name={fields.net.name}
                  defaultValue={fields.net.initialValue}
                  type="number"
                  className="w-full"
                  id="net"
                  placeholder="250"
                />
                <p className="text-xs text-red-600">{fields.net.errors}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Featured Product</Label>
              <Switch
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                defaultValue={fields.isFeatured.initialValue}
              />
              <p className="text-xs text-red-600">{fields.isFeatured.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={fields.status.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-red-600">{fields.status.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <Select
                key={fields.category.key}
                name={fields.category.name}
                defaultValue={fields.category.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jam">Jam</SelectItem>
                  <SelectItem value="utensils">Utensils</SelectItem>
                  <SelectItem value="packages">Packages</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-red-600">{fields.category.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                value={images}
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={fields.images.initialValue as any}
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <Image
                        src={image}
                        alt="Product Image"
                        width={96}
                        height={96}
                        className="rounded-lg w-full h-full object-cover border shadow-md"
                      />
                      <button
                        onClick={() => handleDelete(index)}
                        type="button"
                        className="bg-red-500 p-2 rounded-md text-white absolute -top-2 -right-2"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url))
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`)
                  }}
                />
              )}
              <p className="text-xs text-red-600">{fields.images.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitBottom label="Create Product" />
        </CardFooter>
      </Card>
    </form>
  )
}
