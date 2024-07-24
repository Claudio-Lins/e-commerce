"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/zodSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function createCategory(values: z.infer<typeof categorySchema>) {
  const validateFields = categorySchema.safeParse(values);
  if (!validateFields.success) {
    throw new Error("Invalid category data");
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

  await prisma.category.create({
    data: {
      ...validateFields.data,
    },
  });

  return revalidatePath("/dashboard/products/create");
}
