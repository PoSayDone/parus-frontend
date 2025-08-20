import { NextResponse } from "next/server";
import { updateProduct, deleteProduct, getProductByHandle } from "@lib/data/products";

// GET /api/admin/products/[handle] - Get a single product
export async function GET(
  request: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;
    const product = await getProductByHandle(handle);
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// PUT /api/admin/products/[handle] - Update a product
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;
    const data = await request.json();
    
    // Handle categories relationship properly
    const { categories, categoryHandles, ...productData } = data;
    
    // Convert price to float if it's a string
    if (typeof productData.price === 'string') {
      productData.price = parseFloat(productData.price);
    }
    
    // Handle categories if provided
    let categoryConnectData = undefined;
    if (categoryHandles && Array.isArray(categoryHandles)) {
      categoryConnectData = {
        set: categoryHandles.map((handle: string) => ({ handle }))
      };
    } else if (categories && Array.isArray(categories)) {
      categoryConnectData = {
        set: categories.map((handle: string) => ({ handle }))
      };
    }
    
    const product = await updateProduct(handle, {
      ...productData,
      categories: categoryConnectData
    });
    
    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE /api/admin/products/[handle] - Delete a product
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;
    await deleteProduct(handle);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}