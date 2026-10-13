"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useContactModal } from "@/lib/hooks/use-contact-modal";
import { cn } from "@/lib/utils";
import type { StoreProduct } from "@/types/store";

type MobileActionsProps = {
	product: StoreProduct;
};

const MobileActions: React.FC<MobileActionsProps> = ({ product }) => {
	const { openModal: handleContactClick } = useContactModal();

	const price = {
		calculated_price_number: product.price,
		calculated_price: `₽${product.price.toFixed(2)}`,
		original_price_number: product.price,
		original_price: `₽${product.price.toFixed(2)}`,
		currency_code: "RUB",
		price_type: "default",
		percentage_diff: "0",
	};

	return (
		<>
			<div
				className={cn(
					"lg:hidden inset-x-0 bottom-0 fixed z-10 bg-background",
				)}
			>
				<div
					className="flex flex-col gap-y-3 justify-center items-center p-4 h-full w-full border-t"
					data-testid="mobile-actions"
				>
					<div className="flex items-center gap-x-2">
						<span className="text-muted-foreground" data-testid="mobile-title">
							{product.title}
						</span>
						{price ? (
							<div className="flex items-end gap-x-2 font-medium">
								{price.price_type === "sale" && (
									<p>
										<span className="line-through text-sm">
											{price.original_price}
										</span>
									</p>
								)}
								<span>
									{price.calculated_price}
								</span>
							</div>
						) : (
							<div></div>
						)}
					</div>
					<Button
						onClick={() => handleContactClick(`Товар: ${product.title}`)}
						className="w-full"
						data-testid="mobile-cart-button"
					>
						Купить
					</Button>
				</div>
			</div>
			<Sheet open={false} onOpenChange={() => {}}>
				<div className="fixed bottom-0 inset-x-0">
					<div className="flex min-h-full h-full items-center justify-center text-center">
						<SheetContent
							side="bottom"
							className="transform overflow-hidden text-left flex flex-col gap-y-3"
							data-testid="mobile-actions-modal"
						>
							<SheetTitle className="sr-only">
								Product Actions
							</SheetTitle>
							<div className="px-6 py-12">
								{/* No variants to display */}
							</div>
						</SheetContent>
					</div>
				</div>
			</Sheet>
		</>
	);
};

export default MobileActions;
