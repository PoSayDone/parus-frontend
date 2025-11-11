import type React from "react";
import { notFound } from "next/navigation";
import edjsHTML from "editorjs-html";
import Thumbnail from "../components/thumbnail";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import _ from "lodash";
import type { BlogPost } from "@/types/admin";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { OutputData } from "@editorjs/editorjs";

type PostTemplateProps = {
	post: BlogPost;
};

const PostTemplate: React.FC<PostTemplateProps> = ({ post }) => {
	if (!post || !post.id) {
		return notFound();
	}

	const edjsParser = edjsHTML();
	const html = !_.isEmpty(post.body)
		? edjsParser.parse(post.body as OutputData)
		: "";

	let formatted = "";

	if (post.createdAt && post.createdAt !== "null") {
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
		<div
				className="content-container flex flex-col py-6 relative max-w-[800px] w-full mx-auto sm:gap-x-12"
				data-testid="post-container"
			>
				<h1 className="text-3xl md:text-4xl">{post.title}</h1>
				{post.views > 10 && (
					<Badge variant={"outline"} className="mt-2">
						<Eye />
						{post.views}
					</Badge>
				)}
				{formatted && (
					<h3 className="my-2 md:my-4 font-normal">{formatted}</h3>
				)}
				{post.thumbnail && (
					<Thumbnail className="mt-4" thumbnail={post.thumbnail} />
				)}
				<div
					className="mt-2 gap-2 md:mt-4 md:gap-4 text-[17px] flex flex-col"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</div>
	);
};

export default PostTemplate;
