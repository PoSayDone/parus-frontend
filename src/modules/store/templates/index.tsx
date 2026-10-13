import { Suspense } from "react";
import Link from "next/link";

import { listCategories } from "@/lib/data/categories";
import SkeletonProductGrid from "@/modules/skeletons/templates/skeleton-product-grid";
import type { SortOptions } from "../components/refinement-list/sort-products";
import PaginatedProducts from "./paginated-products";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { TypographyH1 } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";

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
			<TypographyH1 className="page-header" data-testid="store-page-title">
				Каталог ритуальных товаров
			</TypographyH1>

			{rootCategories.length > 0 && (
				<nav aria-label="Категории товаров" className="mb-8">
					<ul className="flex flex-wrap gap-2">
						{rootCategories.map((category) => (
							<li key={category.id}>
								<Link
									href={`/categories/${category.handle}`}
									className={buttonVariants({ variant: "outline" })}
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