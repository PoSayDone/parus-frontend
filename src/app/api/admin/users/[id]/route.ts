import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = Promise<{ id: string }>;

// GET /api/admin/users/[id] - Get a single user by ID
export async function GET(_request: Request, { params }: { params: Params }) {
	try {
		const { id } = await params;
		const user = await prisma.user.findUnique({
			where: { id },
		});

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		// Remove password from response
		const { password, ...userWithoutPassword } = user;

		return NextResponse.json({ user: userWithoutPassword });
	} catch (error) {
		console.error("Error fetching user:", error);
		return NextResponse.json(
			{ error: "Failed to fetch user" },
			{ status: 500 },
		);
	}
}

// DELETE /api/admin/users/[id] - Delete a user
export async function DELETE(
	_request: Request,
	{ params }: { params: Params },
) {
	try {
		const { id } = await params;

		// Prevent deleting the last admin user
		const userToDelete = await prisma.user.findUnique({
			where: { id },
		});

		if (!userToDelete) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 },
			);
		}

		// Check if this is the last admin
		if (userToDelete.role === "admin") {
			const adminCount = await prisma.user.count({
				where: { role: "admin" },
			});

			if (adminCount <= 1) {
				return NextResponse.json(
					{ error: "Cannot delete the last administrator" },
					{ status: 400 },
				);
			}
		}

		await prisma.user.delete({
			where: { id },
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error deleting user:", error);
		return NextResponse.json(
			{ error: "Failed to delete user" },
			{ status: 500 },
		);
	}
}

// PATCH /api/admin/users/[id] - Update a user
export async function PATCH(request: Request, { params }: { params: Params }) {
	try {
		const { id } = await params;
		const data = await request.json();

		// Prevent removing admin role from the last admin
		if (data.role === "user") {
			const userToUpdate = await prisma.user.findUnique({
				where: { id },
			});

			if (userToUpdate?.role === "admin") {
				const adminCount = await prisma.user.count({
					where: { role: "admin" },
				});

				if (adminCount <= 1) {
					return NextResponse.json(
						{
							error: "Cannot remove admin role from the last administrator",
						},
						{ status: 400 },
					);
				}
			}
		}

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

		return NextResponse.json({ user: userWithoutPassword });
	} catch (error) {
		console.error("Error updating user:", error);
		return NextResponse.json(
			{ error: "Failed to update user" },
			{ status: 500 },
		);
	}
}