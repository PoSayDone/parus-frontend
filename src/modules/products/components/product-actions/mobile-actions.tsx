import React, { Fragment, useMemo, useState } from "react";

import useToggleState from "@lib/hooks/use-toggle-state";

import { getProductPrice } from "@lib/util/get-product-price";
import OptionSelect from "./option-select";
import { HttpTypes } from "@medusajs/types";
import { isSimpleProduct } from "@lib/util/product";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

type MobileActionsProps = {
	product: HttpTypes.StoreProduct;
	variant?: HttpTypes.StoreProductVariant;
	options: Record<string, string | undefined>;
	updateOptions: (title: string, value: string) => void;
	inStock?: boolean;
	handleAddToCart: () => void;
	isAdding?: boolean;
	show: boolean;
	optionsDisabled: boolean;
};

const MobileActions: React.FC<MobileActionsProps> = ({
	product,
	variant,
	options,
	updateOptions,
	inStock,
	handleAddToCart,
	isAdding,
	show,
	optionsDisabled,
}) => {
	const [open, setOpen] = useState(false);

	const price = getProductPrice({
		product: product,
		variantId: variant?.id,
	});

	const selectedPrice = useMemo(() => {
		if (!price) {
			return null;
		}
		const { variantPrice, cheapestPrice } = price;

		return variantPrice || cheapestPrice || null;
	}, [price]);

	const isSimple = isSimpleProduct(product);

	return (
		<>
			<div
				className={cn(
					"lg:hidden inset-x-0 bottom-0 fixed z-10 bg-background",
					!show && "pointer-events-none",
				)}
			>
				<div
					className="flex flex-col gap-y-3 justify-center items-center text-large-regular p-4 h-full w-full border-t z-[20]"
					data-testid="mobile-actions"
				>
					<div className="flex items-center gap-x-2">
						<span data-testid="mobile-title">{product.title}</span>
						<span>—</span>
						{selectedPrice ? (
							<div className="flex items-end gap-x-2 text-ui-fg-base">
								{selectedPrice.price_type === "sale" && (
									<p>
										<span className="line-through text-small-regular">
											{selectedPrice.original_price}
										</span>
									</p>
								)}
								<span
									className={cn({
										"text-ui-fg-interactive":
											selectedPrice.price_type === "sale",
									})}
								>
									{selectedPrice.calculated_price}
								</span>
							</div>
						) : (
							<div></div>
						)}
					</div>
					<div
						className={cn("grid grid-cols-2 w-full gap-x-4", {
							"!grid-cols-1": isSimple,
						})}
					>
						{!isSimple && (
							<Button
								onClick={() => setOpen(true)}
								variant="secondary"
								className="w-full"
								data-testid="mobile-actions-button"
							>
								<div className="flex items-center justify-between w-full">
									<span>
										{variant
											? Object.values(options).join(" / ")
											: "Вариант"}
									</span>
									<ChevronDown />
								</div>
							</Button>
						)}
						<Button
							onClick={handleAddToCart}
							disabled={!inStock || !variant}
							className="w-full"
							isLoading={isAdding}
							data-testid="mobile-cart-button"
						>
							{!variant
								? "Select variant"
								: !inStock
									? "Out of stock"
									: "Add to cart"}
						</Button>
					</div>
				</div>
			</div>
			<Sheet open={open} onOpenChange={setOpen}>
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
								{(product.variants?.length ?? 0) > 1 && (
									<div className="flex flex-col gap-y-6">
										{(product.options || []).map(
											(option) => {
												return (
													<div key={option.id}>
														<OptionSelect
															option={option}
															current={
																options[
																	option.id
																]
															}
															updateOption={
																updateOptions
															}
															title={
																option.title ??
																""
															}
															disabled={
																optionsDisabled
															}
														/>
													</div>
												);
											},
										)}
									</div>
								)}
							</div>
						</SheetContent>
					</div>
				</div>
			</Sheet>
		</>
	);
};

export default MobileActions;
