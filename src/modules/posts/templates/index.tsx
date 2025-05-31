import React from "react";
import { notFound } from "next/navigation";
import { BlogPost } from "@/types/global";
import edjsHTML from "editorjs-html";
import Thumbnail from "../components/thumbnail";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

type PostTemplateProps = {
	post: BlogPost;
};

const PostTemplate: React.FC<PostTemplateProps> = ({ post }) => {
	if (!post || !post.id) {
		return notFound();
	}

	const edjsParser = edjsHTML();
	const html = edjsParser.parse(post.body);

	let formatted = format(new Date(post.created_at!), "LLLL dd, yyyy", {
		locale: ru,
	});
	formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);

	return (
		<>
			<div
				className="content-container flex flex-col py-6 relative max-w-[800px] w-full mx-auto sm:gap-x-12"
				data-testid="post-container"
			>
				<h1 className="text-3xl md:text-5xl">{post.title}</h1>
				<h3 className="my-2 md:my-4">{formatted}</h3>
				{post.thumbnail && <Thumbnail thumbnail={post.thumbnail} />}
				<div
					className="mt-2 gap-2 md:mt-4 md:gap-4 text-[17px] flex flex-col"
					dangerouslySetInnerHTML={{ __html: html }}
				></div>
			</div>
		</>
	);
};

export default PostTemplate;
