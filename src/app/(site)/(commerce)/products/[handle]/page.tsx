import { notFound } from "next/navigation";
import { getProductByHandle } from "@lib/data/products";
import ProductTemplate from "@modules/products/templates";

type Props = {
	params: Promise<{ handle: string }>;
};

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
		openGraph: {
			title: `${product.title}`,
			description: `${product.title}`,
			images: product.thumbnail ? [product.thumbnail] : [],
		},
	};
}

export default async function ProductPage(props: Props) {
	const params = await props.params;

	const product = await getProductByHandle(params.handle);

	if (!product) {
		notFound();
	}

	return <ProductTemplate product={product} />;
}
