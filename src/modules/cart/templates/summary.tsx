"use client";

import CartTotals from "@modules/common/components/cart-totals";
import DiscountCode from "@modules/checkout/components/discount-code";
import Link from "next/link";
import { HttpTypes } from "@medusajs/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
		<Card>
			<CardHeader>
				<CardTitle className="text-3xl font-medium">
					В вашей корзине
				</CardTitle>
				<DiscountCode cart={cart} />
			</CardHeader>
			<CardContent className="flex flex-col gap-y-4">
				<CartTotals totals={cart} />
				<Link
					href={"/checkout?step=" + step}
					data-testid="checkout-button"
				>
					<Button className="w-full">Перейти к оформлению</Button>
				</Link>
			</CardContent>
		</Card>
	);
};

export default Summary;
