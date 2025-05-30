"use server";

import { sdk } from "@lib/config";
import { HttpTypes } from "@medusajs/types";
import { getAuthHeaders, getCacheOptions } from "./cookies";
import { BlogPost } from "@/types/global";
import { sortPosts } from "../util/sort-posts";

export const listPosts = async ({
	pageParam = 1,
	queryParams,
}: {
	pageParam?: number;
	queryParams?: HttpTypes.FindParams;
	regionId?: string;
}): Promise<{
	response: { posts: BlogPost[]; count: number };
	nextPage: number | null;
	queryParams?: HttpTypes.FindParams;
}> => {
	const limit = queryParams?.limit || 12;
	const _pageParam = Math.max(pageParam, 1);
	const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

	const headers = {
		...(await getAuthHeaders()),
	};

	const next = {
		...(await getCacheOptions("posts")),
	};

	return sdk.client
		.fetch<{ posts: BlogPost[]; count: number }>(`/blog/posts`, {
			method: "GET",
			query: {
				limit,
				offset,
				...queryParams,
			},
			headers,
			next,
			cache: "force-cache",
		})
		.then(({ posts, count }) => {
			const nextPage = count > offset + limit ? pageParam + 1 : null;

			return {
				response: {
					posts,
					count,
				},
				nextPage: nextPage,
				queryParams,
			};
		});
};

export const listPostsWithSort = async ({
	page = 0,
	queryParams,
	sortBy = "created_at",
}: {
	page?: number;
	queryParams?: HttpTypes.FindParams;
	sortBy?: SortOptions;
}): Promise<{
	response: { posts: BlogPost[]; count: number };
	nextPage: number | null;
	queryParams?: HttpTypes.FindParams;
}> => {
	const limit = queryParams?.limit || 12;

	const {
		response: { posts, count },
	} = await listPosts({
		pageParam: 0,
		queryParams: {
			...queryParams,
			limit: 100,
		},
	});

	const sortedProducts = sortPosts(posts, sortBy);

	const pageParam = (page - 1) * limit;

	const nextPage = count > pageParam + limit ? pageParam + limit : null;

	const paginatedPosts = sortedProducts.slice(pageParam, pageParam + limit);

	return {
		response: {
			posts: paginatedPosts,
			count,
		},
		nextPage,
		queryParams,
	};
};
