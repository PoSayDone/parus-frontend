import { notFound } from "next/navigation";
import { Suspense } from "react";

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid";
import RefinementList from "@/modules/store/components/refinement-list";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import PaginatedProducts from "@modules/store/templates/paginated-products";
import { HttpTypes } from "@medusajs/types";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function CategoryTemplate({
	category,
	sortBy,
	page,
}: {
	category: HttpTypes.StoreProductCategory;
	sortBy?: SortOptions;
	page?: string;
}) {
	const pageNumber = page ? parseInt(page) : 1;
	const sort = sortBy || "created_at";

	if (!category) notFound();

	const parents = [] as HttpTypes.StoreProductCategory[];

	const getParents = (category: HttpTypes.StoreProductCategory) => {
		if (category.parent_category) {
			parents.push(category.parent_category);
			getParents(category.parent_category);
		}
	};

	getParents(category);

	return (
		<>
			<div className="w-full">
				<div className="flex flex-row mb-4 gap-4 text-3xl sr-only">
					{parents &&
						parents.map((parent) => (
							<span key={parent.id} className="text-ui-fg-subtle">
								<Link
									className="mr-4 hover:text-black"
									href={`/categories/${parent.handle}`}
									data-testid="sort-by-link"
								>
									{parent.name}
								</Link>
								/
							</span>
						))}
					<h1
						className={"text-4xl"}
						data-testid="category-page-title"
					>
						{category.name}
					</h1>
				</div>
				{category.description && (
					<div className="mb-4 text-base-regular">
						<p>{category.description}</p>
					</div>
				)}
				{category.category_children &&
					category.category_children.length > 0 && (
						<div className="mb-4 text-base-large">
							<ul className="grid grid-cols-1 gap-2">
								{category.category_children?.map((c) => (
									<li key={c.id}>
										<Link href={`/categories/${c.handle}`}>
											{c.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					)}
				<div className="flex items-center gap-2 mb-4">
					<Input placeholder="Поиск..." className="md:max-w-2/5" />
					<RefinementList
						sortBy={sort}
						data-testid="sort-by-container"
					/>
				</div>
				<Suspense
					fallback={
						<SkeletonProductGrid
							numberOfProducts={category.products?.length ?? 8}
						/>
					}
				>
					<PaginatedProducts
						// sortBy={sort}
						page={pageNumber}
						categoryId={category.id}
						// countryCode={countryCode}
					/>
				</Suspense>
			</div>
		</>
	);
}
