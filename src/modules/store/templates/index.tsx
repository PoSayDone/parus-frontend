import { Suspense } from "react";
import Link from "next/link";

import { listCategories } from "@/lib/data/categories";
import SkeletonProductGrid from "@/modules/skeletons/templates/skeleton-product-grid";
import type { SortOptions } from "../components/refinement-list/sort-products";
import PaginatedProducts from "./paginated-products";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export default async function StoreTemplate({
	sortBy,
	page,
}: {
	sortBy?: SortOptions;
	page?: string;
}) {
	const pageNumber = page ? parseInt(page, 10) : 1;
	const sort = sortBy || "created_at";

	const {
		response: { data: categories },
	} = await listCategories({
		queryParams: { limit: 100 },
	});

	const rootCategories = categories.filter(
		(category) => !category.parentId,
	);

	return (
		<div className="w-full">
		<Breadcrumbs
	items={[
		{ label: "Каталог", href: "/store" },
	]}
/>
			<h1
				className="mb-6 text-3xl font-medium text-foreground md:text-4xl"
				data-testid="store-page-title"
			>
				Каталог ритуальных товаров
			</h1>

			{rootCategories.length > 0 && (
				<nav aria-label="Категории товаров" className="mb-8">
					<ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
						{rootCategories.map((category) => (
							<li key={category.id}>
								<Link
									href={`/categories/${category.handle}`}
									className="flex h-full min-h-24 items-center justify-center rounded-2xl border border-border bg-muted/30 p-4 text-center text-base font-medium transition-colors hover:border-primary hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:text-lg"
								>
									{category.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			)}


			<Suspense fallback={<SkeletonProductGrid />}>
				<PaginatedProducts
					sortBy={sort}
					page={pageNumber}
				/>
			</Suspense>
		</div>
	);
}