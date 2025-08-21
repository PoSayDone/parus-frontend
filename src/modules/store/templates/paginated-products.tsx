import { Pagination } from "@modules/store/components/pagination";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import { ProductCard } from "@/modules/products/components/card";
import { listProducts } from "@/lib/data/products";

const PRODUCT_LIMIT = 12;

type PaginatedProductsParams = {
	limit: number;
	handle?: string;
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

	if (categoryId) {
		queryParams["handle"] = categoryId;
	}

	const {
		response: { data: products, count },
	} = await listProducts({
		page,
		queryParams,
		sortBy,
	});

	const totalPages = Math.ceil(count / PRODUCT_LIMIT);

	return (
		<>
			<ul
				className="grid grid-cols-2 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 gap-y-4"
				data-testid="products-list"
			>
				{products.map((p) => {
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
