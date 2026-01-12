import Link from "next/link";
import Thumbnail from "./thumbnail";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import type { BlogPost } from "@/types/admin";

export function PostCard({ post }: { post: BlogPost }) {
	let formatted = "";

	if (post.createdAt) {
		try {
			const date = new Date(post.createdAt);
			if (!Number.isNaN(date.getTime())) {
				formatted = format(date, "LLLL dd, yyyy", {
					locale: ru,
				});
				formatted =
					formatted.charAt(0).toUpperCase() + formatted.slice(1);
			}
		} catch (_e) {}
	}

	return (
		<Link href={`/blog/post/${post.handle}`} className="flex flex-col">
			<Thumbnail
				thumbnail={post.thumbnail}
				className="rounded-3xl bg-secondary-container"
			/>
			{formatted && (
				<div className="text mt-2 text-muted-foreground">
					{formatted}
				</div>
			)}
			<h3 className="text-2xl font-medium mt-1">{post.title}</h3>
			<p className="text-xl mt-1">{post.description}</p>
		</Link>
	);
}
