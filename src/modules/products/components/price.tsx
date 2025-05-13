import { cn } from "@/lib/utils";
import { VariantPrice } from "types/global";

export async function PreviewPrice({ price }: { price: VariantPrice }) {
	if (!price) {
		return null;
	}

	return (
		<>
			{price.price_type === "sale" && (
				<div
					className="line-through text-ui-fg-muted"
					data-testid="original-price"
				>
					{price.original_price}
				</div>
			)}
			<div
				className={cn("text-ui-fg-muted", {
					"text-ui-fg-interactive": price.price_type === "sale",
				})}
				data-testid="price"
			>
				{price.calculated_price}
			</div>
		</>
	);
}
