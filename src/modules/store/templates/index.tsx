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
			<div className="mb-4 sr-only">
				<h1 className="text-4xl" data-testid="store-page-title">
					Все товары
				</h1>
			</div>
			<div className="flex items-center gap-2 mb-4">
				<Input placeholder="Поиск..." className="md:max-w-2/5" />
				<RefinementList sortBy={sort} data-testid="sort-by-container" />
			</div>
			<Suspense fallback={<SkeletonProductGrid />}>
				<PaginatedProducts sortBy={sort} page={pageNumber} />
			</Suspense>
		</div>
	);
};

export default StoreTemplate;
