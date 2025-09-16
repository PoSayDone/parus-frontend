"use server";

import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";
import _ from "lodash";
import { revalidatePath } from "next/cache";

type Props = {
	page?: number;
	queryParams?: {
		limit?: number;
		q?: string;
		[key: string]: unknown;
	};
};

export const listCategories = async ({ page = 1, queryParams }: Props) => {
	const limit = queryParams?.limit || 10;
	const _pageParam = Math.max(page, 1);
	const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

	const where: Prisma.CategoryWhereInput = {};

	if (queryParams?.q) {
		where.OR = [
			{
				name: {
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

	const [categories, count] = await Promise.all([
		prisma.category.findMany({
			where,
			skip: offset,
			take: limit,
			include: {
				products: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		}),
		prisma.category.count({ where }),
	]);

	// Transform categories to match the expected format
	const transformedCategories = categories.map((category) => ({
		id: category.id,
		name: category.name,
		handle: category.handle,
		description: category.description,
		thumbnail: category.thumbnail,
		status: category.active ? "active" : "inactive",
		productCount: category.products?.length || 0,
		createdAt: category.createdAt,
		updatedAt: category.updatedAt,
	}));

	const nextPage = count > offset + limit ? page + 1 : null;

	return {
		response: {
			data: transformedCategories,
			count,
		},
		nextPage: nextPage,
		queryParams,
	};
};

export const getCategoryByHandle = async (categoryHandle: string) => {
	const category = prisma.category.findUnique({
		where: { handle: categoryHandle },
		include: {
			children: true,
			parent: true,
			products: true,
		},
	});
	return category;
};

export const createCategory = async (data: any) => {
	const category = await prisma.category.create({
		data,
	});

	await revalidateCategories();
	return category;
};

export const updateCategory = async (handle: string, data: any) => {
	const category = await prisma.category.update({
		where: { handle },
		data,
	});

	await revalidateCategories();
	return category;
};

export const deleteCategory = async (handle: string) => {
	const category = await prisma.category.delete({
		where: { handle },
	});

	await revalidateCategories();
	return category;
};

export const revalidateCategories = async () => {
	revalidatePath("/(commerce)/(store)/categories/[...category]", "page");
	revalidatePath("/(commerce)/(store)/store", "page");
	revalidatePath("/(commerce)/products/[handle]", "page");
};
