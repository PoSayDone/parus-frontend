import { listPosts } from "@/lib/data/blog";
import Link from "next/link";

export default async function FooterDocuments() {
	const {
		response: { data: posts },
	} = await listPosts({
		page: 1,
		queryParams: {
			type: "document",
		},
	});

	return (
		<ul className="flex flex-col gap-2">
			{posts.map((post) => (
				<li key={post.id}>
					<Link href={`/document/${post.handle}`} className="text-sm hover:underline">
						{post.title}
					</Link>
				</li>
			))}
		</ul>
	);
}
