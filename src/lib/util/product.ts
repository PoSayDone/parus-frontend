import { StoreProduct } from "@/types/store";

export const isSimpleProduct = (product: StoreProduct): boolean => {
  // All products are now considered simple since we removed variants
  return true;
};