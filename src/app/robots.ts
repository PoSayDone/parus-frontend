import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://parus-ritual.ru";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: "/admin",
			},
			{
				userAgent: "Yandex",
				disallow: "/admin",
			},
			{
				userAgent: "Googlebot",
				disallow: "/admin",
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}