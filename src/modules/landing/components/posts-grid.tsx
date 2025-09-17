import { listPosts } from "@/lib/data/blog";
import { PostCard } from "@/modules/posts/components/card";

export default async function PostsGrid() {
	const {
		response: { data: posts, count },
	} = await listPosts({
		queryParams: {
			limit: 4,
		},
	});

	if (count === 0) {
		return (
			<div className="w-full">
				<div className="px-8 py-16 flex items-center justify-center bg-card text-card-foreground h-[420px]">
					<p className="text-center text-muted-foreground">
						На данный момент ритуальные товары не доступны
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="grid columns-2 max-w-[1200px] w-full text-left justify-between items-start self-center grid-cols-1 md:grid-cols-2 gap-4">
			{posts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	);
}
