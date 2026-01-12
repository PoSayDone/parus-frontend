"use server";

import prisma from "@lib/prisma";
import type { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import type { ContactRequest } from "@/types/admin";

type Props = {
	page?: number;
	queryParams?: {
		limit?: number;
		q?: string;
		status?: "processed" | "unprocessed";
		[key: string]: unknown;
	};
};

export type ContactRequestInput = {
	name: string;
	phone: string;
	email?: string;
	service?: string;
	plan?: string;
	message?: string;
};

export const listContactRequests = async ({ page = 1, queryParams }: Props) => {
	const limit = queryParams?.limit || 10;
	const _pageParam = Math.max(page, 1);
	const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

	const where: Prisma.ContactRequestWhereInput = {};

	if (queryParams?.q) {
		where.OR = [
			{
				name: {
					contains: queryParams.q,
					mode: "insensitive",
				},
			},
			{
				phone: {
					contains: queryParams.q,
					mode: "insensitive",
				},
			},
			{
				email: {
					contains: queryParams.q,
					mode: "insensitive",
				},
			},
			{
				service: {
					contains: queryParams.q,
					mode: "insensitive",
				},
			},
			{
				plan: {
					contains: queryParams.q,
					mode: "insensitive",
				},
			},
			{
				message: {
					contains: queryParams.q,
					mode: "insensitive",
				},
			},
		];
	}

	if (queryParams?.status === "unprocessed") {
		where.processed = false;
	}

	if (queryParams?.status === "processed") {
		where.processed = true;
	}

	const [requests, count] = await Promise.all([
		prisma.contactRequest.findMany({
			where,
			skip: offset,
			take: limit,
			orderBy: {
				createdAt: "desc",
			},
		}),
		prisma.contactRequest.count({ where }),
	]);

	const nextPage = count > offset + limit ? page + 1 : null;

	return {
		response: {
			data: requests,
			count,
		},
		nextPage,
		queryParams,
	};
};

export const createContactRequest = async (
	data: ContactRequestInput,
): Promise<ContactRequest> => {
	const request = await prisma.contactRequest.create({
		data: {
			name: data.name,
			phone: data.phone,
			email: data.email || null,
			service: data.service || null,
			plan: data.plan || null,
			message: data.message || null,
			processed: false,
		},
	});

	revalidatePath("/admin/requests", "page");
	return request;
};

export const getContactRequest = async (
	id: string,
): Promise<ContactRequest | null> => {
	if (!id) {
		return null;
	}

	return prisma.contactRequest.findUnique({
		where: { id },
	});
};

export const updateContactRequest = async (
	id: string,
	data: Partial<Pick<ContactRequest, "processed" | "processedAt">>,
): Promise<ContactRequest> => {
	const request = await prisma.contactRequest.update({
		where: { id },
		data,
	});

	revalidatePath("/admin/requests", "page");
	revalidatePath(`/admin/requests/${id}`, "page");
	return request;
};

export const deleteContactRequest = async (id: string): Promise<void> => {
	await prisma.contactRequest.delete({
		where: { id },
	});

	revalidatePath("/admin/requests", "page");
};
