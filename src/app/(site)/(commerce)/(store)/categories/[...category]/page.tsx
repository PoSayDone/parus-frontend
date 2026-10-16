import { getCategoryByHandle, listCategories } from "@lib/data/categories";
import CategoryTemplate from "@modules/categories/templates";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { SortOptions } from "@/modules/store/components/refinement-list/sort-products";
import type { Category } from "@/types/admin";
import { getProductFilterOptions } from "@/lib/data/products";
import {
	readFilterParam,
	filterValueSlug,
} from "@/lib/product-filters";

type Props = {
	params: Promise<{ category: string[] }>;
	searchParams: Promise<{
	page?: string;
	sortBy?: SortOptions;
	color?: string | string[];
	flower?: string | string[];
	military?: string | string[];
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
	const { category } = await props.params;
	const productCategory = await getCategoryByHandle(category[0]);

	if (!productCategory) {
		notFound();
	}

	const rawTitle =
		productCategory.metaTitle?.trim() ||
		productCategory.name;

	const title = /парус/iu.test(rawTitle)
		? rawTitle
		: `${rawTitle} | Парус`;

	const description =
		productCategory.metaDescription?.trim() ||
		productCategory.description?.trim() ||
		`${productCategory.name} — каталог ритуального агентства «Парус».`;

	const canonical = `/categories/${category.join("/")}`;

	return {
		title: {
			absolute: title,
		},
		description,
		alternates: {
			canonical,
		},
		openGraph: {
		type: "website",
		url: canonical,
		title,
		description,
		images: [
			{
				url: "https://parus-ritual.ru/images/og-image.png",
				alt: "Ритуальное агентство «Парус»",
			},
		],
	},
	};
}

export default async function CategoryPage(props: Props) {
	const searchParams = await props.searchParams;
	const params = await props.params;
	const { page, sortBy } = searchParams;

	const productCategory = await getCategoryByHandle(params.category[0]);

	if (!productCategory) {
		notFound();
	}
	const filterOptions = await getProductFilterOptions(productCategory.id);

const resolveFilterValues = (
	param: string | string[] | undefined,
	options: string[],
): string[] => {
	return readFilterParam(param).map((value) => {
		return (
			options.find(
				(option) =>
					option === value ||
					filterValueSlug(option) === value,
			) ?? value
		);
	});
};

const filters = {
	colors: resolveFilterValues(
		searchParams.color,
		filterOptions.colors,
	),
	flowers: resolveFilterValues(
		searchParams.flower,
		filterOptions.flowers,
	),
	military: resolveFilterValues(
		searchParams.military,
		filterOptions.military,
	),
};

	return (
		<CategoryTemplate
	category={productCategory as Category}
	page={page}
	sortBy={sortBy}
	filters={filters}
	filterOptions={filterOptions}
/>
	);
}
