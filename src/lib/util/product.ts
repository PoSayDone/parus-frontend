import type { StoreProduct } from "@/types/store";

export const isSimpleProduct = (_product: StoreProduct): boolean => {
	// All products are now considered simple since we removed variants
	return true;
};
