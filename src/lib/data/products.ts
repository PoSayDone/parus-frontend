"use server";

import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import { Product } from "@/types/admin";

export const listProducts = async ({
	page = 1,
	queryParams,
	sortBy = "created_at",
}: {
	page?: number;
	queryParams?: {
		handle?: string;
		limit?: number;
		offset?: number;
		category_id?: string;
		q?: string;
		[key: string]: any;
	};
	sortBy?: SortOptions;
}): Promise<{
	response: { products: Product[]; count: number };
	nextPage: number | null;
	queryParams?: any;
}> => {
	const limit = queryParams?.limit || 12;
	const _pageParam = Math.max(page, 1);
	const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

	const where: Prisma.ProductWhereInput = { active: true };
	const orderBy: Prisma.ProductOrderByWithAggregationInput = {};

	if (["price_asc", "price_desc"].includes(sortBy)) {
		orderBy.price = sortBy === "price_asc" ? "asc" : "desc";
	}

	if (sortBy === "created_at") {
		orderBy.createdAt = "desc";
	}

	if (queryParams?.handle) {
		where.categories = {
			some: {
				id: queryParams.handle,
			},
		};
	}

	if (queryParams?.category_id) {
		where.categories = {
			some: {
				id: queryParams.category_id,
			},
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

	const [products, count] = await Promise.all([
		prisma.product.findMany({
			where,
			skip: offset,
			take: limit,
			include: {
				categories: true,
			},
			orderBy: orderBy ?? [{ createdAt: "desc" }],
		}),
		prisma.product.count({ where }),
	]);

	const nextPage = count > offset + limit ? page + 1 : null;

	return {
		response: {
			products,
			count,
		},
		nextPage: nextPage,
		queryParams,
	};
};

export const getProductByHandle = async (handle: string) => {
	return prisma.product.findUnique({
		where: { handle },
		include: {
			categories: true,
		},
	});
};

export const createProduct = async (data: any) => {
	// Handle categories relationship properly
	const { categories, images, ...productData } = data;

	// Convert price to float if it's a string
	if (typeof productData.price === "string") {
		productData.price = parseFloat(productData.price);
	}

	// Handle categories if provided
	let categoryConnectData = undefined;
	if (categories && Array.isArray(categories) && categories.length > 0) {
		// Check if categories contains objects with handles or just strings
		if (typeof categories[0] === "string") {
			categoryConnectData = {
				connect: categories.map((handle: string) => ({ handle })),
			};
		} else if (categories[0].handle) {
			categoryConnectData = {
				connect: categories.map((cat: { handle: string }) => ({
					handle: cat.handle,
				})),
			};
		}
	}

	return prisma.product.create({
		data: {
			...productData,
			categories: categoryConnectData,
			images: images || [],
			tags: productData.tags || [],
		},
	});
};

export const updateProduct = async (handle: string, data: any) => {
	// Handle categories relationship properly
	const { categories, images, ...productData } = data;

	// Convert price to float if it's a string
	if (typeof productData.price === "string") {
		productData.price = parseFloat(productData.price);
	}

	// Handle categories if provided
	let categoryConnectData = undefined;
	if (categories && Array.isArray(categories) && categories.length > 0) {
		// Check if categories contains objects with handles or just strings
		if (typeof categories[0] === "string") {
			categoryConnectData = {
				set: categories.map((handle: string) => ({ handle })),
			};
		} else if (categories[0].handle) {
			categoryConnectData = {
				set: categories.map((cat: { handle: string }) => ({
					handle: cat.handle,
				})),
			};
		}
	} else if (
		categories &&
		Array.isArray(categories) &&
		categories.length === 0
	) {
		categoryConnectData = {
			set: [],
		};
	}

	return prisma.product.update({
		where: { handle },
		data: {
			...productData,
			categories: categoryConnectData,
			images: images || productData.images || [],
		},
	});
};

export const deleteProduct = async (handle: string) => {
	return prisma.product.delete({
		where: { handle },
	});
};
