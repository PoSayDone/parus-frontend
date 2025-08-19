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
  createdAt: Date;
  updatedAt: Date;
  categories?: StoreProductCategory[];
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
  createdAt: Date;
  updatedAt: Date;
};

// Blog post types
export type BlogPost = {
  id: string;
  title: string;
  handle: string;
  seoTitle: string | null;
  thumbnail: string | null;
  body: string | null;
  draft: boolean;
  type: string;
  createdAt: Date;
  updatedAt: Date;
};