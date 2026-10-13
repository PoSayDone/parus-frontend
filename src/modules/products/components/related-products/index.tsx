import { listProducts } from "@/lib/data/products";
import type { StoreProduct } from "@/types/store";
import { ProductCard } from "../card";

type RelatedProductsProps = {
	product: StoreProduct;
};

export default async function RelatedProducts({
	product,
}: RelatedProductsProps) {
	const { response } = await listProducts({
		queryParams: {
			limit: 5,
		},
	});

	const products = response.data.filter(
		(responseProduct) => responseProduct.id !== product.id,
	);

	if (!products.length) {
		return null;
	}

	return (
		<div>
			<h2 className="text-2xl lg:text-3xl font-medium mb-6">Похожие товары</h2>

			<ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
				{products.map((product) => (
					<li key={product.id}>
						<ProductCard product={product} />
					</li>
				))}
			</ul>
		</div>
	);
}
