import React from "react";
import { notFound } from "next/navigation";
import { BlogPost } from "@/types/global";
import edjsHTML from "editorjs-html";
import Thumbnail from "../components/thumbnail";

type PostTemplateProps = {
	post: BlogPost;
};

const PostTemplate: React.FC<PostTemplateProps> = ({ post }) => {
	if (!post || !post.id) {
		return notFound();
	}

	const edjsParser = edjsHTML();
	const html = edjsParser.parse(post.body);

	return (
		<>
			<div
				className="content-container flex flex-col  py-6 relative max-w-[900px] w-full mx-auto sm:gap-x-12"
				data-testid="post-container"
			>
				<h1>{post.title}</h1>
				<h3 className="mb-4">
					Опубликовано:{" "}
					{new Date(post.created_at!).toLocaleDateString()}
				</h3>
				{post.thumbnail && <Thumbnail thumbnail={post.thumbnail} />}
				<div
					className="mt-4"
					dangerouslySetInnerHTML={{ __html: html }}
				></div>
			</div>
		</>
	);
};

export default PostTemplate;
