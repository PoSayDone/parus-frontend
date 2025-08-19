import { StoreProduct } from "@/types/store";
import { SortOptions } from "@/modules/store/components/refinement-list/sort-products";

interface MinPricedProduct extends StoreProduct {
  _minPrice?: number;
}

/**
 * Helper function to sort products by price until the store API supports sorting by price
 * @param products
 * @param sortBy
 * @returns products sorted by price
 */
export function sortProducts(
  products: StoreProduct[],
  sortBy: SortOptions,
): StoreProduct[] {
  let sortedProducts = products as MinPricedProduct[];

  if (["price_asc", "price_desc"].includes(sortBy)) {
    // Precompute the minimum price for each product
    sortedProducts.forEach((product) => {
      if (product.variants && product.variants.length > 0) {
        product._minPrice = Math.min(
          ...product.variants.map(
            (variant) =>
              variant?.price || 0,
          ),
        );
      } else {
        product._minPrice = Infinity;
      }
    });

    // Sort products based on the precomputed minimum prices
    sortedProducts.sort((a, b) => {
      const diff = a._minPrice! - b._minPrice!;
      return sortBy === "price_asc" ? diff : -diff;
    });
  }

  if (sortBy === "created_at") {
    sortedProducts.sort((a, b) => {
      return (
        new Date(b.createdAt!).getTime() -
        new Date(a.createdAt!).getTime()
      );
    });
  }

  return sortedProducts;
}