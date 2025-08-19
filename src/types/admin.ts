import type { BlogPost as GlobalBlogPost } from "./global";

export interface Product {
  id: string
  title: string
  handle: string
  description: string | null
  thumbnail: string | null
  price: number
  status: "published" | "draft"
  categories: {
    id: string
    name: string
  }[]
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  handle: string
  description: string | null
  icon: string | null
  status: "active" | "inactive"
  productCount: number
  createdAt: string
  updatedAt: string
}

export interface BlogPost extends GlobalBlogPost {
  excerpt: string | null
  body: string | null
  seoTitle: string | null
  thumbnail: string | null
  draft: boolean
  type: string
  author: string | null
  publishedAt: string | null
  views: number
  createdAt: string
  updatedAt: string
}

export interface AdminStats {
  totalProducts: number
  totalCategories: number
  totalBlogPosts: number
  publishedPosts: number
  draftPosts: number
  totalViews: number
}