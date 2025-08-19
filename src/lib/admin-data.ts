import type { Product, Category, BlogPost } from "@/types/admin"

// Mock data storage - in production this would be replaced with API calls
const STORAGE_KEYS = {
  PRODUCTS: "admin_products",
  CATEGORIES: "admin_categories",
  BLOG_POSTS: "admin_blog_posts",
} as const

// Initial mock data
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Гроб дубовый классический",
    description: "Классический гроб из натурального дуба с бархатной отделкой внутри",
    category: "Гробы",
    price: 45000,
    stock: 5,
    status: "active",
    images: ["/placeholder.svg?height=200&width=200"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Венок траурный белый",
    description: "Траурный венок из белых хризантем и роз",
    category: "Венки",
    price: 3500,
    stock: 12,
    status: "active",
    images: ["/placeholder.svg?height=200&width=200"],
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: 3,
    name: "Памятник гранитный",
    description: "Памятник из черного гранита с гравировкой",
    category: "Памятники",
    price: 85000,
    stock: 2,
    status: "draft",
    images: ["/placeholder.svg?height=200&width=200"],
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
  },
]

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Гробы",
    description: "Гробы различных типов и материалов",
    slug: "groby",
    icon: "Package",
    status: "active",
    productCount: 15,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Венки",
    description: "Траурные венки и композиции",
    slug: "venki",
    icon: "Flower",
    status: "active",
    productCount: 8,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: 3,
    name: "Памятники",
    description: "Надгробные памятники и мемориалы",
    slug: "pamyatniki",
    icon: "Monument",
    status: "active",
    productCount: 12,
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
  },
]

const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Как правильно организовать поминки",
    excerpt: "Традиции и современные подходы к организации поминальных обедов...",
    content: "Поминки — это важная часть погребального обряда...",
    status: "published",
    author: "Администратор",
    publishedAt: "2024-01-15",
    featuredImage: "/placeholder.svg?height=200&width=400",
    tags: ["традиции", "поминки", "обряды"],
    metaDescription: "Подробное руководство по организации поминок",
    views: 245,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: 2,
    title: "Выбор памятника: материалы и формы",
    excerpt: "Подробное руководство по выбору надгробного памятника...",
    content: "Выбор памятника — это важное решение...",
    status: "published",
    author: "Администратор",
    publishedAt: "2024-01-10",
    featuredImage: "/placeholder.svg?height=200&width=400",
    tags: ["памятники", "материалы", "выбор"],
    metaDescription: "Руководство по выбору памятника",
    views: 189,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
]

// Utility functions for data management
export class AdminDataManager {
  // Products
  static getProducts(): Product[] {
    if (typeof window === "undefined") return initialProducts
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS)
    return stored ? JSON.parse(stored) : initialProducts
  }

  static saveProducts(products: Product[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products))
  }

  static createProduct(productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
    const products = this.getProducts()
    const newProduct: Product = {
      ...productData,
      id: Math.max(...products.map((p) => p.id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const updatedProducts = [...products, newProduct]
    this.saveProducts(updatedProducts)
    return newProduct
  }

  static updateProduct(id: number, productData: Partial<Product>): Product | null {
    const products = this.getProducts()
    const index = products.findIndex((p) => p.id === id)
    if (index === -1) return null

    const updatedProduct = {
      ...products[index],
      ...productData,
      updatedAt: new Date().toISOString(),
    }
    products[index] = updatedProduct
    this.saveProducts(products)
    return updatedProduct
  }

  static deleteProduct(id: number): boolean {
    const products = this.getProducts()
    const filteredProducts = products.filter((p) => p.id !== id)
    if (filteredProducts.length === products.length) return false
    this.saveProducts(filteredProducts)
    return true
  }

  // Categories
  static getCategories(): Category[] {
    if (typeof window === "undefined") return initialCategories
    const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES)
    return stored ? JSON.parse(stored) : initialCategories
  }

  static saveCategories(categories: Category[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories))
  }

  static createCategory(categoryData: Omit<Category, "id" | "createdAt" | "updatedAt">): Category {
    const categories = this.getCategories()
    const newCategory: Category = {
      ...categoryData,
      id: Math.max(...categories.map((c) => c.id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const updatedCategories = [...categories, newCategory]
    this.saveCategories(updatedCategories)
    return newCategory
  }

  static updateCategory(id: number, categoryData: Partial<Category>): Category | null {
    const categories = this.getCategories()
    const index = categories.findIndex((c) => c.id === id)
    if (index === -1) return null

    const updatedCategory = {
      ...categories[index],
      ...categoryData,
      updatedAt: new Date().toISOString(),
    }
    categories[index] = updatedCategory
    this.saveCategories(categories)
    return updatedCategory
  }

  static deleteCategory(id: number): boolean {
    const categories = this.getCategories()
    const filteredCategories = categories.filter((c) => c.id !== id)
    if (filteredCategories.length === categories.length) return false
    this.saveCategories(filteredCategories)
    return true
  }

  // Blog Posts
  static getBlogPosts(): BlogPost[] {
    if (typeof window === "undefined") return initialBlogPosts
    const stored = localStorage.getItem(STORAGE_KEYS.BLOG_POSTS)
    return stored ? JSON.parse(stored) : initialBlogPosts
  }

  static saveBlogPosts(posts: BlogPost[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(posts))
  }

  static createBlogPost(postData: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): BlogPost {
    const posts = this.getBlogPosts()
    const newPost: BlogPost = {
      ...postData,
      id: Math.max(...posts.map((p) => p.id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const updatedPosts = [...posts, newPost]
    this.saveBlogPosts(updatedPosts)
    return newPost
  }

  static updateBlogPost(id: number, postData: Partial<BlogPost>): BlogPost | null {
    const posts = this.getBlogPosts()
    const index = posts.findIndex((p) => p.id === id)
    if (index === -1) return null

    const updatedPost = {
      ...posts[index],
      ...postData,
      updatedAt: new Date().toISOString(),
    }
    posts[index] = updatedPost
    this.saveBlogPosts(posts)
    return updatedPost
  }

  static deleteBlogPost(id: number): boolean {
    const posts = this.getBlogPosts()
    const filteredPosts = posts.filter((p) => p.id !== id)
    if (filteredPosts.length === posts.length) return false
    this.saveBlogPosts(filteredPosts)
    return true
  }

  // Statistics
  static getAdminStats() {
    const products = this.getProducts()
    const categories = this.getCategories()
    const posts = this.getBlogPosts()

    return {
      totalProducts: products.length,
      totalCategories: categories.length,
      totalBlogPosts: posts.length,
      publishedPosts: posts.filter((p) => p.status === "published").length,
      draftPosts: posts.filter((p) => p.status === "draft").length,
      totalViews: posts.reduce((sum, post) => sum + post.views, 0),
    }
  }
}