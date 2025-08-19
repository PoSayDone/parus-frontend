import Link from "next/link";
import { BlogPost } from "@/types/global";
import Thumbnail from "./thumbnail";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export function PostCard({ post }: { post: BlogPost }) {
	let formatted = "";

	// Check if created_at is a valid date string
	if (post.created_at && post.created_at !== "null") {
		try {
			const date = new Date(post.created_at);
			if (!isNaN(date.getTime())) {
				formatted = format(date, "LLLL dd, yyyy", {
					locale: ru,
				});
				formatted =
					formatted.charAt(0).toUpperCase() + formatted.slice(1);
			}
		} catch (e) {
			// If date parsing fails, leave formatted as empty string
		}
	}

	return (
		<Link href={`/blog/post/${post.handle}`} className="flex flex-col">
			<Thumbnail
				thumbnail={post.thumbnail}
				className="rounded-3xl bg-secondary-container"
			/>
			{formatted && <div className="text-lg mt-2">{formatted}</div>}
			<h3 className="text-2xl font-medium mt-1">{post.title}</h3>
			{/* <p className="text-xl mt-2">{post.body}</p> */}
		</Link>
	);
}
