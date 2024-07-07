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
import { ChevronLeftIcon } from "lucide-react"
import Link from "next/link"
import { useFormState } from "react-dom"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { productSchema } from "@/zodSchema"

interface CreateProps {}

export default function ProductCreatePage({}: CreateProps) {
  const [lastResult, action] = useFormState(createProduct, undefined)
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema })
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  })
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
              <Label htmlFor="name">Description</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={fields.description.initialValue}
                className="w-full"
                placeholder="Description of products"
              />
              <p className="text-xs text-red-600">
                {fields.description.errors}
              </p>
            </div>
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
              <div className="flex flex-col gap-3 w-full">
                <Label htmlFor="net">Net</Label>
                <Input
                  key={fields.net.key}
                  name={fields.net.name}
                  defaultValue={fields.net.initialValue}
                  type="text"
                  className="w-full"
                  id="net"
                  placeholder="250 gr"
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
              <Label>Images</Label>
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  console.log("Files: ", res)
                  alert("Upload Completed")
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`)
                }}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Create Product</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
