import { listAddresses } from "@/lib/data/addresses";
import { listPosts } from "@/lib/data/blog";
import { listCategories } from "@/lib/data/categories";
import { listPricePlans } from "@/lib/data/pricing";
import { listProducts } from "@/lib/data/products";
import { listServices } from "@/lib/data/services";

export async function getAdminStats() {
	try {
		const [
			productsResult,
			categoriesResult,
			postsResult,
			addressesResult,
			servicesResult,
			pricePlansResult,
		] = await Promise.all([
			listProducts({ page: 1, queryParams: { limit: 1000 } }),
			listCategories({
				page: 1,
				queryParams: { limit: 1000 },
			}),
			listPosts({ page: 1, queryParams: { limit: 1000 } }),
			listAddresses({ page: 1, queryParams: { limit: 1000 } }),
			listServices({ page: 1, queryParams: { limit: 1000 } }),
			listPricePlans({ page: 1, queryParams: { limit: 1000 } }),
		]);

		const posts = postsResult.response.data || [];

		const stats = {
			totalProducts: productsResult.response.count,
			totalCategories: categoriesResult.response.count,
			totalBlogPosts: postsResult.response.count,
			publishedPosts: posts.filter((p: any) => !p.draft).length,
			draftPosts: posts.filter((p: any) => p.draft).length,
			totalViews: posts.reduce(
				(sum: number, post: any) => sum + (post.views || 0),
				0,
			),
			totalAddresses: addressesResult.response.count,
			totalServices: servicesResult.response.count,
			totalPricePlans: pricePlansResult.response.count,
		};

		return stats;
	} catch (error) {
		console.error("Error fetching admin stats:", error);
		return {
			totalProducts: 0,
			totalCategories: 0,
			totalBlogPosts: 0,
			publishedPosts: 0,
			draftPosts: 0,
			totalViews: 0,
			totalAddresses: 0,
			totalServices: 0,
			totalPricePlans: 0,
		};
	}
}
