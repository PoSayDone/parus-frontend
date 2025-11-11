import { Suspense } from "react";

import PaginatedPosts from "./paginated-posts";
import SkeletonBlogGrid from "@/modules/skeletons/templates/skeleton-blog-grid";

const BlogTemplate = ({
	sortBy,
	page,
}: {
	sortBy?: SortOptions;
	page?: string;
}) => {
	const pageNumber = page ? parseInt(page, 10) : 1;
	const sort = sortBy || "created_at";

	return (
		<div className="w-full">
			<div className="mb-6">
				<h1 className="text-4xl" data-testid="store-page-title">
					Статьи
				</h1>
			</div>
			<Suspense fallback={<SkeletonBlogGrid />}>
				<PaginatedPosts sortBy={sort} page={pageNumber} />
			</Suspense>
		</div>
	);
};

export default BlogTemplate;
