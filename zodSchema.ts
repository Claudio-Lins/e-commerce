import * as z from "zod"

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(["draft", "published", "archived"]),
  net: z.string(),
  price: z.number().min(1),
  images: z.array(z.string().min(1, "At least one image is required")),
  category: z.enum(["jam", "utensils", "packages"]),
  isFeatured: z.boolean().optional(),
})
