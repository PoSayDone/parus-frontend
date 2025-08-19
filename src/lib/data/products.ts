"use server";

import prisma from "@lib/prisma";
import { Product } from "@prisma/client";
import { sortProducts } from "@lib/util/sort-products";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";

export const listProducts = async ({
  pageParam = 1,
  queryParams,
}: {
  pageParam?: number;
  queryParams?: {
    limit?: number;
    offset?: number;
    categoryHandle?: string;
    [key: string]: any;
  };
}): Promise<{
  response: { products: Product[]; count: number };
  nextPage: number | null;
  queryParams?: any;
}> => {
  const limit = queryParams?.limit || 12;
  const _pageParam = Math.max(pageParam, 1);
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

  let where: any = {};
  
  if (queryParams?.categoryHandle) {
    where = {
      categories: {
        some: {
          handle: queryParams.categoryHandle
        }
      }
    };
  }

  const [products, count] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        categories: true,
      }
    }),
    prisma.product.count({ where })
  ]);

  const nextPage = count > offset + limit ? pageParam + 1 : null;

  return {
    response: {
      products,
      count,
    },
    nextPage: nextPage,
    queryParams,
  };
};

export const listProductsWithSort = async ({
  page = 0,
  queryParams,
  sortBy = "created_at",
}: {
  page?: number;
  queryParams?: {
    limit?: number;
    offset?: number;
    categoryHandle?: string;
    [key: string]: any;
  };
  sortBy?: SortOptions;
}): Promise<{
  response: { products: Product[]; count: number };
  nextPage: number | null;
  queryParams?: any;
}> => {
  const limit = queryParams?.limit || 12;

  let where: any = {};
  
  if (queryParams?.categoryHandle) {
    where = {
      categories: {
        some: {
          handle: queryParams.categoryHandle
        }
      }
    };
  }

  const [products, count] = await Promise.all([
    prisma.product.findMany({
      where,
      take: 100, // Fetch more products for sorting
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        categories: true,
      }
    }),
    prisma.product.count({ where })
  ]);

  // Apply sorting
  const sortedProducts = sortProducts(products, sortBy);

  const pageParam = (page - 1) * limit;
  const nextPage = count > pageParam + limit ? pageParam + limit : null;
  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit);

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  };
};

export const getProductByHandle = async (handle: string) => {
  return prisma.product.findUnique({
    where: { handle },
    include: {
      categories: true,
    }
  });
};

export const createProduct = async (data: any) => {
  return prisma.product.create({
    data
  });
};

export const updateProduct = async (handle: string, data: any) => {
  return prisma.product.update({
    where: { handle },
    data
  });
};

export const deleteProduct = async (handle: string) => {
  return prisma.product.delete({
    where: { handle }
  });
};