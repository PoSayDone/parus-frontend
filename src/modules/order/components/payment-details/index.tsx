import { Container, Heading, p } from "@medusajs/ui";

import { isStripe, paymentInfoMap } from "@lib/constants";
import { convertToLocale } from "@lib/util/money";
import { HttpTypes } from "@medusajs/types";
import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";

type PaymentDetailsProps = {
	order: HttpTypes.StoreOrder;
};

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
	const payment = order.payment_collections?.[0].payments?.[0];

	return (
		<div>
			<h2 className="flex flex-row p-3xl-regular my-6 text-xl font-medium">
				Оплата
			</h2>
			<div>
				{payment && (
					<div className="flex items-start gap-x-1 w-full">
						<div className="flex flex-col w-1/3">
							<p className="text-lg font-medium p-ui-fg-base mb-1">
								Способ оплаты
							</p>
							<p
								className="text-lg p-ui-fg-subtle"
								data-testid="payment-method"
							>
								{paymentInfoMap[payment.provider_id].title}
							</p>
						</div>
						<div className="flex flex-col w-2/3">
							<p className="text-lg font-medium p-ui-fg-base mb-1">
								Детали оплаты
							</p>
							<div className="flex gap-2 text-lg p-ui-fg-subtle items-center">
								<div className="flex items-center h-7 w-fit pr-2 bg-ui-button-neutral-hover">
									{paymentInfoMap[payment.provider_id]
										.icon || <CreditCard />}
								</div>
								<p data-testid="payment-amount">
									{isStripe(payment.provider_id) &&
									payment.data?.card_last4
										? `**** **** **** ${payment.data.card_last4}`
										: `${convertToLocale({
												amount: payment.amount,
												currency_code:
													order.currency_code,
											})} оплачено ${new Date(
												payment.created_at ?? "",
											).toLocaleString("ru")}`}
								</p>
							</div>
						</div>
					</div>
				)}
			</div>

			<Separator className="mt-8" />
		</div>
	);
};

export default PaymentDetails;
