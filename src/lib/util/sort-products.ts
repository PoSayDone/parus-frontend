import { SortOptions } from "@/modules/store/components/refinement-list/sort-products";
import { Product } from "@prisma/client";

/**
 * Helper function to sort products by price until the store API supports sorting by price
 * @param products
 * @param sortBy
 * @returns products sorted by price
 */
export function sortProducts(
	products: Product[],
	sortBy: SortOptions,
): Product[] {
	const sortedProducts = products;

	if (["price_asc", "price_desc"].includes(sortBy)) {
		sortedProducts.sort((a, b) => {
			const diff = a.price! - b.price!;
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
