import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getCategoryByHandle, listCategories } from "@lib/data/categories";
import CategoryTemplate from "@modules/categories/templates";
import { Category } from "@/types/admin";
import { SortOptions } from "@/modules/store/components/refinement-list/sort-products";

type Props = {
	params: Promise<{ category: string[] }>;
	searchParams: Promise<{
		page?: string;
		sortBy?: SortOptions;
	}>;
};

export async function generateStaticParams() {
	const {
		response: { categories: product_categories },
	} = await listCategories({ queryParams: { limit: 100 } });

	if (!product_categories) {
		return [];
	}

	const categoryHandles = product_categories.map(
		(category: Category) => category.handle,
	);

	const staticParams = categoryHandles.map((handle: any) => ({
		category: [handle],
	}));

	return staticParams;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = await props.params;
	try {
		const productCategory = await getCategoryByHandle(params.category[0]);

		const title = productCategory!.name;
		const description =
			productCategory!.description ?? `${title} category.`;

		return {
			title: `${title}`,
			description,
			alternates: {
				canonical: `${params.category.join("/")}`,
			},
		};
	} catch {
		notFound();
	}
}

export default async function CategoryPage(props: Props) {
	const searchParams = await props.searchParams;
	const params = await props.params;
	const { page, sortBy } = searchParams;

	const productCategory = await getCategoryByHandle(params.category[0]);
	console.log("category:", productCategory);

	if (!productCategory) {
		notFound();
	}

	return (
		<CategoryTemplate
			category={productCategory as Category}
			page={page}
			sortBy={sortBy}
		/>
	);
}
