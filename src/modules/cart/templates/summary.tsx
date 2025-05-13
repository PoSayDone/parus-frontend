"use client";

import CartTotals from "@modules/common/components/cart-totals";
import DiscountCode from "@modules/checkout/components/discount-code";
import Link from "next/link";
import { HttpTypes } from "@medusajs/types";
import { Button } from "@/components/ui/button";

type SummaryProps = {
	cart: HttpTypes.StoreCart & {
		promotions: HttpTypes.StorePromotion[];
	};
};

function getCheckoutStep(cart: HttpTypes.StoreCart) {
	if (!cart?.shipping_address?.address_1 || !cart.email) {
		return "address";
	} else if (cart?.shipping_methods?.length === 0) {
		return "delivery";
	} else {
		return "payment";
	}
}

const Summary = ({ cart }: SummaryProps) => {
	const step = getCheckoutStep(cart);

	return (
		<div className="flex flex-col gap-y-4">
			<h2 className="text-3xl font-medium">Summary</h2>
			<DiscountCode cart={cart} />
			<CartTotals totals={cart} />
			<Link href={"/checkout?step=" + step} data-testid="checkout-button">
				<Button className="w-full">Go to checkout</Button>
			</Link>
		</div>
	);
};

export default Summary;
