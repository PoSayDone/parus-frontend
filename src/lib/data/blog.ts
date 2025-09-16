"use server";

import prisma from "@lib/prisma";
import { BlogPost, Prisma } from "@prisma/client";
import _ from "lodash";
import { revalidatePath } from "next/cache";

export const listPosts = async ({
	page = 1,
	queryParams,
	sortBy = "created_at",
}: {
	page?: number;
	queryParams?: {
		handle?: string;
		limit?: number;
		type?: string[] | string;
		q?: string;
		[key: string]: any;
	};
	sortBy?: "created_at" | "views";
}): Promise<{
	response: { data: BlogPost[]; count: number };
	nextPage: number | null;
	queryParams?: any;
}> => {
	const limit = queryParams?.limit || 10;
	const _pageParam = Math.max(page, 1);
	const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

	const where: Prisma.BlogPostWhereInput = {};
	const orderBy: Prisma.BlogPostOrderByWithAggregationInput = {};

	if (sortBy === "created_at") {
		orderBy.createdAt = "desc";
	}

	if (sortBy === "views") {
		orderBy.views = "desc";
	}

	if (queryParams?.handle) {
		where.handle = queryParams.handle;
	}

	if (queryParams?.type) {
		where.type = {
			in: Array.isArray(queryParams.type)
				? queryParams.type
				: [queryParams.type],
		};
	}

	if (queryParams?.q) {
		where.OR = [
			{
				title: {
					contains: queryParams.q,
					mode: "insensitive",
				},
			},
			{
				description: {
					contains: queryParams.q,
					mode: "insensitive",
				},
			},
		];
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
			data: posts,
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

	await revalidatePosts();

	return post;
};

export const updatePost = async (handle: string, data: any) => {
	const post = await prisma.blogPost.update({
		where: { handle },
		data,
	});
	await revalidatePosts();

	return post;
};

export const deletePost = async (handle: string) => {
	const res = prisma.blogPost.delete({
		where: { handle },
	});
	await revalidatePosts();
	return res;
};

export const revalidatePosts = async () => {
	revalidatePath("/(blog)/blog", "page");
	revalidatePath("/(blog)/blog/post/[handle]", "page");
	revalidatePath("/(blog)/document/[handle]", "page");
	revalidatePath("/(blog)/info/[handle]", "page");
};
