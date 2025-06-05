import Link from "next/link";
import { BlogPost } from "@/types/global";
import Thumbnail from "./thumbnail";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export function PostCard({ post }: { post: BlogPost }) {
	let formatted = format(new Date(post.created_at!), "LLLL dd, yyyy", {
		locale: ru,
	});
	formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);

	return (
		<Link href={`/blog/post/${post.handle}`} className="flex flex-col">
			{post.thumbnail && (
				<Thumbnail
					thumbnail={post.thumbnail}
					className="rounded-3xl bg-secondary-container"
				/>
			)}
			<div className="text-lg mt-2">{formatted}</div>
			<h3 className="text-2xl font-medium mt-1">{post.title}</h3>
			{/* <p className="text-xl mt-2">{post.body}</p> */}
		</Link>
	);
}
