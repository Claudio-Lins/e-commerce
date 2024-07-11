import { CategorySelection } from "@/components/FrontStore/category-selection";
import { FeaturedProduct } from "@/components/FrontStore/featured-product";
import { Hero } from "@/components/FrontStore/hero";
import { cn } from "@/lib/utils";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

interface FrontStoreProps {}

export default function FrontStorePage({}: FrontStoreProps) {
  return (
    <div className={cn("")}>
      <Hero />
      <CategorySelection />
      <FeaturedProduct />
    </div>
  );
}
