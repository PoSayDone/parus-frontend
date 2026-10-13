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
				formatted = format(date, "d MMMM yyyy", {
					locale: ru,
				});
			}
		} catch (_e) {}
	}

	return (
		<Link href={`/blog/post/${post.handle}`} className="group flex flex-col">
			<Thumbnail
				thumbnail={post.thumbnail}
				className="bg-secondary-container transition-colors group-hover:border-primary/40"
			/>
			{formatted && (
				<div className="mt-4 text-sm text-muted-foreground">
					{formatted}
				</div>
			)}
			<h3 className="text-xl lg:text-2xl font-medium leading-tight mt-1">
				{post.title}
			</h3>
			<p className="text-base text-muted-foreground mt-2 line-clamp-3">
				{post.description}
			</p>
		</Link>
	);
}
