"use server";

import prisma from "@lib/prisma";
import type { Prisma } from "@prisma/client";
import type { Address } from "@/types/admin";

type Props = {
	page?: number;
	queryParams?: {
		limit?: number;
		q?: string;
		type?: string;
		includeInactive?: boolean;
		[key: string]: unknown;
	};
};

export const listAddresses = async ({ page = 1, queryParams }: Props) => {
	const limit = queryParams?.limit || 10;
	const _pageParam = Math.max(page, 1);
	const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

	const where: Prisma.AddressWhereInput = {};

	if (queryParams?.q) {
		where.OR = [
			{
				name: {
					contains: queryParams.q,
					mode: "insensitive",
				},
			},
			{
				address: {
					contains: queryParams.q,
					mode: "insensitive",
				},
			},
		];
	}

	if (queryParams?.type) {
		where.type = queryParams.type;
	}

	if (!queryParams?.includeInactive) {
		where.active = true;
	}

	const [addresses, count] = await Promise.all([
		prisma.address.findMany({
			where,
			skip: offset,
			take: limit,
			orderBy: {
				createdAt: "desc",
			},
		}),
		prisma.address.count({ where }),
	]);

	const nextPage = count > offset + limit ? page + 1 : null;

	return {
		response: {
			data: addresses,
			count,
		},
		nextPage: nextPage,
		queryParams,
	};
};

export const getAddress = async (id: string): Promise<Address | null> => {
	const address = await prisma.address.findUnique({
		where: { id },
	});

	if (!address) return null;

	return address;
};

export const createAddress = async (
	data: Omit<Address, "id" | "createdAt" | "updatedAt">,
): Promise<Address> => {
	const address = await prisma.address.create({
		data: {
			...data,
		},
	});

	return address;
};

export const updateAddress = async (
	id: string,
	data: Partial<Omit<Address, "id" | "createdAt" | "updatedAt">>,
): Promise<Address> => {
	const address = await prisma.address.update({
		where: { id },
		data,
	});

	return address;
};

export const deleteAddress = async (id: string): Promise<void> => {
	await prisma.address.delete({
		where: { id },
	});
};
