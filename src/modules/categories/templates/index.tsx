import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import type { SortOptions } from "@/modules/store/components/refinement-list/sort-products";
import PaginatedProducts from "@/modules/store/templates/paginated-products";
import type { Category } from "@/types/admin";
import CharacteristicFilters from "../components/characteristic-filters";
import type {
	ProductFilters,
	ProductFilterOptions,
} from "@/lib/product-filters";

export default function CategoryTemplate({
	category,
	sortBy,
	page,
	filters = { colors: [], flowers: [], military: [] },
	filterOptions = { colors: [], flowers: [], military: [] },
}: {
	category: Category;
	sortBy?: SortOptions;
	page?: string;
	filters?: ProductFilters;
	filterOptions?: ProductFilterOptions;
}) {
	const pageNumber = page ? parseInt(page, 10) : 1;
	const sort = sortBy || "created_at";

	if (!category) notFound();

	const parents: Category[] = [];

	const getParents = (category: Category) => {
		if (category.parent) {
			parents.push(category.parent);
			getParents(category.parent);
		}
	};

	getParents(category);

	return (
		<div className="w-full">
		<Breadcrumbs
	items={[
		{ label: "Каталог", href: "/store" },
		...[...parents].reverse().map((parent) => ({
			label: parent.name,
			href: `/categories/${parent.handle}`,
		})),
		{
			label: category.name,
			href: `/categories/${category.handle}`,
		},
	]}
/>
			<div className="mb-6">
	{parents.length > 0 && (
		<div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
			{[...parents].reverse().map((parent) => (
				<span key={parent.id}>
					<Link
						href={`/categories/${parent.handle}`}
						className="hover:text-primary"
					>
						{parent.name}
					</Link>
					<span className="ml-2" aria-hidden="true">
						/
					</span>
				</span>
			))}
		</div>
	)}

	<h1
		className="text-3xl font-medium text-foreground md:text-4xl"
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
			{category.children && category.children.length > 0 && (
				<div className="mb-4 text-base-large">
					<ul className="grid grid-cols-1 gap-2">
						{category.children?.map((c) => (
							<li key={c.id}>
								<Link href={`/categories/${c.handle}`}>
									{c.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
					

		<CharacteristicFilters
			key={JSON.stringify([category.handle, sort, filters])}
			categoryHandle={category.handle}
			sortBy={sort}
			filters={filters}
			options={filterOptions}
		/>

		<Suspense
			fallback={
				<SkeletonProductGrid
					numberOfProducts={category.products?.length ?? 8}
				/>
			}
		>
			<PaginatedProducts
				sortBy={sort}
				page={pageNumber}
				categoryId={category.id}
				filters={filters}
			/>
		</Suspense>
	</div>
);
}
