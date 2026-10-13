import { Pagination } from "@modules/store/components/pagination";
import ListPlaceholder from "@/modules/landing/components/list-placeholder";
import type { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import { listProducts } from "@/lib/data/products";
import { ProductCard } from "@/modules/products/components/card";
import type { ProductFilters } from "@/lib/product-filters";

const PRODUCT_LIMIT = 12;

type PaginatedProductsParams = {
	limit: number;
	category_id?: string;
	filters?: ProductFilters;
};

export default async function PaginatedProducts({
	sortBy,
	page,
	categoryId,
	filters,
}: {
	sortBy?: SortOptions;
	page: number;
	categoryId?: string;
	filters?: ProductFilters;
}) {
	const safePage =
		Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;

	const queryParams: PaginatedProductsParams = {
		limit: PRODUCT_LIMIT,
		filters,
	};

	if (categoryId) {
		queryParams.category_id = categoryId;
	}

	const {
		response: { data: products, count },
	} = await listProducts({
		page: safePage,
		queryParams,
		sortBy,
	});

	const totalPages = Math.ceil(count / PRODUCT_LIMIT);

	if (count === 0) {
		return (
			<ListPlaceholder text="По заданным параметрам товаров не найдено. Попробуйте выбрать другие условия." />
		);
	}

	return (
		<>
			<ul
				className="grid grid-cols-2 w-full md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8"
				data-testid="products-list"
			>
				{products.map((product) => (
					<li key={product.id}>
						<ProductCard product={product} />
					</li>
				))}
			</ul>

			{totalPages > 1 && (
				<Pagination
					data-testid="product-pagination"
					page={safePage}
					totalPages={totalPages}
				/>
			)}
		</>
	);
}