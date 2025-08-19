import { NextResponse } from "next/server";
import { getAllPosts, createPost, updatePost, deletePost } from "@lib/data/blog";
import prisma from "@lib/prisma";

// GET /api/admin/posts - List all posts
export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany();
    
    // Convert field names to match the TypeScript type
    const formattedPosts = posts.map(post => ({
      ...post,
      created_at: post.created_at.toISOString(),
      updated_at: post.updated_at.toISOString()
    }));
    
    return NextResponse.json({ posts: formattedPosts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// POST /api/admin/posts - Create a new post
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Generate handle if not provided
    if (!data.handle) {
      data.handle = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
    
    // Convert field names
    const prismaData = {
      ...data,
      created_at: data.created_at ? new Date(data.created_at) : new Date(),
      updated_at: new Date()
    };
    
    const post = await createPost(prismaData);
    
    // Convert back to match the TypeScript type
    const formattedPost = {
      ...post,
      created_at: post.created_at.toISOString(),
      updated_at: post.updated_at.toISOString()
    };
    
    return NextResponse.json({ post: formattedPost });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}