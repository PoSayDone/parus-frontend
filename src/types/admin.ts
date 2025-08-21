// Admin types that align with Prisma schema
import type {
	Product as PrismaProduct,
	Category as PrismaCategory,
	BlogPost as PrismaBlogPost,
	User as PrismaUser,
} from "@prisma/client";

// Convert Prisma Date types to string for API responses
// Convert Prisma string status to boolean active field to match Category model
export interface Product
	extends Omit<PrismaProduct, "createdAt" | "updatedAt" | "status"> {
	createdAt: string;
	updatedAt: string;
	active: boolean;
	categories: {
		id: string;
		name: string;
	}[];
}

export interface Category
	extends Omit<PrismaCategory, "createdAt" | "updatedAt"> {
	createdAt: string;
	updatedAt: string;
	parent: Category | null;
	children: Category[];
	products: Product[];
}

export interface BlogPost
	extends Omit<PrismaBlogPost, "createdAt" | "updatedAt"> {
	createdAt: string;
	updatedAt: string;
}

export interface User
	extends Omit<PrismaUser, "createdAt" | "updatedAt"> {
	createdAt: string;
	updatedAt: string;
}

export interface AdminStats {
	totalProducts: number;
	totalCategories: number;
	totalBlogPosts: number;
	publishedPosts: number;
	draftPosts: number;
	totalViews: number;
}
