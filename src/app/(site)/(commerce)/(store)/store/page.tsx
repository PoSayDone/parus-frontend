import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import StoreTemplate from "@modules/store/templates";

type Params = {
	searchParams: Promise<{
		sortBy?: SortOptions;
		page?: string;
	}>;
};

export default async function StorePage(props: Params) {
	const searchParams = await props.searchParams;
	const { sortBy, page } = searchParams;

	return <StoreTemplate page={page} sortBy={sortBy} />;
}
