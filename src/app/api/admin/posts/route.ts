import { NextResponse } from "next/server";
import { createPost } from "@lib/data/blog";
import prisma from "@lib/prisma";
import slugify from "sluga";

export async function GET() {
	try {
		const posts = await prisma.blogPost.findMany();
		return NextResponse.json({ posts });
	} catch (error) {
		console.error("Error fetching posts:", error);
		return NextResponse.json(
			{ error: "Failed to fetch posts" },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	try {
		const data = await request.json();

		if (!data.handle) {
			data.handle = slugify(data.title);
		}

		const post = await createPost(data);

		return NextResponse.json({ post: post });
	} catch (error) {
		console.error("Error creating post:", error);
		return NextResponse.json(
			{ error: "Failed to create post" },
			{ status: 500 },
		);
	}
}
