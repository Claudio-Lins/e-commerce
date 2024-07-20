"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, productSchema } from "./zodSchema";
import { prisma } from "./lib/prisma";
import { redis } from "./lib/redis";
import { CartTypes } from "./@types/cart-types";
import { revalidatePath } from "next/cache";

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userRole = await prisma.user.findUnique({
    where: { id: user?.id },
  });

  if (!user || userRole?.role !== "admin") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, { schema: productSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim()),
  );

  await prisma.product.create({
    data: {
      name: submission.value.name,
      complementary: submission.value.complementary,
      ingredients: submission.value.ingredients,
      status: submission.value.status,
      net: submission.value.net,
      price: submission.value.price,
      discount: submission.value.discount,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });
  return redirect("/dashboard/products");
}

// EDIT PRODUCT
export async function editProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userRole = await prisma.user.findUnique({
    where: { id: user?.id },
  });

  if (!user || userRole?.role !== "admin") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, { schema: productSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim()),
  );

  const productId = formData.get("productId") as string;

  await prisma.product.update({
    where: { id: productId },
    data: {
      name: submission.value.name,
      complementary: submission.value.complementary,
      ingredients: submission.value.ingredients,
      status: submission.value.status,
      price: submission.value.price,
      net: submission.value.net,
      discount: submission.value.discount,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });
  return redirect("/dashboard/products");
}

// DELETE PRODUCT
export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userRole = await prisma.user.findUnique({
    where: { id: user?.id },
  });

  if (!user || userRole?.role !== "admin") {
    return redirect("/");
  }

  await prisma.product.delete({
    where: {
      id: formData.get("productId") as string,
    },
  });
  return redirect("/dashboard/products");
}

// CREATE BANNER
export async function createBanner(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userRole = await prisma.user.findUnique({
    where: { id: user?.id },
  });

  if (!user || userRole?.role !== "admin") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, { schema: bannerSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });
  return redirect("/dashboard/banner");
}

// DELETE BANNER
export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userRole = await prisma.user.findUnique({
    where: { id: user?.id },
  });

  if (!user || userRole?.role !== "admin") {
    return redirect("/");
  }

  await prisma.banner.delete({
    where: {
      id: formData.get("bannerId") as string,
    },
  });
  return redirect("/dashboard/banner");
}

export async function addItem(productId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  let cart: CartTypes | null = await redis.get(`cart-${user.id}`);

  const selectedProduct = await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
    where: { id: productId },
  });

  if (!selectedProduct) {
    throw new Error("Product not found");
  }

  let myCart = {} as CartTypes;

  if (!cart || !cart.items) {
    myCart = {
      userId: user.id,
      items: [
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          quantity: 1,
          imageString: selectedProduct.images[0],
        },
      ],
    };
  } else {
    let itemFound = false;

    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += 1;
      }
      return item;
    });
    if (!itemFound) {
      myCart.items.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: 1,
        imageString: selectedProduct.images[0],
      });
    }
  }
  await redis.set(`cart-${user.id}`, myCart);
  revalidatePath("/", "layout");
}

export async function deleteItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const productId = formData.get("productId");

  let cart: CartTypes | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const updateCart: CartTypes = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };
    await redis.set(`cart-${user.id}`, updateCart);
  }
  revalidatePath("/bag");
}
