import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { listPosts } from "@/lib/data/blog";
import PostTemplate from "@/modules/posts/templates";

type Props = {
	params: Promise<{ handle: string }>;
};

export async function generateStaticParams() {
	try {
		const { response } = await listPosts({
			queryParams: { limit: 100 },
		});

		return response.data.filter((param) => param.handle);
	} catch (error) {
		console.error(
			`Failed to generate static paths for post pages: ${
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
		queryParams: { handle },
	}).then(({ response }) => response.data[0]);

	if (!post) {
		notFound();
	}
	
	// Определяем корректный путь для SEO
		let path = `/blog/post/${handle}`;
		if (post.type === "document") path = `/document/${handle}`;
		if (post.type === "info") path = `/info/${handle}`;

	return {
		title: `${post.seoTitle || post.title} | Парус`,
		description: `${post.seoDescription || post.description || post.title}`,
		alternates: {
        canonical: path, // Заменяем статичную строку на переменную path
		},
		openGraph: {
			title: `${post.seoTitle || post.title} | Парус`,
			description: `${post.seoDescription || post.description || post.title}`,
			images: post.thumbnail ? [post.thumbnail] : [],
		},
	};
}

export default async function ProductPage(props: Props) {
	const params = await props.params;

	const post = await listPosts({
		queryParams: { handle: params.handle },
	}).then(({ response }) => response.data[0]);

	if (!post) {
		notFound();
	}

	if (post.type === "document" || post.type === "info") {
    permanentRedirect(`/${post.type}/${params.handle}`);
}

	return <PostTemplate post={post} />;
}
