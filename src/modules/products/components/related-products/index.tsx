import { listProducts } from "@lib/data/products";
import { HttpTypes } from "@medusajs/types";
import { ProductCard } from "../card";

type RelatedProductsProps = {
	product: HttpTypes.StoreProduct;
};

export default async function RelatedProducts({
	product,
}: RelatedProductsProps) {
	// edit this function to define your related products logic
	const queryParams: HttpTypes.StoreProductParams = {};
	if (product.collection_id) {
		queryParams.collection_id = [product.collection_id];
	}
	if (product.tags) {
		queryParams.tag_id = product.tags
			.map((t) => t.id)
			.filter(Boolean) as string[];
	}
	queryParams.is_giftcard = false;

	const products = await listProducts({
		queryParams,
	}).then(({ response }) => {
		return response.products.filter(
			(responseProduct) => responseProduct.id !== product.id,
		);
	});

	if (!products.length) {
		return null;
	}

	return (
		<div className="product-page-constraint">
			<div className="flex flex-col items-center text-center mb-16">
				<span className="text-base text-muted-foreground mb-6">
					Похожие товары
				</span>
				<p className="text-2xl text-ui-fg-base max-w-lg">
					Возможно, вам также понравятся эти&nbsp;товары.
				</p>
			</div>

			<ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-6 gap-y-8">
				{products.map((product) => (
					<li key={product.id}>
						<ProductCard product={product} />
					</li>
				))}
			</ul>
		</div>
	);
}
