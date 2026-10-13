import { cn } from "@/lib/utils";

type PriceProduct = {
	price: number;
};

export default function ProductPrice({
	product,
	className,
}: {
	product: PriceProduct;
	className?: string;
}) {
	const price = `${product.price.toLocaleString("ru-RU", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	})} ₽`;

	return (
		<span
			className={cn("text-2xl font-medium", className)}
			data-testid="product-price"
			data-value={product.price}
		>
			{price}
		</span>
	);
}
