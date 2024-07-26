import * as z from "zod";

export const productDetailSchema = z.object({
  id: z.string().cuid(),
  weight: z.number().int(),
  netWeight: z.number().int().nullable().optional(),
  validate: z.date().nullable().optional(),
  discount: z.number().int().default(0),
  price: z.number().int(),
  currency: z.string().default("EUR"),
  quantityInStock: z.number().int(),
  onSales: z.boolean().default(false),
  productId: z.string().uuid(),
});

export const categorySchema = z.object({
  // id: z.string().cuid(),
  title: z.string(),
  href: z.string().optional(),
  description: z.string().optional(),
  categoryImageUrl: z.string().optional(),
});

export const ingredientSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(2, "Name of the ingredient is required"),
  color: z.string().optional(),
  ingredientImageUrl: z.string().optional(),
});

export const bannerSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  imageString: z.string(),
});

export const productSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string(),
  harmonization: z.string().default(""),
  coverUrl: z.string(),
  images: z.array(z.string()),
  isDestack: z.boolean().default(false),
  status: z.enum(["draft", "published", "archived"]),
  isFeatured: z.boolean().default(false),
  categoryId: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  ingredients: z.array(ingredientSchema).optional(),
  productDetails: z.array(productDetailSchema).optional(),
});
