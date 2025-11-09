import Link from "next/link";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { cn } from "@/lib/utils";
import SkeletonBlogLandingGrid from "@/modules/skeletons/templates/skeleton-blog-landing-grid";
import PostsGrid from "./posts-grid";

export default function Posts() {
	return (
		<Section
			id="posts"
			className="items-center md:px-0"
			title="Полезные статьи"
			subtitle="Последние новости от нас."
		>
			<Suspense fallback={<SkeletonBlogLandingGrid />}>
				<PostsGrid />
			</Suspense>
			<Link
				href="/blog"
				className={cn(
					buttonVariants({ variant: "default", size: "lg" }),
					"mt-4",
				)}
			>
				Все статьи
			</Link>
		</Section>
	);
}
