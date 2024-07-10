"use client"
import { createBanner } from "@/actions"
import { SubmitBottom } from "@/components/submit-bottom"
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
import { UploadDropzone } from "@/lib/uploadthing"
import { cn } from "@/lib/utils"
import { bannerSchema } from "@/zodSchema"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { ChevronLastIcon, ChevronLeftIcon, XIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useFormState } from "react-dom"

interface CreateBannerPageProps {}

export default function CreateBannerPage({}: CreateBannerPageProps) {
  const [image, setImage] = useState<string | undefined>(undefined)
  const [lastResult, action] = useFormState(createBanner, undefined)
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bannerSchema })
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  })

  function handleDelete() {
    setImage(undefined)
  }

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      className={cn("")}
    >
      <div className={cn("flex items-center gap-x-5")}>
        <Button
          asChild
          variant="outline"
          size="icon"
          className="flex items-center gap-2"
        >
          <Link href="/dashboard/banner">
            <ChevronLeftIcon size={20} />
          </Link>
        </Button>
        <h2 className="font-semibold text-xl tracking-tight">New Banner</h2>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Banner Details</CardTitle>
          <CardDescription>
            Enter the details of the new banner. Make sure to provide accurate
            information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-3">
              <Label className="">Name</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
                className=""
                type="text"
                placeholder="Enter the title of the banner"
              />
              <p className="text-xs text-red-600">{fields.title.errors}</p>
              <div className="flex flex-col gap-3">
                <Label>Images</Label>
                <input
                  type="hidden"
                  value={image}
                  key={fields.imageString.key}
                  name={fields.imageString.name}
                  defaultValue={fields.imageString.initialValue as any}
                />
                {image !== undefined ? (
                  <div className="flex gap-5">
                    <div className="relative w-48 h-48">
                      <Image
                        src={image}
                        alt="Product Image"
                        width={192}
                        height={192}
                        className="rounded-lg w-full h-full object-cover border shadow-md"
                      />
                      <button
                        onClick={() => handleDelete()}
                        type="button"
                        className="bg-red-500 p-2 rounded-md text-white absolute -top-2 -right-2"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="bannerImageRoute"
                    onClientUploadComplete={(res) => {
                      setImage(res[0].url)
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`)
                    }}
                  />
                )}
                <p className="text-xs text-red-600">
                  {fields.imageString.errors}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitBottom label="Create Banner" />
        </CardFooter>
      </Card>
    </form>
  )
}
