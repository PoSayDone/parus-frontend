import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DiscountCode from "@modules/checkout/components/discount-code";
import CartTotals from "@modules/common/components/cart-totals";

const CheckoutSummary = ({ cart }: { cart: any }) => {
	return (
		<div className="sticky top-22 flex flex-col-reverse md:flex-col gap-y-8 py-8 md:py-0">
			<Card>
				<CardHeader>
					<CardTitle className="text-3xl font-medium">
						В вашей корзине
					</CardTitle>
					<DiscountCode cart={cart} />
				</CardHeader>
				<CardContent className="pb-0">
					<CartTotals totals={cart} />
					{/* <ItemsPreviewTemplate cart={cart} /> */}
				</CardContent>
			</Card>
		</div>
	);
};

export default CheckoutSummary;
