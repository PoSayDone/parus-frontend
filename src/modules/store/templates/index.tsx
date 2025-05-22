import { Suspense } from "react";

import SkeletonProductGrid from "@/modules/skeletons/templates/skeleton-product-grid";
import RefinementList from "@modules/store/components/refinement-list";

import PaginatedProducts from "./paginated-products";
import { Input } from "@/components/ui/input";
import { SortOptions } from "../components/refinement-list/sort-products";

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
		<div className="w-full">
			<div className="mb-4">
				<h1 className="text-4xl" data-testid="store-page-title">
					Все товары
				</h1>
			</div>
			<Input placeholder="Поиск..." className="mb-4" />
			<RefinementList sortBy={sort} data-testid="sort-by-container" />
			<Suspense fallback={<SkeletonProductGrid />}>
				<PaginatedProducts sortBy={sort} page={pageNumber} />
			</Suspense>
		</div>
	);
};

export default StoreTemplate;
