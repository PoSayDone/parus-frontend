import { Suspense } from "react";

import { TypographyH1 } from "@/components/typography";
import Breadcrumbs from "@/components/ui/breadcrumbs";
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
    <div className="w-full">
      <Breadcrumbs items={[{ label: "Статьи", href: "/blog" }]} />
      <TypographyH1 className="page-header" data-testid="store-page-title">
        Статьи
      </TypographyH1>
      <Suspense fallback={<SkeletonBlogGrid />}>
        <PaginatedPosts sortBy={sort} page={pageNumber} />
      </Suspense>
    </div>
  );
};

export default BlogTemplate;
