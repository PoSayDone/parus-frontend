"use server";

import prisma from "@/lib/prisma";

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