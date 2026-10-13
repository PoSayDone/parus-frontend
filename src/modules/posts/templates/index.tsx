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
import { TypographyH1 } from "@/components/typography";
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
		? edjsParser.parse(post.body as unknown as OutputData)
		: "";

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
		<div
				className="flex flex-col relative w-full max-w-4xl"
				data-testid="post-container"
			>
				<TypographyH1 className="lg:text-5xl">{post.title}</TypographyH1>
				{post.views > 10 && (
					<Badge variant={"outline"} className="mt-4">
						<Eye />
						{post.views}
					</Badge>
				)}
				{formatted && post.type !== "document" && (
					<p className="mt-4 text-sm text-muted-foreground">{formatted}</p>
				)}
				{post.thumbnail && (
					<Thumbnail className="mt-6" thumbnail={post.thumbnail} />
				)}
				<div
					className="rich-text mt-8"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</div>
	);
};

export default PostTemplate;
