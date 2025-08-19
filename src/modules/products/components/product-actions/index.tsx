"use client";

import { StoreProduct } from "@/types/store";
import ProductPrice from "../product-price";
import MobileActions from "./mobile-actions";
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
		<>
			<div className="flex flex-col gap-y-2">
				<ProductPrice product={product} />
				<Button
					onClick={handleContactClick}
					disabled={!!disabled}
					className="w-full"
					data-testid="contact-button"
				>
					Купить
				</Button>
				<MobileActions
					product={product}
					handleContactClick={handleContactClick}
					show={!false}
					optionsDisabled={!!disabled}
				/>
			</div>
		</>
	);
}
