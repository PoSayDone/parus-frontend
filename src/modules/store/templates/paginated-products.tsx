import { listProductsWithSort } from "@lib/data/products";
import { Pagination } from "@modules/store/components/pagination";
import { SortOptions } from "@modules/store/components/sort-products";
import { ProductCard } from "@/modules/products/components/card";

const PRODUCT_LIMIT = 12;

type PaginatedProductsParams = {
	limit: number;
	collection_id?: string[];
	category_id?: string[];
	id?: string[];
	order?: string;
};

export default async function PaginatedProducts({
	sortBy,
	page,
	collectionId,
	categoryId,
	productsIds,
}: {
	sortBy?: SortOptions;
	page: number;
	collectionId?: string;
	categoryId?: string;
	productsIds?: string[];
}) {
	const queryParams: PaginatedProductsParams = {
		limit: 12,
	};

	if (collectionId) {
		queryParams["collection_id"] = [collectionId];
	}

	if (categoryId) {
		queryParams["category_id"] = [categoryId];
	}

	if (productsIds) {
		queryParams["id"] = productsIds;
	}

	if (sortBy === "created_at") {
		queryParams["order"] = "created_at";
	}

	let {
		response: { products, count },
	} = await listProductsWithSort({
		page,
		queryParams,
		sortBy,
	});

	const totalPages = Math.ceil(count / PRODUCT_LIMIT);

	return (
		<>
			<ul
				className="grid grid-cols-2 w-full sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 gap-y-4 lg:gap-4"
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
