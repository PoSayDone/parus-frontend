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

	const transformedServices = services.map((service) => ({
		id: service.id,
		title: service.title,
		shortDescription: service.shortDescription || "",
		description: service.description,
		icon: service.icon || "",
		image: service.image || "",
		price: service.price,
		duration: service.duration || "",
		features: service.features,
		included: service.included,
		gallery: service.gallery,
		active: service.active,
		createdAt: service.createdAt.toISOString(),
		updatedAt: service.updatedAt.toISOString(),
	}));

	const nextPage = count > offset + limit ? page + 1 : null;

	return {
		response: {
			data: transformedServices,
			count,
		},
		nextPage: nextPage,
		queryParams,
	};
};

export const getService = async (id: string): Promise<Service | null> => {
	const service = await prisma.service.findUnique({
		where: { id },
	});

	if (!service) return null;

	return {
		id: service.id,
		title: service.title,
		shortDescription: service.shortDescription || "",
		description: service.description,
		icon: service.icon || "",
		image: service.image || "",
		thumbnail: service.thumbnail || "",
		images: service.images,
		price: service.price,
		duration: service.duration || "",
		features: service.features,
		included: service.included,
		gallery: service.gallery,
		active: service.active,
		createdAt: service.createdAt.toISOString(),
		updatedAt: service.updatedAt.toISOString(),
	};
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

	return {
		id: service.id,
		title: service.title,
		shortDescription: service.shortDescription || "",
		description: service.description,
		icon: service.icon || "",
		image: service.image || "",
		thumbnail: service.thumbnail || "",
		images: service.images,
		price: service.price,
		duration: service.duration || "",
		features: service.features,
		included: service.included,
		gallery: service.gallery,
		active: service.active,
		createdAt: service.createdAt.toISOString(),
		updatedAt: service.updatedAt.toISOString(),
	};
};

export const updateService = async (
	id: string,
	data: Partial<Omit<Service, "id" | "createdAt" | "updatedAt">>,
): Promise<Service> => {
	const service = await prisma.service.update({
		where: { id },
		data,
	});

	return {
		id: service.id,
		title: service.title,
		shortDescription: service.shortDescription || "",
		description: service.description,
		icon: service.icon || "",
		image: service.image || "",
		thumbnail: service.thumbnail || "",
		images: service.images,
		price: service.price,
		duration: service.duration || "",
		features: service.features,
		included: service.included,
		gallery: service.gallery,
		active: service.active,
		createdAt: service.createdAt.toISOString(),
		updatedAt: service.updatedAt.toISOString(),
	};
};

export const deleteService = async (id: string): Promise<void> => {
	await prisma.service.delete({
		where: { id },
	});
};
