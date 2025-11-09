"use server";

import prisma from "@lib/prisma";
import type { Prisma } from "@prisma/client";
import type { Service } from "@/types/admin";

type Props = {
	page?: number;
	queryParams?: {
		limit?: number;
		q?: string;
		[key: string]: unknown;
	};
};

export const listServices = async ({ page = 1, queryParams }: Props) => {
	const limit = queryParams?.limit || 10;
	const _pageParam = Math.max(page, 1);
	const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

	const where: Prisma.ServiceWhereInput = {};

	if (queryParams?.q) {
		where.OR = [
			{
				title: {
					contains: queryParams.q,
					mode: "insensitive",
				},
			},
			{
				shortDescription: {
					contains: queryParams.q,
					mode: "insensitive",
				},
			},
		];
	}

	const [services, count] = await Promise.all([
		prisma.service.findMany({
			where,
			skip: offset,
			take: limit,
			orderBy: {
				createdAt: "desc",
			},
		}),
		prisma.service.count({ where }),
	]);

	const nextPage = count > offset + limit ? page + 1 : null;

	return {
		response: {
			data: services,
			count,
		},
		nextPage: nextPage,
		queryParams,
	};
};

export const getService = async (handle: string): Promise<Service | null> => {
	const service = await prisma.service.findUnique({
		where: { handle },
	});

	if (!service) return null;

	return service;
};

export const createService = async (
	data: Omit<Service, "id" | "createdAt" | "updatedAt">,
): Promise<Service> => {
	const service = await prisma.service.create({
		data: {
			...data,
			thumbnail: data.thumbnail,
			images: data.images || [],
		},
	});

	return service;
};

export const updateService = async (
	handle: string,
	data: Partial<Omit<Service, "id" | "createdAt" | "updatedAt">>,
): Promise<Service> => {
	const service = await prisma.service.update({
		where: { handle },
		data,
	});

	return service;
};

export const deleteService = async (id: string): Promise<void> => {
	await prisma.service.delete({
		where: { id },
	});
};
