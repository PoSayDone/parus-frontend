import BlogTemplate from "@/modules/blog/templates";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";

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
