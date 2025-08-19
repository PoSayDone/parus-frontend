"use client";

import { useState, useEffect } from "react";

export function useAdminStats() {
	const [stats, setStats] = useState({
		totalProducts: 0,
		totalCategories: 0,
		totalBlogPosts: 0,
		publishedPosts: 0,
		draftPosts: 0,
		totalViews: 0,
	});

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const productsResponse = await fetch("/api/admin/products");
				const productsData = await productsResponse.json();

				const categoriesResponse = await fetch("/api/admin/categories");
				const categoriesData = await categoriesResponse.json();

				const postsResponse = await fetch("/api/admin/posts");
				const postsData = await postsResponse.json();

				if (
					productsResponse.ok &&
					categoriesResponse.ok &&
					postsResponse.ok
				) {
					const posts = postsData.posts || [];

					setStats({
						totalProducts: productsData.products?.length || 0,
						totalCategories: categoriesData.categories?.length || 0,
						totalBlogPosts: posts.length,
						publishedPosts: posts.filter((p: any) => !p.draft)
							.length,
						draftPosts: posts.filter((p: any) => p.draft).length,
						totalViews: posts.reduce(
							(sum: number, post: any) => sum + (post.views || 0),
							0,
						),
					});
				}
			} catch (error) {
				console.error("Error fetching admin stats:", error);
			}
		};

		fetchStats();

		const interval = setInterval(fetchStats, 30000);
		return () => clearInterval(interval);
	}, []);

	return stats;
}
