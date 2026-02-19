import { listCategories } from "@/lib/data/categories";
import { listProducts } from "@/lib/data/products";
import { getSiteSettings } from "@/lib/data/site-settings";
import { listServices } from "@/lib/data/services";
import { listAddresses } from "@/lib/data/addresses";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl =
		process.env.NEXT_PUBLIC_BASE_URL || "https://parus-ritual.ru";
	const settings = await getSiteSettings();
	const showCatalog = settings?.showCatalog ?? true;

	// Static pages
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: `${baseUrl}`,
			//lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${baseUrl}/store`,
			//lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/designer`,
			//lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/services`,
			//lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/prices`,
			//lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/blog`,
			//lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
	];
	// Dynamic address pages (кладбища, морги и т.д.)
	const addressPages: MetadataRoute.Sitemap = [];
	try {
		const addressResponse = await listAddresses({
			queryParams: { 
				limit: 1000,
				includeInactive: false // берем только активные
			},
		});

		if (addressResponse?.response?.data) {
			addressPages.push(
				...addressResponse.response.data.map((item: any) => ({
					url: `${baseUrl}/addresses/${item.handle}`,
					changeFrequency: "monthly" as const,
					priority: 0.6,
				})),
			);
		}
	} catch (error) {
		console.error("Error fetching addresses for sitemap:", error);
	}
	// Dynamic service pages
	const servicePages: MetadataRoute.Sitemap = [];
	try {
		const serviceResponse = await listServices({
			queryParams: { limit: 1000 },
		});

		if (serviceResponse?.response?.data) {
			servicePages.push(
				...serviceResponse.response.data.map((service: any) => ({
					url: `${baseUrl}/services/${service.handle}`,
					changeFrequency: "weekly" as const,
					priority: 0.8,
				})),
			);
		}
	} catch (error) {
		console.error("Error fetching services for sitemap:", error);
	}
	// Dynamic category pages
	const categoryPages: MetadataRoute.Sitemap = [];
	if (showCatalog) {
		try {
			const categoryResponse = await listCategories({
				queryParams: { limit: 1000 },
			});

			if (categoryResponse?.response?.data) {
				categoryPages.push(
					...categoryResponse.response.data.map((category: any) => ({
						url: `${baseUrl}/categories/${category.handle}`,
						//lastModified: category.updatedAt
						//	? new Date(category.updatedAt)
						//	: new Date(),
						changeFrequency: "weekly" as const,
						priority: 0.8,
					})),
				);
			}
		} catch (error) {
			console.error("Error fetching categories for sitemap:", error);
		}
	}

	// Dynamic product pages
	const productPages: MetadataRoute.Sitemap = [];
	if (showCatalog) {
		try {
			const productResponse = await listProducts({
				queryParams: { limit: 1000 },
			});

			if (productResponse?.response?.data) {
				productPages.push(
					...productResponse.response.data.map((product: any) => ({
						url: `${baseUrl}/products/${product.handle}`,
						//lastModified: product.updatedAt
						//	? new Date(product.updatedAt)
						//	: new Date(),
						changeFrequency: "weekly" as const,
						priority: 0.7,
					})),
				);
			}
		} catch (error) {
			console.error("Error fetching products for sitemap:", error);
		}
	}

	const filteredStaticPages = showCatalog
		? staticPages
		: staticPages.filter((page) => page.url !== `${baseUrl}/store`);

	return [...filteredStaticPages, ...servicePages, ...categoryPages, ...productPages, ...addressPages];
}
