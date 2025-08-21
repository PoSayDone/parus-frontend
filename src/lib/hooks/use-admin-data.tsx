"use client";

import { useState, useEffect } from "react";
import { listProducts } from "@/lib/data/products";
import { listCategories } from "@/lib/data/categories";
import { listPosts } from "@/lib/data/blog";

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
				// Fetch all data with a single page request
				const [productsResult, categoriesResult, postsResult] = await Promise.all([
					listProducts({ page: 1, queryParams: { limit: 1000 } }),
					listCategories({ page: 1, queryParams: { limit: 1000 } }),
					listPosts({ page: 1, queryParams: { limit: 1000 } }),
				]);

				const posts = postsResult.response.data || [];

				setStats({
					totalProducts: productsResult.response.count,
					totalCategories: categoriesResult.response.count,
					totalBlogPosts: postsResult.response.count,
					publishedPosts: posts.filter((p: any) => !p.draft).length,
					draftPosts: posts.filter((p: any) => p.draft).length,
					totalViews: posts.reduce(
						(sum: number, post: any) => sum + (post.views || 0),
						0,
					),
				});
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
