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
    id: "1",
    title: "Гроб дубовый классический",
    handle: "groby-dubovyy-klassicheskiy",
    description: "Классический гроб из натурального дуба с бархатной отделкой внутри",
    thumbnail: "/placeholder.svg?height=200&width=200",
    images: ["/placeholder.svg?height=200&width=200"],
    price: 45000,
    status: "published",
    categories: [
      {
        id: "1",
        name: "Гробы",
      },
    ],
    tags: [],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Венок траурный белый",
    handle: "venok-traurnyy-belyy",
    description: "Траурный венок из белых хризантем и роз",
    thumbnail: "/placeholder.svg?height=200&width=200",
    images: ["/placeholder.svg?height=200&width=200"],
    price: 3500,
    status: "published",
    categories: [
      {
        id: "2",
        name: "Венки",
      },
    ],
    tags: [],
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    title: "Памятник гранитный",
    handle: "pamyatnik-granitnyy",
    description: "Памятник из черного гранита с гравировкой",
    thumbnail: "/placeholder.svg?height=200&width=200",
    images: ["/placeholder.svg?height=200&width=200"],
    price: 85000,
    status: "draft",
    categories: [
      {
        id: "3",
        name: "Памятники",
      },
    ],
    tags: [],
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
  },
]

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Гробы",
    handle: "groby",
    description: "Гробы различных типов и материалов",
    active: true,
    parentId: null,
    children: [],
    products: [],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Венки",
    handle: "venki",
    description: "Траурные венки и композиции",
    active: true,
    parentId: null,
    children: [],
    products: [],
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "Памятники",
    handle: "pamyatniki",
    description: "Надгробные памятники и мемориалы",
    active: true,
    parentId: null,
    children: [],
    products: [],
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
  },
]

const initialBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Как правильно организовать поминки",
    handle: "kak-pravilno-organizovat-pominki",
    seoTitle: "Как правильно организовать поминки - РитуалСервис",
    thumbnail: "/placeholder.svg?height=200&width=400",
    body: "Поминки — это важная часть погребального обряда...",
    draft: false,
    type: "article",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    title: "Выбор гроба: советы и рекомендации",
    handle: "vybor-groba-sovety-i-rekomendatsii",
    seoTitle: "Выбор гроба: советы и рекомендации - РитуалСервис",
    thumbnail: "/placeholder.svg?height=200&width=400",
    body: "Выбор гроба — важное и ответственное решение...",
    draft: false,
    type: "article",
    created_at: "2024-01-20T00:00:00Z",
    updated_at: "2024-01-20T00:00:00Z",
  },
  {
    id: "3",
    title: "Траурные венки: символы памяти",
    handle: "traurnye-venki-simvoly-pamyati",
    seoTitle: "Траурные венки: символы памяти - РитуалСервис",
    thumbnail: "/placeholder.svg?height=200&width=400",
    body: "Траурные венки — это не просто украшения...",
    draft: true,
    type: "article",
    created_at: "2024-01-25T00:00:00Z",
    updated_at: "2024-01-25T00:00:00Z",
  },
]

// Initialize localStorage with mock data if empty
if (typeof window !== "undefined") {
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts))
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(initialCategories))
  }
  if (!localStorage.getItem(STORAGE_KEYS.BLOG_POSTS)) {
    localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(initialBlogPosts))
  }
}

// Helper functions for localStorage operations
const getStoredData = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : fallback
}

const setStoredData = <T>(key: string, data: T): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

// Product CRUD operations
export const listProducts = async (): Promise<Product[]> => {
  return getStoredData(STORAGE_KEYS.PRODUCTS, initialProducts)
}

export const getProductByHandle = async (handle: string): Promise<Product | undefined> => {
  const products = await listProducts()
  return products.find((p) => p.handle === handle)
}

