import { listPosts } from "@/lib/data/blog";
import { PostCard } from "@/modules/posts/components/card";
import ListPlaceholder from "./list-placeholder";

export default async function PostsGrid() {
	const {
		response: { data: posts, count },
	} = await listPosts({
		queryParams: {
			type: "article",
			limit: 4,
		},
	});

	if (count === 0) {
		return <ListPlaceholder text="На данный момент статьи не доступны" />;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 w-full">
			{posts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	);
}
