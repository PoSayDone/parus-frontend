import { BlogPost } from "@/types/global";
import { HttpTypes } from "@medusajs/types";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";

/**
 * Helper function to sort products by price until the store API supports sorting by price
 * @param products
 * @param sortBy
 * @returns products sorted by price
 */
export function sortPosts(posts: BlogPost[], sortBy: SortOptions): BlogPost[] {
	if (sortBy === "created_at") {
		posts.sort((a, b) => {
			return (
				new Date(b.created_at!).getTime() -
				new Date(a.created_at!).getTime()
			);
		});
	}

	return posts;
}
