
import type { StoreProduct } from "@/types/store";

type ProductInfoProps = {
	product: StoreProduct;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
	return (
		<div id="product-info">
			<div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
				<h2
					className="text-3xl md:text-4xl leading-10 text-ui-fg-base"
					data-testid="product-title"
				>
					{product.title}
				</h2>

				<div
					className="text-medium text-ui-fg-subtle whitespace-pre-line"
					data-testid="product-description"
				>
					{product.description}
				</div>
			</div>
		</div>
	);
};

export default ProductInfo;
