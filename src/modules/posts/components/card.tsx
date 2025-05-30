import Link from "next/link";
import { BlogPost } from "@/types/global";
import Thumbnail from "./thumbnail";

export function PostCard({ post }: { post: BlogPost }) {
	return (
		<Link href={`/blog/post/${post.handle}`} className="group">
			<div data-testid="post-wrapper">
				{post.thumbnail && <Thumbnail thumbnail={post.thumbnail} />}
				<div className="flex flex-col text-sm mt-2 justify-between">
					<div className="font-medium" data-testid="post-title">
						{post.title}
					</div>
				</div>
			</div>
		</Link>
	);
}
