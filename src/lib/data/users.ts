"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getUserById(id: string) {
	try {
		const user = await prisma.user.findUnique({
			where: { id },
		});

		if (!user) {
			return null;
		}

		// Remove password from response
		const { password, ...userWithoutPassword } = user;

		return userWithoutPassword;
	} catch (error) {
		console.error("Error fetching user:", error);
		return null;
	}
}

export async function listUsers({
	page = 1,
	queryParams,
}: {
	page?: number;
	queryParams?: {
		limit?: number;
		q?: string;
		[key: string]: any;
	};
}) {
	const limit = queryParams?.limit || 10;
	const _pageParam = Math.max(page, 1);
	const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

	const where: Prisma.UserWhereInput = {};

	if (queryParams?.q) {
		where.OR = [
			{
				name: {
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
		];
	}

	const [users, count] = await Promise.all([
		prisma.user.findMany({
			where,
			skip: offset,
			take: limit,
			orderBy: {
				createdAt: "desc",
			},
		}),
		prisma.user.count({ where }),
	]);

	// Remove passwords from response
	const usersWithoutPasswords = users.map(({ password, ...user }) => user);

	const nextPage = count > offset + limit ? page + 1 : null;

	return {
		response: {
			data: usersWithoutPasswords,
			count,
		},
		nextPage: nextPage,
		queryParams,
	};
}

export async function createUser(data: any) {
	try {
		// Hash the password
		const { hashPassword } = await import("@/lib/data/auth");
		const hashedPassword = await hashPassword(data.password);

		const user = await prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: hashedPassword,
				role: data.role || "user",
			},
		});

		// Remove password from response
		const { password, ...userWithoutPassword } = user;

		return { user: userWithoutPassword };
	} catch (error: any) {
		console.error("Error creating user:", error);
		throw new Error(error.message || "Failed to create user");
	}
}

export async function updateUser(id: string, data: any) {
	try {
		// If password is being updated, hash it
		// Only update password if it's provided
		if (data.password && data.password !== "") {
			const { hashPassword } = await import("@/lib/data/auth");
			data.password = await hashPassword(data.password);
		} else {
			// Remove password from data if it's not provided
			delete data.password;
		}

		const user = await prisma.user.update({
			where: { id },
			data: {
				name: data.name,
				email: data.email,
				role: data.role,
				...(data.password && { password: data.password }),
			},
		});

		// Remove password from response
		const { password, ...userWithoutPassword } = user;

		return { user: userWithoutPassword };
	} catch (error: any) {
		console.error("Error updating user:", error);
		throw new Error(error.message || "Failed to update user");
	}
}

export async function deleteUser(id: string) {
	try {
		// Prevent deleting the last admin user
		const userToDelete = await prisma.user.findUnique({
			where: { id },
		});

		if (!userToDelete) {
			throw new Error("User not found");
		}

		// Check if this is the last admin
		if (userToDelete.role === "admin") {
			const adminCount = await prisma.user.count({
				where: { role: "admin" },
			});

			if (adminCount <= 1) {
				throw new Error("Cannot delete the last administrator");
			}
		}

		await prisma.user.delete({
			where: { id },
		});

		return { success: true };
	} catch (error: any) {
		console.error("Error deleting user:", error);
		throw new Error(error.message || "Failed to delete user");
	}
}
