import { Suspense } from "react";

import SkeletonBlogGrid from "@/modules/skeletons/templates/skeleton-blog-grid";
import PaginatedPosts from "./paginated-posts";

type BlogSortOptions = "created_at" | "views";

const BlogTemplate = ({
  sortBy,
  page,
}: {
  sortBy?: BlogSortOptions;
  page?: string;
}) => {
  const pageNumber = page ? parseInt(page, 10) : 1;
  const sort = sortBy || "created_at";

  return (
    <div className="w-full container mx-auto">
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
