import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ItemsPreviewTemplate from "@modules/cart/templates/preview";
import DiscountCode from "@modules/checkout/components/discount-code";
import CartTotals from "@modules/common/components/cart-totals";

const CheckoutSummary = ({ cart }: { cart: any }) => {
	return (
		<div className="sticky top-0 flex flex-col-reverse md:flex-col gap-y-8 py-8 md:py-0">
			<Card>
				<CardHeader>
					<h2 className="flex flex-row text-2xl font-medium">
						In your Cart
					</h2>
				</CardHeader>
				<CardContent className="pb-0">
					<CartTotals totals={cart} />
					<DiscountCode cart={cart} />
					{/* <ItemsPreviewTemplate cart={cart} /> */}
				</CardContent>
			</Card>
		</div>
	);
};

export default CheckoutSummary;
