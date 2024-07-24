export interface ProductType {
  id: string;
  name: string;
  slug: string;
  harmonization: string;
  coverUrl: string;
  images: string[];
  ingredients: {
    id: string;
    name: string;
    color: string | null;
    imageUrl: string | null;
  }[];
  category: {
    id: string;
    title: string;
    href: string;
    description: string | null;
    categoryImageUrl: string | null;
  } | null;
  productDetails: {
    id: string;
    weight: number;
    netWeight?: number | null;
    validate?: Date | null;
    discount: number;
    price: number;
    currency: string;
    quantityInStock: number;
    onSales: boolean;
    productId: string;
  }[];
}
