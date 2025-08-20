import { NextResponse } from "next/server";
import { createCategory } from "@lib/data/categories";
import prisma from "@lib/prisma";

// GET /api/admin/categories - List all categories
export async function GET() {
	try {
		const categories = await prisma.category.findMany({
			include: {
				children: true,
				parent: true,
				products: true,
			},
		});

		return NextResponse.json({ categories });
	} catch (error) {
		console.error("Error fetching categories:", error);
		return NextResponse.json(
			{ error: "Failed to fetch categories" },
			{ status: 500 },
		);
	}
}

// POST /api/admin/categories - Create a new category
export async function POST(request: Request) {
	try {
		const data = await request.json();

		// Remove icon field if present and map status to active
		const { icon, status, ...categoryData } = data;

		// Map status to active field
		if (status !== undefined) {
			categoryData.active = status === "active" || status === true;
		}

		// Generate handle if not provided
		if (!categoryData.handle) {
			categoryData.handle = categoryData.name
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/^-+|-+$/g, "");
		}

		const category = await createCategory(categoryData);

		return NextResponse.json({ category });
	} catch (error) {
		console.error("Error creating category:", error);
		return NextResponse.json(
			{ error: "Failed to create category" },
			{ status: 500 },
		);
	}
}
