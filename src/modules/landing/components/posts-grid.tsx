import { listPosts } from "@/lib/data/blog";
import { PostCard } from "@/modules/posts/components/card";

export default async function PostsGrid() {
	const {
		response: { data: posts },
	} = await listPosts({
		queryParams: {
			limit: 4,
		},
	});

	return (
		<div className="grid columns-2 max-w-[1200px] w-full text-left justify-between items-start self-center grid-cols-1 md:grid-cols-2 gap-4">
			{posts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	);
}
