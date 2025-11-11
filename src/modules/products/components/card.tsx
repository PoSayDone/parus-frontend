import Link from "next/link";
import Thumbnail from "./thumbnail";
import type { Product } from "@/types/admin";
import ProductPrice from "./product-price";

export function ProductCard({
	product,
	isFeatured,
}: {
	product: Product;
	isFeatured?: boolean;
}) {
	return (
		<Link href={`/products/${product.handle}`} className="group">
			<div data-testid="product-wrapper">
				<Thumbnail
					thumbnail={product.thumbnail}
					images={product.images}
					size="full"
					isFeatured={isFeatured}
				/>
				<div className="flex flex-col text-base mt-2 justify-between">
					<div className="flex items-center gap-x-2">
						<ProductPrice product={product} />
					</div>
					<div data-testid="product-title">{product.title}</div>
				</div>
			</div>
		</Link>
	);
}
