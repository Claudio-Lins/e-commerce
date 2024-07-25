"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";
import { ingredientSchema } from "@/zodSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function createIngredient(
  values: z.infer<typeof ingredientSchema>,
) {
  const validateFields = ingredientSchema.safeParse(values);
  if (!validateFields.success) {
    throw new Error("Invalid ingredient data");
  }
  console.log(validateFields);

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userRole = await prisma.user.findUnique({
    where: { id: user?.id },
  });

  if (!user || userRole?.role !== "admin") {
    return redirect("/");
  }

  console.log(validateFields.data);

  await prisma.ingredient.create({
    data: {
      ...validateFields.data,
    },
  });

  return revalidatePath("/dashboard/products/create");
}
