import Link from "next/link";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { cn } from "@/lib/utils";
import SkeletonBlogLandingGrid from "@/modules/skeletons/templates/skeleton-blog-landing-grid";
import PostsGrid from "./posts-grid";

type PostsProps = {
	title?: string;
	subtitle?: string;
	buttonLabel?: string;
	buttonHref?: string;
};

const DEFAULT_POSTS = {
	title: "Полезные статьи",
	subtitle: "Последние новости от нас.",
	buttonLabel: "Все статьи",
	buttonHref: "/blog",
};

export default function Posts({
	title = DEFAULT_POSTS.title,
	subtitle = DEFAULT_POSTS.subtitle,
	buttonLabel = DEFAULT_POSTS.buttonLabel,
	buttonHref = DEFAULT_POSTS.buttonHref,
}: PostsProps) {
	return (
		<Section
			id="posts"
			className="items-center md:px-0"
			title={title}
			subtitle={subtitle}
		>
			<Suspense fallback={<SkeletonBlogLandingGrid />}>
				<PostsGrid />
			</Suspense>
			<Link
				href={buttonHref}
				className={cn(
					buttonVariants({ variant: "default", size: "lg" }),
					"mt-4",
				)}
			>
				{buttonLabel}
			</Link>
		</Section>
	);
}
