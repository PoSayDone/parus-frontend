import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/data/auth";

// GET /api/admin/users - List all users
export async function GET() {
	try {
		const users = await prisma.user.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});

		return NextResponse.json({ users });
	} catch (error) {
		console.error("Error fetching users:", error);
		return NextResponse.json(
			{ error: "Failed to fetch users" },
			{ status: 500 },
		);
	}
}

// POST /api/admin/users - Create a new user
export async function POST(request: Request) {
	try {
		const data = await request.json();

		// Validate that password is provided for new users
		if (!data.password || data.password === "") {
			return NextResponse.json(
				{ error: "Password is required for new users" },
				{ status: 400 },
			);
		}

		// Check if user with this email already exists
		const existingUser = await prisma.user.findUnique({
			where: { email: data.email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ error: "User with this email already exists" },
				{ status: 400 },
			);
		}

		// Hash the password
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

		return NextResponse.json({ user: userWithoutPassword });
	} catch (error) {
		console.error("Error creating user:", error);
		return NextResponse.json(
			{ error: "Failed to create user" },
			{ status: 500 },
		);
	}
}
