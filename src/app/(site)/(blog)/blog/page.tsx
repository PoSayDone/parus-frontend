import type { Metadata } from "next";
import BlogTemplate from "@/modules/blog/templates";
import { getSiteSettings } from "@/lib/data/site-settings";
type BlogSortOptions = "created_at" | "views";

export async function generateMetadata(): Promise<Metadata> {
	const defaultTitle =
		"Блог о ритуальных услугах и товарах - Парус";
	const defaultDescription =
		"Полезные статьи и информация о ритуальных услугах, товарах, традициях и обычаях. Экспертные советы от компании Парус.";
	const settings = await getSiteSettings();
	const title = settings?.blogMetaTitle?.trim() || defaultTitle;
	const description =
		settings?.blogMetaDescription?.trim() || defaultDescription;

	return {
		title,
		description,
		keywords: [
			"блог",
			"ритуальные услуги",
			"ритуальные товары",
			"традиции",
			"советы",
		],
		openGraph: {
			title,
			description,
			images: ["/images/og-image.png"],
		},
		alternates: {
			canonical: "/blog",
		},
	};
}

type Params = {
	searchParams: Promise<{
		sortBy?: BlogSortOptions;
		page?: string;
	}>;
};

export default async function BlogPage(props: Params) {
	const searchParams = await props.searchParams;
	const { sortBy, page } = searchParams;

	return <BlogTemplate page={page} sortBy={sortBy} />;
}
