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
	status?: string;
	active?: boolean;
	createdAt: Date;
	updatedAt: Date;
	categories?: StoreProductCategory[];
	tags: string[];
	characteristics?: StoreProductCharacteristic[];
};

export type StoreProductCategory = {
	id: string;
	name: string;
	handle: string;
	description?: string | null;
	image?: string | null;
	parentId?: string | null;
	parent?: StoreProductCategory | null;
	children?: StoreProductCategory[];
	products?: StoreProduct[];
	createdAt: Date;
	updatedAt: Date;
};

export type StoreProductImage = {
	id: string;
	url: string;
};

export type StoreProductOption = {
	id: string;
	values: string[];
};

export type StoreProductCharacteristic = {
	id: string;
	key: string;
	value: string;
};
