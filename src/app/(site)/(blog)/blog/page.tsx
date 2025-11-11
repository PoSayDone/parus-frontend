import type { Metadata } from "next";
import BlogTemplate from "@/modules/blog/templates";
import type { SortOptions } from "@modules/store/components/refinement-list/sort-products";

export const metadata: Metadata = {
	title: "Блог о ритуальных услугах и товарах - Парус",
	description:
		"Полезные статьи и информация о ритуальных услугах, товарах, традициях и обычаях. Экспертные советы от компании Парус.",
	keywords: [
		"блог",
		"ритуальные услуги",
		"ритуальные товары",
		"традиции",
		"советы",
	],
	openGraph: {
		title: "Блог о ритуальных услугах и товарах - Парус",
		description:
			"Полезные статьи и информация о ритуальных услугах, товарах, традициях и обычаях. Экспертные советы от компании Парус.",
		images: ["/images/og-image.png"],
	},
};

type Params = {
	searchParams: Promise<{
		sortBy?: SortOptions;
		page?: string;
	}>;
};

export default async function BlogPage(props: Params) {
	const searchParams = await props.searchParams;
	const { sortBy, page } = searchParams;

	return <BlogTemplate page={page} sortBy={sortBy} />;
}
