import { NextResponse } from "next/server";
import { updateCategory, deleteCategory } from "@lib/data/categories";
import { getCategoryByHandle } from "@lib/data/categories";

// GET /api/admin/categories/[handle] - Get a single category
export async function GET(
  request: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;
    const category = await getCategoryByHandle(handle);
    
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    
    return NextResponse.json({ category });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
  }
}

// PUT /api/admin/categories/[handle] - Update a category
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;
    const data = await request.json();
    
    const category = await updateCategory(handle, data);
    
    return NextResponse.json({ category });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

// DELETE /api/admin/categories/[handle] - Delete a category
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;
    await deleteCategory(handle);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}