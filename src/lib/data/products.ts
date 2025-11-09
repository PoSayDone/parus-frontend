"use server";

import prisma from "@lib/prisma";
import type { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import type { Prisma } from "@prisma/client";
import type { Product } from "@/types/admin";
import { revalidateCategories } from "./categories";

export const listProducts = async ({
	page = 1,
	queryParams,
	sortBy = "created_at",
}: {
	page?: number;
	queryParams?: {
		limit?: number;
		includeInactive?: boolean;
		category_id?: string;
		handle?: string;
		q?: string;
		[key: string]: any;
	};
	sortBy?: SortOptions;
}): Promise<{
	response: { data: Product[]; count: number };
	nextPage: number | null;
	queryParams?: any;
}> => {
	const limit = queryParams?.limit || 12;
	const _pageParam = Math.max(page, 1);
	const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

	const where: Prisma.ProductWhereInput = {};
	const orderBy: Prisma.ProductOrderByWithAggregationInput = {};

	if (["price_asc", "price_desc"].includes(sortBy)) {
		orderBy.price = sortBy === "price_asc" ? "asc" : "desc";
	}

	if (sortBy === "created_at") {
		orderBy.createdAt = "desc";
	}

	if (queryParams?.category_id) {
		where.categories = {
			some: {
				id: queryParams.category_id,
			},
		};
	}

	if (queryParams?.handle) {
		where.handle = queryParams.handle;
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

	if (!queryParams?.includeInactive) {
		where.active = true;
	}

	const [products, count] = await Promise.all([
		prisma.product.findMany({
			where,
			skip: offset,
			take: limit,
			include: {
				categories: true,
				characteristics: true,
			},
			orderBy: orderBy ?? [{ createdAt: "desc" }],
		}),
		prisma.product.count({ where }),
	]);

	const nextPage = count > offset + limit ? page + 1 : null;

	return {
		response: {
			data: products,
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
			characteristics: true,
		},
	});
};

export const createProduct = async (data: any) => {
	// Handle categories relationship properly
	const { categories, images, characteristics, ...productData } = data;

	// Convert price to float if it's a string
	if (typeof productData.price === "string") {
		productData.price = parseFloat(productData.price);
	}

	// Handle categories if provided
	let categoryConnectData;
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

	// Handle characteristics if provided
	let characteristicsData;
	if (
		characteristics &&
		Array.isArray(characteristics) &&
		characteristics.length > 0
	) {
		characteristicsData = {
			create: characteristics.map(
				(char: { key: string; value: string }) => ({
					key: char.key,
					value: char.value,
				}),
			),
		};
	}

	const product = await prisma.product.create({
		data: {
			...productData,
			categories: categoryConnectData,
			characteristics: characteristicsData,
			images: images || [],
			tags: productData.tags || [],
		},
	});

	await revalidateCategories();
	return product;
};

export const updateProduct = async (handle: string, data: any) => {
	// Handle categories relationship properly
	const { categories, images, characteristics, ...productData } = data;

	// Convert price to float if it's a string
	if (typeof productData.price === "string") {
		productData.price = parseFloat(productData.price);
	}

	// Handle categories if provided
	let categoryConnectData;
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

	// Handle characteristics if provided
	let characteristicsData;
	if (characteristics && Array.isArray(characteristics)) {
		// Delete existing characteristics and create new ones
		characteristicsData = {
			deleteMany: {},
			create: characteristics.map(
				(char: { key: string; value: string }) => ({
					key: char.key,
					value: char.value,
				}),
			),
		};
	}

	const product = await prisma.product.update({
		where: { handle },
		data: {
			...productData,
			categories: categoryConnectData,
			characteristics: characteristicsData,
			images: images || productData.images || [],
		},
	});

	await revalidateCategories();
	return product;
};

export const deleteProduct = async (handle: string) => {
	const product = await prisma.product.delete({
		where: { handle },
	});

	await revalidateCategories();
	return product;
};
