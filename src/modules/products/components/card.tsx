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
				<div className="flex flex-col mt-3 gap-0.5">
					<ProductPrice product={product} className="text-xl" />
					<div
						className="text-base leading-snug text-muted-foreground"
						data-testid="product-title"
					>
						{product.title}
					</div>
				</div>
			</div>
		</Link>
	);
}
