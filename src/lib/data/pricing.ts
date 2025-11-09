"use server";

import prisma from "@lib/prisma";
import type { Prisma } from "@prisma/client";
import type { PricePlan } from "@/types/admin";

type Props = {
	page?: number;
	queryParams?: {
		limit?: number;
		q?: string;
		includeInactive?: boolean;
		[key: string]: unknown;
	};
};

export const listPricePlans = async ({ page = 1, queryParams }: Props) => {
	const limit = queryParams?.limit || 10;
	const _pageParam = Math.max(page, 1);
	const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

	const where: Prisma.PricePlanWhereInput = {};

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

	const [pricePlans, count] = await Promise.all([
		prisma.pricePlan.findMany({
			where,
			skip: offset,
			take: limit,
			orderBy: {
				createdAt: "desc",
			},
		}),
		prisma.pricePlan.count({ where }),
	]);

	const nextPage = count > offset + limit ? page + 1 : null;

	return {
		response: {
			data: pricePlans,
			count,
		},
		nextPage: nextPage,
		queryParams,
	};
};

export const getPricePlan = async (id: string): Promise<PricePlan | null> => {
	const pricePlan = await prisma.pricePlan.findUnique({
		where: { id },
	});

	if (!pricePlan) return null;

	return pricePlan;
};

export const createPricePlan = async (
	data: Omit<PricePlan, "id" | "createdAt" | "updatedAt">,
): Promise<PricePlan> => {
	const pricePlan = await prisma.pricePlan.create({
		data: {
			...data,
		},
	});

	return pricePlan;
};

export const updatePricePlan = async (
	id: string,
	data: Partial<Omit<PricePlan, "id" | "createdAt" | "updatedAt">>,
): Promise<PricePlan> => {
	const pricePlan = await prisma.pricePlan.update({
		where: { id },
		data,
	});

	return pricePlan;
};

export const deletePricePlan = async (id: string): Promise<void> => {
	await prisma.pricePlan.delete({
		where: { id },
	});
};
