// Admin types that align with Prisma schema
import type {
	Address as PrismaAddress,
	BlogPost as PrismaBlogPost,
	Category as PrismaCategory,
	ContactRequest as PrismaContactRequest,
	PricePlan as PrismaPricePlan,
	Product as PrismaProduct,
	Service as PrismaService,
	SiteSettings as PrismaSiteSettings,
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

export interface User extends Omit<PrismaUser, "createdAt" | "updatedAt"> {
	createdAt: string;
	updatedAt: string;
}

export interface Address
	extends Omit<PrismaAddress, "createdAt" | "updatedAt"> {
	createdAt: string;
	updatedAt: string;
}

export interface Service
	extends Omit<PrismaService, "createdAt" | "updatedAt"> {
	createdAt: string;
	updatedAt: string;
}

export interface PricePlan
	extends Omit<PrismaPricePlan, "createdAt" | "updatedAt"> {
	createdAt: string;
	updatedAt: string;
}

export interface SiteSettings
	extends Omit<PrismaSiteSettings, "createdAt" | "updatedAt"> {
	createdAt: string;
	updatedAt: string;
}

export interface ContactRequest
	extends Omit<PrismaContactRequest, "createdAt" | "updatedAt"> {
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
