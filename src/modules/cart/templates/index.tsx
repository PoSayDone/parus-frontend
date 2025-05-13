import ItemsTemplate from "./items";
import Summary from "./summary";
import EmptyCartMessage from "../components/empty-cart-message";
import SignInPrompt from "../components/sign-in-prompt";
import { HttpTypes } from "@medusajs/types";
import { Separator } from "@/components/ui/separator";

const CartTemplate = ({
	cart,
	customer,
}: {
	cart: HttpTypes.StoreCart | null;
	customer: HttpTypes.StoreCustomer | null;
}) => {
	return (
		<div className="py-12 mx-8">
			<div className="content-container" data-testid="cart-container">
				{cart?.items?.length ? (
					<div className="grid grid-cols-1 sm:grid-cols-[1fr_360px] gap-x-12">
						<div className="flex flex-col py-6 gap-y-6">
							{/* {!customer && (
								<>
									<SignInPrompt />
									<Separator />
								</>
							)} */}
							<ItemsTemplate cart={cart} />
						</div>
						<div className="relative">
							<div className="flex flex-col gap-y-8 sticky top-12">
								{cart && cart.region && (
									<>
										<div className=" py-6">
											<Summary cart={cart as any} />
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				) : (
					<div>
						<EmptyCartMessage />
					</div>
				)}
			</div>
		</div>
	);
};

export default CartTemplate;
