"use client";

import type { StoreProduct } from "@/types/store";
import ProductPrice from "../product-price";
import { Button } from "@/components/ui/button";
import { useContactModal } from "@/lib/hooks/use-contact-modal";

type ProductActionsProps = {
	product: StoreProduct;
	disabled?: boolean;
};

export default function ProductActions({
	product,
	disabled,
}: ProductActionsProps) {
	const { openModal: openContactModal } = useContactModal();

	const handleContactClick = () => {
		openContactModal();
	};

	return (
		<div className="flex flex-col gap-y-2 bg-card p-4 rounded-3xl">
			<div className="mb-6">
				<ProductPrice product={product} />
			</div>
			<Button
				onClick={handleContactClick}
				disabled={!!disabled}
				className="w-full"
				data-testid="contact-button"
			>
				Купить
			</Button>
		</div>
	);
}
