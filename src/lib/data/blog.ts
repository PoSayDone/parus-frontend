"use server";

import prisma from "@lib/prisma";
import { BlogPost as PrismaBlogPost } from "@prisma/client";

// Define our own BlogPost type that matches the Prisma schema with renamed fields
type BlogPost = Omit<PrismaBlogPost, 'createdAt' | 'updatedAt'> & {
  created_at: Date;
  updated_at: Date;
};

export const listPosts = async ({
  pageParam = 1,
  queryParams,
}: {
  pageParam?: number;
  queryParams?: {
    limit?: number;
    offset?: number;
    type?: string;
    [key: string]: any;
  };
}): Promise<{
  response: { posts: BlogPost[]; count: number };
  nextPage: number | null;
  queryParams?: any;
}> => {
  const limit = queryParams?.limit || 12;
  const _pageParam = Math.max(pageParam, 1);
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

  let where: any = {
    draft: false
  };
  
  if (queryParams?.type) {
    where.type = queryParams.type;
  }

  const [posts, count] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: {
        created_at: 'desc'
      }
    }),
    prisma.blogPost.count({ where })
  ]);

  // Convert field names
  const formattedPosts = posts.map(post => ({
    ...post,
    created_at: post.created_at,
    updated_at: post.updated_at
  })) as BlogPost[];

  const nextPage = count > offset + limit ? pageParam + 1 : null;

  return {
    response: {
      posts: formattedPosts,
      count,
    },
    nextPage: nextPage,
    queryParams,
  };
};

export const getAllPosts = async ({
  pageParam = 1,
  queryParams,
}: {
  pageParam?: number;
  queryParams?: {
    limit?: number;
    offset?: number;
    type?: string;
    [key: string]: any;
  };
}): Promise<{
  response: { posts: BlogPost[]; count: number };
  nextPage: number | null;
  queryParams?: any;
}> => {
  const limit = queryParams?.limit || 12;
  const _pageParam = Math.max(pageParam, 1);
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

  let where: any = {};
  
  if (queryParams?.type) {
    where.type = queryParams.type;
  }

  const [posts, count] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: {
        created_at: 'desc'
      }
    }),
    prisma.blogPost.count({ where })
  ]);

  // Convert field names
  const formattedPosts = posts.map(post => ({
    ...post,
    created_at: post.created_at,
    updated_at: post.updated_at
  })) as BlogPost[];

  const nextPage = count > offset + limit ? pageParam + 1 : null;

  return {
    response: {
      posts: formattedPosts,
      count,
    },
    nextPage: nextPage,
    queryParams,
  };
};

export const listPostsWithSort = async ({
  page = 0,
  queryParams,
  sortBy = "created_at",
}: {
  page?: number;
  queryParams?: {
    limit?: number;
    offset?: number;
    type?: string;
    [key: string]: any;
  };
  sortBy?: string;
}): Promise<{
  response: { posts: BlogPost[]; count: number };
  nextPage: number | null;
  queryParams?: any;
}> => {
  const limit = queryParams?.limit || 12;

  let where: any = {};
  
  if (queryParams?.type) {
    where.type = queryParams.type;
  }

  const [posts, count] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      take: 100, // Fetch more posts for sorting
      orderBy: {
        created_at: 'desc'
      }
    }),
    prisma.blogPost.count({ where })
  ]);

  // Convert field names
  const formattedPosts = posts.map(post => ({
    ...post,
    created_at: post.created_at,
    updated_at: post.updated_at
  })) as BlogPost[];

  // Apply sorting if needed (simplified for now)
  const sortedPosts = formattedPosts.sort((a, b) => {
    if (sortBy === "created_at") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    return 0;
  });

  const pageParam = (page - 1) * limit;
  const nextPage = count > pageParam + limit ? pageParam + limit : null;
  const paginatedPosts = sortedPosts.slice(pageParam, pageParam + limit);

  return {
    response: {
      posts: paginatedPosts,
      count,
    },
    nextPage,
    queryParams,
  };
};

export const getPostByHandle = async (handle: string) => {
  const post = await prisma.blogPost.findUnique({
    where: { handle }
  });
  
  if (!post) return null;
  
  // Convert field names
  return {
    ...post,
    created_at: post.created_at,
    updated_at: post.updated_at
  } as BlogPost;
};

export const createPost = async (data: any) => {
  const post = await prisma.blogPost.create({
    data
  });
  
  // Convert field names
  return {
    ...post,
    created_at: post.created_at,
    updated_at: post.updated_at
  } as BlogPost;
};

export const updatePost = async (handle: string, data: any) => {
  const post = await prisma.blogPost.update({
    where: { handle },
    data
  });
  
  // Convert field names
  return {
    ...post,
    created_at: post.created_at,
    updated_at: post.updated_at
  } as BlogPost;
};

export const deletePost = async (handle: string) => {
  return prisma.blogPost.delete({
    where: { handle }
  });
};