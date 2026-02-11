import { notFound, redirect } from "next/navigation";
import { listProducts } from "@lib/data/products";
import { getProductByHandle } from "@lib/data/products";
import ProductTemplate from "@modules/products/templates";
import { getSiteSettings } from "@/lib/data/site-settings";

type Props = {
	params: Promise<{ handle: string }>;
};

export async function generateStaticParams() {
	try {
		const { response } = await listProducts({
			queryParams: { limit: 100 },
		});
		return response.data
			.filter((product) => product.handle)
			.map((product) => ({
				handle: product.handle,
			}));
	} catch (error) {
		console.error(
			`Failed to generate static paths for product pages: ${
				error instanceof Error ? error.message : "Unknown error"
			}.`,
		);
		return [];
	}
}

export async function generateMetadata(props: Props) {
	const params = await props.params;
	const { handle } = params;

	const product = await getProductByHandle(handle);

	if (!product) {
		notFound();
	}

	return {
		title: `${product.title}`,
		description: `${product.title}`,
		alternates: {
			canonical: `/products/${handle}`,
		},
		openGraph: {
			title: `${product.title}`,
			description: `${product.title}`,
			images: product.thumbnail ? [product.thumbnail] : [],
		},
	};
}

export default async function ProductPage(props: Props) {
	const settings = await getSiteSettings();
	const showCatalog = settings?.showCatalog ?? true;

	if (!showCatalog) {
		redirect("/");
	}

	const params = await props.params;

	const product = await getProductByHandle(params.handle);

	if (!product) {
		notFound();
	}

	return <ProductTemplate product={product} />;
}
