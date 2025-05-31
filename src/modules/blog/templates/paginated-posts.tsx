import { listPostsWithSort } from "@/lib/data/blog";
import { Pagination } from "@modules/store/components/pagination";
import { SortOptions } from "@modules/store/components/sort-products";
import { PostCard } from "../../posts/components/card";

const PRODUCT_LIMIT = 12;

type PaginatedPostsParams = {
	limit: number;
	collection_id?: string[];
	category_id?: string[];
	id?: string[];
	order?: string;
	draft?: boolean;
};

export default async function PaginatedPosts({
	sortBy,
	page,
}: {
	sortBy?: SortOptions;
	page: number;
}) {
	const queryParams: PaginatedPostsParams = {
		limit: 12,
		draft: false,
	};

	const {
		response: { posts, count },
	} = await listPostsWithSort({
		page,
		queryParams,
		sortBy,
	});

	const totalPages = Math.ceil(count / PRODUCT_LIMIT);

	return (
		<>
			<ul
				className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-2  xl:grid-cols-3 gap-2 gap-y-4 lg:gap-4"
				data-testid="products-list"
			>
				{posts.map((p) => {
					return (
						<li key={p.id}>
							<PostCard post={p} />
						</li>
					);
				})}
			</ul>
			{totalPages > 1 && (
				<Pagination
					data-testid="product-pagination"
					page={page}
					totalPages={totalPages}
				/>
			)}
		</>
	);
}
