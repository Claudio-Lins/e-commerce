"use client"

import { editProduct } from "@/actions"
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
import { ChevronLeftIcon, XIcon } from "lucide-react"
import Link from "next/link"
import { useFormState } from "react-dom"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { productSchema } from "@/zodSchema"
import { useState } from "react"
import Image from "next/image"
import { SubmitBottom } from "@/components/submit-bottom"
import { type $Enums } from "@prisma/client"

interface EditProductFormProps {
  data: {
    id: string
    name: string
    complementary: string
    status: $Enums.ProductStatus
    net: number
    price: number
    images: string[]
    category: string
    isFeatured: boolean
  }
}

export function EditProductForm({ data }: EditProductFormProps) {
  const [images, setImages] = useState<string[]>(data.images)
  const [lastResult, action] = useFormState(editProduct, undefined)
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
      <input type="hidden" name="productId" value={data.id} />
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/dashboard/products">
            <ChevronLeftIcon size={20} />
          </Link>
        </Button>
        <h2 className="font-semibold text-xl tracking-tight">Edit Product</h2>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            In this form you can update your product.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={data.name}
                className="w-full"
                id="name"
                placeholder="Enter product name"
              />
              <p className="text-xs text-red-600">{fields.name.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">
                <Label htmlFor="name">Complementary</Label>
              </Label>
              <Textarea
                key={fields.complementary.key}
                name={fields.complementary.name}
                defaultValue={data.complementary}
                className="w-full"
                placeholder="Description of products"
              />
              <p className="text-xs text-red-600">
                {fields.complementary.errors}
              </p>
            </div>
            <div className="flex w-full items-center gap-4">
              <div className="flex flex-col gap-3 w-full">
                <Label htmlFor="price">Price</Label>
                <Input
                  key={fields.price.key}
                  name={fields.price.name}
                  defaultValue={data.price}
                  inputMode="numeric"
                  type="number"
                  className="w-full"
                  id="price"
                  placeholder="47 €"
                />
                <p className="text-xs text-red-600">{fields.price.errors}</p>
              </div>
              {/* <div className="flex flex-col gap-3 w-full">
                <Label htmlFor="price">Discount</Label>
                <Input
                  key={fields.discount.key}
                  name={fields.discount.name}
                  defaultValue={data.discount}
                  inputMode="numeric"
                  type="number"
                  className="w-full"
                  id="discount"
                  placeholder="47 €"
                />
                <p className="text-xs text-red-600">{fields.discount.errors}</p>
              </div> */}
              <div className="flex flex-col gap-3 w-full">
                <Label htmlFor="net">Net</Label>
                <Input
                  key={fields.net.key}
                  name={fields.net.name}
                  defaultValue={data.net}
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
                defaultChecked={data.isFeatured}
              />
              <p className="text-xs text-red-600">{fields.isFeatured.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={data.status}
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
                defaultValue={data.category}
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
                defaultValue={data.images as any}
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
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`)
                  }}
                />
              )}
              <p className="text-xs text-red-600">{fields.images.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitBottom label="Update Product" />
        </CardFooter>
      </Card>
    </form>
  )
}
