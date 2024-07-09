"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { parseWithZod } from "@conform-to/zod"
import { productSchema } from "./zodSchema"
import { prisma } from "./lib/prisma"

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user.email !== "claudio.lins@me.com") {
    return redirect("/")
  }
  console.log("formData", formData)
  const submission = parseWithZod(formData, { schema: productSchema })

  if (submission.status !== "success") {
    return submission.reply()
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  )

  await prisma.product.create({
    data: {
      name: submission.value.name,
      complementary: submission.value.complementary,
      status: submission.value.status,
      net: submission.value.net,
      price: submission.value.price,
      discount: submission.value.discount,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  })
  return redirect("/dashboard/products")
}

// EDIT PRODUCT
export async function editProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user.email !== "claudio.lins@me.com") {
    return redirect("/")
  }

  const submission = parseWithZod(formData, { schema: productSchema })

  if (submission.status !== "success") {
    return submission.reply()
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  )

  const productId = formData.get("productId") as string

  await prisma.product.update({
    where: { id: productId },
    data: {
      name: submission.value.name,
      complementary: submission.value.complementary,
      status: submission.value.status,
      price: submission.value.price,
      net: submission.value.net,
      discount: submission.value.discount,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  })
  return redirect("/dashboard/products")
}

// DELETE PRODUCT
export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user.email !== "claudio.lins@me.com") {
    return redirect("/")
  }

  await prisma.product.delete({
    where: {
      id: formData.get("productId") as string,
    },
  })
  return redirect("/dashboard/products")
}
