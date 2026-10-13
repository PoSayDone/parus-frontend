
import type { StoreProduct } from "@/types/store";

type ProductInfoProps = {
	product: StoreProduct;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
	return (
		<div id="product-info">
			<div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
				<h1
					className="text-3xl lg:text-4xl font-medium leading-tight text-balance"
					data-testid="product-title"
				>
					{product.title}
				</h1>

				<div
					className="text-muted-foreground whitespace-pre-line"
					data-testid="product-description"
				>
					{product.description}
				</div>
			</div>
		</div>
	);
};

export default ProductInfo;
