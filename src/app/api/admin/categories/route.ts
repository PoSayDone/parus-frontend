import { NextResponse } from "next/server";
import {
	listCategories,
	createCategory,
	updateCategory,
	deleteCategory,
} from "@lib/data/categories";
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

		// Generate handle if not provided
		if (!data.handle) {
			data.handle = data.name
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/^-+|-+$/g, "");
		}

		const category = await createCategory(data);

		return NextResponse.json({ category });
	} catch (error) {
		console.error("Error creating category:", error);
		return NextResponse.json(
			{ error: "Failed to create category" },
			{ status: 500 },
		);
	}
}
