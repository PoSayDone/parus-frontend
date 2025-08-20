"use server";

import prisma from "@lib/prisma";

export const listCategories = async (query?: Record<string, any>) => {
	const limit = query?.limit || 100;

	return prisma.category.findMany({
		where: query?.where,
		take: limit,
		select: {
			id: true,
			name: true,
			handle: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
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
