"use server";

import prisma from "@lib/prisma";
import { BlogPost, Prisma } from "@prisma/client";
import _ from "lodash";

export const listPosts = async ({
	page = 1,
	queryParams,
	sortBy = "created_at",
}: {
	page?: number;
	queryParams?: {
		limit?: number;
		offset?: number;
		type?: string[] | string;
		[key: string]: any;
	};
	sortBy?: "created_at" | "views";
}): Promise<{
	response: { posts: BlogPost[]; count: number };
	nextPage: number | null;
	queryParams?: any;
}> => {
	const limit = queryParams?.limit || 12;
	const _pageParam = Math.max(page, 1);
	const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

	const where: Prisma.BlogPostWhereInput = {
		draft: false,
	};
	const orderBy: Prisma.BlogPostOrderByWithAggregationInput = {};

	if (sortBy === "created_at") {
		orderBy.createdAt = "desc";
	}

	if (sortBy === "views") {
		orderBy.views = "desc";
	}

	if (queryParams?.type) {
		where.type = {
			in: Array.isArray(queryParams.type)
				? queryParams.type
				: [queryParams.type],
		};
	}

	const [posts, count] = await Promise.all([
		prisma.blogPost.findMany({
			where,
			skip: offset,
			take: limit,
			orderBy: _.isEmpty(orderBy)
				? {
						createdAt: "desc",
					}
				: orderBy,
		}),
		prisma.blogPost.count({ where }),
	]);

	const nextPage = count > offset + limit ? page + 1 : null;

	return {
		response: {
			posts,
			count,
		},
		nextPage: nextPage,
		queryParams,
	};
};

export const getAllPosts = async ({
	pageParam = 1,
	queryParams,
}: {
	pageParam?: number;
	queryParams?: {
		limit?: number;
		offset?: number;
		type?: string;
		[key: string]: any;
	};
}): Promise<{
	response: { posts: BlogPost[]; count: number };
	nextPage: number | null;
	queryParams?: any;
}> => {
	const limit = queryParams?.limit || 12;
	const _pageParam = Math.max(pageParam, 1);
	const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

	const where: Prisma.BlogPostWhereInput = {};

	if (queryParams?.type) {
		where.type = queryParams.type;
	}

	const [posts, count] = await Promise.all([
		prisma.blogPost.findMany({
			where,
			skip: offset,
			take: limit,
			orderBy: {
				createdAt: "desc",
			},
		}),
		prisma.blogPost.count({ where }),
	]);

	const nextPage = count > offset + limit ? pageParam + 1 : null;

	return {
		response: {
			posts: posts,
			count,
		},
		nextPage: nextPage,
		queryParams,
	};
};

export const getPostByHandle = async (handle: string) => {
	const post = await prisma.blogPost.findUnique({
		where: { handle },
	});

	if (!post) return null;

	return post;
};

export const createPost = async (data: any) => {
	const post = await prisma.blogPost.create({
		data,
	});

	return post;
};

export const updatePost = async (handle: string, data: any) => {
	const post = await prisma.blogPost.update({
		where: { handle },
		data,
	});

	return post;
};

export const deletePost = async (handle: string) => {
	return prisma.blogPost.delete({
		where: { handle },
	});
};
