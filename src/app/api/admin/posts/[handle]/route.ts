import { NextResponse } from "next/server";
import { updatePost, deletePost, getPostByHandle } from "@lib/data/blog";

// GET /api/admin/posts/[handle] - Get a single post
export async function GET(
  request: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;
    const post = await getPostByHandle(handle);
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    
    // Convert field names to match the TypeScript type
    const formattedPost = {
      ...post,
      created_at: post.created_at.toISOString(),
      updated_at: post.updated_at.toISOString()
    };
    
    return NextResponse.json({ post: formattedPost });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

// PUT /api/admin/posts/[handle] - Update a post
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;
    const data = await request.json();
    
    // Convert field names
    const prismaData = {
      ...data,
      updated_at: new Date()
    };
    
    const post = await updatePost(handle, prismaData);
    
    // Convert back to match the TypeScript type
    const formattedPost = {
      ...post,
      created_at: post.created_at.toISOString(),
      updated_at: post.updated_at.toISOString()
    };
    
    return NextResponse.json({ post: formattedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// DELETE /api/admin/posts/[handle] - Delete a post
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;
    await deletePost(handle);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}