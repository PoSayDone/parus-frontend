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
	LandingPage as PrismaLandingPage,
	User as PrismaUser,
} from "@prisma/client";

// Convert Prisma Date types to string for API responses
// Convert Prisma string status to boolean active field to match Category model
export interface Product
	extends Omit<PrismaProduct, "createdAt" | "updatedAt" | "status"> {
	createdAt: Date;
	updatedAt: Date;
	active: boolean;
	categories: {
		id: string;
		name: string;
	}[];
}

export interface Category
	extends Omit<PrismaCategory, "createdAt" | "updatedAt"> {
	createdAt: Date;
	updatedAt: Date;
	status?: "active" | "inactive";
	parent: Category | null;
	children: Category[];
	products: Product[];
}

export interface BlogPost
	extends Omit<PrismaBlogPost, "createdAt" | "updatedAt"> {
	createdAt: Date;
	updatedAt: Date;
}

export interface User extends Omit<PrismaUser, "createdAt" | "updatedAt"> {
	createdAt: Date;
	updatedAt: Date;
}

export interface Address
	extends Omit<PrismaAddress, "createdAt" | "updatedAt"> {
	createdAt: Date;
	updatedAt: Date;
}

export interface Service
	extends Omit<PrismaService, "createdAt" | "updatedAt"> {
	createdAt: Date;
	updatedAt: Date;
}

export interface PricePlan
	extends Omit<PrismaPricePlan, "createdAt" | "updatedAt"> {
	createdAt: Date;
	updatedAt: Date;
}

export interface SiteSettings
	extends Omit<PrismaSiteSettings, "createdAt" | "updatedAt"> {
	createdAt: Date;
	updatedAt: Date;
}

export interface LandingPage
	extends Omit<PrismaLandingPage, "createdAt" | "updatedAt"> {
	createdAt: Date;
	updatedAt: Date;
}

export interface ContactRequest
	extends Omit<PrismaContactRequest, "createdAt" | "updatedAt"> {
	createdAt: Date;
	updatedAt: Date;
}

export interface AdminStats {
	totalProducts: number;
	totalCategories: number;
	totalBlogPosts: number;
	publishedPosts: number;
	draftPosts: number;
	totalViews: number;
}
