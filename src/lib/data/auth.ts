"use server";

import prisma from "@lib/prisma";
import bcrypt from "bcryptjs";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionOptions, type User } from "@/lib/session";

export async function signIn({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	try {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return { error: "Invalid credentials" };
		}

		const isValid = await bcrypt.compare(password, user.password);

		if (!isValid) {
			return { error: "Invalid credentials" };
		}

		const session = await getIronSession<{ user?: User }>(
			await cookies(),
			sessionOptions,
		);
		session.user = {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role as "admin" | "user",
		};
		await session.save();

		return { success: true };
	} catch (error) {
		console.error("Sign in error:", error);
		return { error: "An error occurred during sign in" };
	}
}

export async function signOut() {
	const session = await getIronSession<{ user?: User }>(
		await cookies(),
		sessionOptions,
	);
	session.destroy();
	redirect("/admin/sign-in");
}

export async function getUser() {
	const session = await getIronSession<{ user?: User }>(
		await cookies(),
		sessionOptions,
	);
	return session.user;
}

export async function hashPassword(password: string): Promise<string> {
	const saltRounds = 10;
	return await bcrypt.hash(password, saltRounds);
}
