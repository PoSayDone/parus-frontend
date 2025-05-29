"use client";

import { setAddresses } from "@lib/data/cart";
import compareAddresses from "@lib/util/compare-addresses";
import { HttpTypes } from "@medusajs/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useActionState } from "react";
import BillingAddress from "../billing_address";
import ErrorMessage from "../error-message";
import ShippingAddress from "../shipping-address";
import { SubmitButton } from "../submit-button";
import useToggleState from "@/lib/hooks/use-toggle-state";
import { CheckCircle2, Loader } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Addresses = ({
	cart,
	customer,
}: {
	cart: HttpTypes.StoreCart | null;
	customer: HttpTypes.StoreCustomer | null;
}) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const isOpen = searchParams.get("step") === "address";

	const { state: sameAsBilling, toggle: toggleSameAsBilling } =
		useToggleState(
			cart?.shipping_address && cart?.billing_address
				? compareAddresses(
						cart?.shipping_address,
						cart?.billing_address,
					)
				: true,
		);

	const handleEdit = () => {
		router.push(pathname + "?step=address");
	};

	const [message, formAction] = useActionState(setAddresses, null);

	return (
		<div className="bg-background">
			<div className="flex flex-row items-center justify-between mb-6">
				<h2 className="flex flex-row text-3xl gap-x-2 items-baseline">
					Данные для доставки
					{!isOpen && <CheckCircle2 />}
				</h2>
				{!isOpen && cart?.shipping_address && (
					<Button
						size={"sm"}
						variant={"ghost"}
						onClick={handleEdit}
						data-testid="edit-address-button"
					>
						Изменить
					</Button>
				)}
			</div>
			{isOpen ? (
				<form action={formAction}>
					<div className="pb-8">
						<ShippingAddress
							customer={customer}
							checked={sameAsBilling}
							onChange={toggleSameAsBilling}
							cart={cart}
						/>

						{!sameAsBilling && (
							<div>
								<h2 className="text-3xl-regular gap-x-4 pb-6 pt-8">
									Billing address
								</h2>

								<BillingAddress cart={cart} />
							</div>
						)}
						<SubmitButton
							className="mt-6"
							data-testid="submit-address-button"
						>
							Перейти к доставке
						</SubmitButton>
						<ErrorMessage
							error={message}
							data-testid="address-error-message"
						/>
					</div>
				</form>
			) : (
				<div>
					<div className="text-small-regular">
						{cart && cart.shipping_address ? (
							<div className="flex items-start gap-x-8">
								<div className="flex items-start gap-x-1 w-full">
									<div
										className="flex flex-col w-1/2"
										data-testid="shipping-address-summary"
									>
										<p className="txt-medium-plus text-ui-fg-base mb-1">
											Адрес доставки
										</p>
										<p className="txt-medium text-ui-fg-subtle">
											{cart.shipping_address.first_name}{" "}
											{cart.shipping_address.last_name}
										</p>
										<p className="txt-medium text-ui-fg-subtle">
											{cart.shipping_address.address_1}{" "}
											{cart.shipping_address.address_2}
										</p>
										<p className="txt-medium text-ui-fg-subtle">
											{cart.shipping_address.postal_code},{" "}
											{cart.shipping_address.city}
										</p>
										<p className="txt-medium text-ui-fg-subtle">
											{cart.shipping_address.country_code?.toUpperCase()}
										</p>
									</div>

									<div
										className="flex flex-col w-1/2"
										data-testid="shipping-contact-summary"
									>
										<p className="txt-medium-plus text-ui-fg-base mb-1">
											Контакт
										</p>
										<p className="txt-medium text-ui-fg-subtle">
											{cart.shipping_address.phone}
										</p>
										<p className="txt-medium text-ui-fg-subtle">
											{cart.email}
										</p>
									</div>
								</div>
							</div>
						) : (
							<div>
								<Loader className="animate-spin" />
							</div>
						)}
					</div>
				</div>
			)}
			<Separator className="mt-8" />
		</div>
	);
};

export default Addresses;
