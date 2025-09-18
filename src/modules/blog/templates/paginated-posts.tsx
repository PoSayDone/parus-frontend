import { listPosts } from "@/lib/data/blog";
import { Pagination } from "@modules/store/components/pagination";
import { PostCard } from "../../posts/components/card";
import { SortOptions } from "@/modules/store/components/refinement-list/sort-products";

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
		response: { data: posts, count },
	} = await listPosts({
		page,
		queryParams,
		sortBy,
	});

	const totalPages = Math.ceil(count / PRODUCT_LIMIT);

	if (count === 0) {
		return (
			<div className="flex justify-center items-center h-full py-16">
				<p className="text-lg">
					На данный момент нет ни одной статьи, приходите позже
				</p>
			</div>
		);
	}

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
