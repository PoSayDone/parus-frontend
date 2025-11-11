import { listCategories } from "@/lib/data/categories";
import { listProducts } from "@/lib/data/products";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl =
		process.env.NEXT_PUBLIC_BASE_URL || "https://parusritual.ru";

	// Static pages
	const staticPages = [
		{
			url: `${baseUrl}`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${baseUrl}/store`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/designer`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/services`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/services/prices`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
	];

	// Dynamic category pages
	const categoryPages = [];
	try {
		const categoryResponse = await listCategories({
			queryParams: { limit: 1000 },
		});

		if (
			categoryResponse?.response?.data
		) {
			categoryPages.push(
				...categoryResponse.response.data.map((category: any) => ({
					url: `${baseUrl}/categories/${category.handle}`,
					lastModified: category.updatedAt
						? new Date(category.updatedAt)
						: new Date(),
					changeFrequency: "weekly",
					priority: 0.8,
				})),
			);
		}
	} catch (error) {
		console.error("Error fetching categories for sitemap:", error);
	}

	// Dynamic product pages
	const productPages = [];
	try {
		const productResponse = await listProducts({
			queryParams: { limit: 1000 },
		});

		if (
			productResponse?.response?.data
		) {
			productPages.push(
				...productResponse.response.data.map((product: any) => ({
					url: `${baseUrl}/products/${product.handle}`,
					lastModified: product.updatedAt
						? new Date(product.updatedAt)
						: new Date(),
					changeFrequency: "weekly",
					priority: 0.7,
				})),
			);
		}
	} catch (error) {
		console.error("Error fetching products for sitemap:", error);
	}

	return [...staticPages, ...categoryPages, ...productPages];
}
