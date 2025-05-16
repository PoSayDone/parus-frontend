import { Suspense } from "react";

import SkeletonProductGrid from "@/modules/skeletons/templates/skeleton-product-grid";
// import RefinementList from "@modules/store/components/refinement-list";
import { SortOptions } from "@modules/store/components/sort-products";

import PaginatedProducts from "./paginated-products";
import Categories from "@modules/store/components/categories";
import { Input } from "@/components/ui/input";

const StoreTemplate = ({
	sortBy,
	page,
}: {
	sortBy?: SortOptions;
	page?: string;
}) => {
	const pageNumber = page ? parseInt(page) : 1;
	const sort = sortBy || "created_at";

	return (
		<div
			className="grid grid-cols-[300px_1fr] mx-8 gap-x-8"
			data-testid="category-container"
		>
			<Categories />
			{/* <RefinementList sortBy={sort} /> */}
			<div className="w-full">
				<div className="mb-8">
					<h1 className="text-4xl" data-testid="store-page-title">
						Все товары
					</h1>
				</div>
				<Input placeholder="Поиск..." className="mb-4" />
				<Suspense fallback={<SkeletonProductGrid />}>
					<PaginatedProducts sortBy={sort} page={pageNumber} />
				</Suspense>
			</div>
		</div>
	);
};

export default StoreTemplate;
