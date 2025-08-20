// Admin types that align with Prisma schema

export interface Product {
	id: string;
	title: string;
	handle: string;
	description: string | null;
	thumbnail: string | null;
	images: string[];
	price: number;
	status: string;
	categories: {
		id: string;
		name: string;
	}[];
	tags: string[];
	createdAt: string;
	updatedAt: string;
}

export interface Category {
	id: string;
	name: string;
	handle: string;
	description: string | null;
	active: boolean;
	parent: Category | null;
	parentId: string | null;
	children: Category[];
	products: Product[];
	createdAt: string;
	updatedAt: string;
}

export interface BlogPost {
	id: string;
	title: string;
	handle: string;
	seoTitle: string | null;
	thumbnail: string | null;
	body: string | null;
	draft: boolean;
	type: string;
	created_at: string;
	updated_at: string;
}

export interface AdminStats {
	totalProducts: number;
	totalCategories: number;
	totalBlogPosts: number;
	publishedPosts: number;
	draftPosts: number;
	totalViews: number;
}
