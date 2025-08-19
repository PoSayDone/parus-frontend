import { listProductsWithSort } from "@lib/data/products";
import { Pagination } from "@modules/store/components/pagination";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import { ProductCard } from "@/modules/products/components/card";
import { StoreProduct } from "@/types/store";

const PRODUCT_LIMIT = 12;

type PaginatedProductsParams = {
  limit: number;
  categoryHandle?: string;
};

export default async function PaginatedProducts({
  sortBy,
  page,
  categoryId,
}: {
  sortBy?: SortOptions;
  page: number;
  categoryId?: string;
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 12,
  };

  // We'll need to get the category handle from the ID
  // For now, we'll just pass the categoryId as categoryHandle
  // In a real implementation, you'd look up the handle by ID
  if (categoryId) {
    // This is a temporary solution - in a real implementation,
    // you'd fetch the category by ID and get its handle
    queryParams["categoryHandle"] = categoryId;
  }

  let {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
  });

  // Convert Prisma products to our StoreProduct type
  const storeProducts: StoreProduct[] = products.map(product => ({
    ...product,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }));

  const totalPages = Math.ceil(count / PRODUCT_LIMIT);

  return (
    <>
      <ul
        className="grid grid-cols-2 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 gap-y-4"
        data-testid="products-list"
      >
        {storeProducts.map((p) => {
          return (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          );
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  );
}