export const createProduct = async (product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> => {
  const products = await listProducts()
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  products.push(newProduct)
  setStoredData(STORAGE_KEYS.PRODUCTS, products)
  return newProduct
}

export const updateProduct = async (
  handle: string,
  updates: Partial<Omit<Product, "id" | "handle" | "createdAt" | "updatedAt">>
): Promise<Product | null> => {
  const products = await listProducts()
  const index = products.findIndex((p) => p.handle === handle)
  if (index === -1) return null

  const updatedProduct = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  products[index] = updatedProduct
  setStoredData(STORAGE_KEYS.PRODUCTS, products)
  return updatedProduct
}

export const deleteProduct = async (handle: string): Promise<boolean> => {
  const products = await listProducts()
  const index = products.findIndex((p) => p.handle === handle)
  if (index === -1) return false

  products.splice(index, 1)
  setStoredData(STORAGE_KEYS.PRODUCTS, products)
  return true
}

// Category CRUD operations
export const listCategories = async (): Promise<Category[]> => {
  return getStoredData(STORAGE_KEYS.CATEGORIES, initialCategories)
}

export const getCategoryByHandle = async (handle: string): Promise<Category | undefined> => {
  const categories = await listCategories()
  return categories.find((c) => c.handle === handle)
}

export const createCategory = async (
  category: Omit<Category, "id" | "createdAt" | "updatedAt">
): Promise<Category> => {
  const categories = await listCategories()
  const newCategory: Category = {
    ...category,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    children: [],
    products: [],
  }
  categories.push(newCategory)
  setStoredData(STORAGE_KEYS.CATEGORIES, categories)
  return newCategory
}

export const updateCategory = async (
  handle: string,
  updates: Partial<Omit<Category, "id" | "handle" | "createdAt" | "updatedAt">>
): Promise<Category | null> => {
  const categories = await listCategories()
  const index = categories.findIndex((c) => c.handle === handle)
  if (index === -1) return null

  const updatedCategory = {
    ...categories[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  categories[index] = updatedCategory
  setStoredData(STORAGE_KEYS.CATEGORIES, categories)
  return updatedCategory
}

export const deleteCategory = async (handle: string): Promise<boolean> => {
  const categories = await listCategories()
  const index = categories.findIndex((c) => c.handle === handle)
  if (index === -1) return false

  categories.splice(index, 1)
  setStoredData(STORAGE_KEYS.CATEGORIES, categories)
  return true
}

// BlogPost CRUD operations
export const listBlogPosts = async (): Promise<BlogPost[]> => {
  return getStoredData(STORAGE_KEYS.BLOG_POSTS, initialBlogPosts)
}

export const getBlogPostByHandle = async (handle: string): Promise<BlogPost | undefined> => {
  const posts = await listBlogPosts()
  return posts.find((p) => p.handle === handle)
}

export const createBlogPost = async (
  post: Omit<BlogPost, "id" | "created_at" | "updated_at">
): Promise<BlogPost> => {
  const posts = await listBlogPosts()
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  posts.push(newPost)
  setStoredData(STORAGE_KEYS.BLOG_POSTS, posts)
  return newPost
}

export const updateBlogPost = async (
  handle: string,
  updates: Partial<Omit<BlogPost, "id" | "handle" | "created_at" | "updated_at">>
): Promise<BlogPost | null> => {
  const posts = await listBlogPosts()
  const index = posts.findIndex((p) => p.handle === handle)
  if (index === -1) return null

  const updatedPost = {
    ...posts[index],
    ...updates,
    updated_at: new Date().toISOString(),
  }

  posts[index] = updatedPost
  setStoredData(STORAGE_KEYS.BLOG_POSTS, posts)
  return updatedPost
}

export const deleteBlogPost = async (handle: string): Promise<boolean> => {
  const posts = await listBlogPosts()
  const index = posts.findIndex((p) => p.handle === handle)
  if (index === -1) return false

  posts.splice(index, 1)
  setStoredData(STORAGE_KEYS.BLOG_POSTS, posts)
  return true
}

export const getAdminStats = async (): Promise<any> => {
  const products = await listProducts()
  const categories = await listCategories()
  const posts = await listBlogPosts()

  return {
    totalProducts: products.length,
    totalCategories: categories.length,
    totalBlogPosts: posts.length,
    publishedPosts: posts.filter((p) => !p.draft).length,
    draftPosts: posts.filter((p) => p.draft).length,
    totalViews: posts.reduce((sum, post) => sum + (post as any).views || 0, 0),
  }
}