import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listPosts } from "@/lib/data/blog";
import PostTemplate from "@/modules/posts/templates";

type Props = {
	params: Promise<{ handle: string }>;
};

export async function generateStaticParams() {
	try {
		const { response } = await listPosts({
			queryParams: { limit: 100, type: ["document"] },
		});

		return response.data.filter((param) => param.handle);
	} catch (error) {
		console.error(
			`Failed to generate static paths for document pages: ${
				error instanceof Error ? error.message : "Unknown error"
			}.`,
		);
		return [];
	}
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = await props.params;
	const { handle } = params;

	const post = await listPosts({
		queryParams: { handle, type: ["document"] },
	}).then(({ response }) => response.data[0]);

	if (!post) {
		notFound();
	}

	return {
		title: `${post.title} | Парус`,
		description: `${post.title}`,
		openGraph: {
			title: `${post.title} | Парус`,
			description: `${post.title}`,
			images: post.thumbnail ? [post.thumbnail] : [],
		},
	};
}

export default async function ProductPage(props: Props) {
	const params = await props.params;

	const post = await listPosts({
		queryParams: { handle: params.handle, type: ["document"] },
	}).then(({ response }) => response.data[0]);

	if (!post) {
		notFound();
	}

	return <PostTemplate post={post} />;
}
