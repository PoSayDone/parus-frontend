import { getCategoryByHandle, listCategories } from "@lib/data/categories";
import CategoryTemplate from "@modules/categories/templates";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { SortOptions } from "@/modules/store/components/refinement-list/sort-products";
import type { Category } from "@/types/admin";

type Props = {
	params: Promise<{ category: string[] }>;
	searchParams: Promise<{
		page?: string;
		sortBy?: SortOptions;
	}>;
};

export async function generateStaticParams() {
	try {
		const {
			response: { data: categories },
		} = await listCategories({ queryParams: { limit: 100 } });

		if (!categories) {
			return [];
		}

		const staticParams = categories.map((category: any) => ({
			category: [category.handle],
		}));

		return staticParams;
	} catch (error) {
		console.error("Error generating static params for categories:", error);
		return [];
	}
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = await props.params;
	try {
		const productCategory = await getCategoryByHandle(params.category[0]);

		const title = productCategory?.name;
		const description = productCategory?.description ?? `${title} category.`;

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
