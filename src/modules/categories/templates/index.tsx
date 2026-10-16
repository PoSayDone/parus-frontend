import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid";
import { TypographyH1 } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
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
			<div className="page-header">
	<TypographyH1 data-testid="category-page-title">
		{category.name}
	</TypographyH1>
</div>
			{category.description && (
				<div className="mb-8 max-w-3xl text-lg text-muted-foreground text-pretty">
					<p>{category.description}</p>
				</div>
			)}
			{category.children && category.children.length > 0 && (
				<div className="mb-8">
					<ul className="flex flex-wrap gap-2">
						{category.children?.map((c) => (
							<li key={c.id}>
								<Link
									href={`/categories/${c.handle}`}
									className={buttonVariants({ variant: "outline", size: "sm" })}
								>
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
				categoryName={category.name}
				filters={filters}
			/>
		</Suspense>
	</div>
);
}
