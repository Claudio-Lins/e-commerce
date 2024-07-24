"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/zodSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function createProduct(values: z.infer<typeof productSchema>) {
  const validateFields = productSchema.safeParse(values);
  if (!validateFields.success) {
    throw new Error("Invalid category data");
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userRole = await prisma.user.findUnique({
    where: { id: user?.id },
  });

  if (!user || userRole?.role !== "admin") {
    return redirect("/");
  }

  const preparedData = {
    name: validateFields.data.name,
    slug: validateFields.data.slug,
    harmonization: validateFields.data.harmonization,
    coverUrl: validateFields.data.coverUrl,
    images: validateFields.data.images,
    isDestack: validateFields.data.isDestack,
    status: validateFields.data.status,
    isFeatured: validateFields.data.isFeatured,
    category: validateFields.data.categoryId
      ? {
          connect: { id: validateFields.data.categoryId },
        }
      : undefined,
    productDetails: {
      create: (validateFields.data.productDetails || []).map((detail) => ({
        weight: detail.weight,
        netWeight: detail.netWeight,
        validate: detail.validate,
        discount: detail.discount,
        price: detail.price,
        currency: detail.currency,
        quantityInStock: detail.quantityInStock,
        onSales: detail.onSales,
      })),
    },
    ingredients: {
      connectOrCreate: (validateFields.data.ingredients || []).map(
        (ingredient) => ({
          where: { id: ingredient.id }, // Assuming you have the id of the ingredient
          create: {
            name: ingredient.name,
            color: ingredient.color,
            ingredientImageUrl: ingredient.ingredientImageUrl,
          },
        }),
      ),
    },
  };

  await prisma.product.create({
    data: preparedData,
  });

  return revalidatePath("/dashboard/products/create");
}
