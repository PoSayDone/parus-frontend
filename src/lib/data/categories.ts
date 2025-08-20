"use server";

import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";
import _ from "lodash";

type Props = {
	page?: number;
	queryParams?: {
		limit?: number;
		offset?: number;
		[key: string]: unknown;
	};
};

export const listCategories = async ({ page = 1, queryParams }: Props) => {
	const limit = queryParams?.limit || 100;
	const _pageParam = Math.max(page, 1);
	const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

	const where: Prisma.CategoryWhereInput = {};

	const [categories, count] = await Promise.all([
		prisma.category.findMany({
			where: _.isEmpty(where) ? { active: true } : where,
			skip: offset,
			take: limit,
			select: {
				id: true,
				name: true,
				handle: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		}),

		prisma.category.count({ where }),
	]);

	const nextPage = count > offset + limit ? page + 1 : null;

	return {
		response: {
			categories,
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
	return prisma.category.create({
		data,
	});
};

export const updateCategory = async (handle: string, data: any) => {
	return prisma.category.update({
		where: { handle },
		data,
	});
};

export const deleteCategory = async (handle: string) => {
	return prisma.category.delete({
		where: { handle },
	});
};
