import { NextResponse } from "next/server";
import { listProducts, createProduct, updateProduct, deleteProduct, getProductByHandle } from "@lib/data/products";
import prisma from "@lib/prisma";

// GET /api/admin/products - List all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        categories: true,
      }
    });
    
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST /api/admin/products - Create a new product
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
    
    // Set default price if not provided
    if (data.price === undefined) {
      data.price = 0;
    }
    
    const product = await createProduct(data);
    
    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}