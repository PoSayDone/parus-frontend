import { listPosts } from "@/lib/data/blog";
import { Pagination } from "@modules/store/components/pagination";
import ListPlaceholder from "@/modules/landing/components/list-placeholder";
import { PostCard } from "../../posts/components/card";
type BlogSortOptions = "created_at" | "views";

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
	sortBy?: BlogSortOptions;
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
			<ListPlaceholder text="Статей пока нет. Загляните позже." />
		);
	}

	return (
		<>
			<ul
				className="grid grid-cols-1 w-full md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8"
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
