import { HttpTypes } from "@medusajs/types";
import Link from "next/link";

type ProductInfoProps = {
	product: HttpTypes.StoreProduct;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
	return (
		<div id="product-info">
			<div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
				{product.collection && (
					<Link
						href={`/collections/${product.collection.handle}`}
						className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
					>
						{product.collection.title}
					</Link>
				)}
				<h2
					className="text-3xl leading-10 text-ui-fg-base"
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
