// Type definitions for our Prisma-based product system
// Replacing Medusa HttpTypes with our own types

export type StoreProduct = {
	id: string;
	title: string;
	description: string | null;
	handle: string;
	thumbnail: string | null;
	images: string[];
	price: number;
	status: string;
	createdAt: string;
	updatedAt: string;
	categories?: StoreProductCategory[];
	tags: string[];
};

export type StoreProductCategory = {
	id: string;
	name: string;
	handle: string;
	description: string | null;
	image: string | null;
	parentId: string | null;
	parent?: StoreProductCategory | null;
	children?: StoreProductCategory[];
	products?: StoreProduct[];
	createdAt: string;
	updatedAt: string;
};
