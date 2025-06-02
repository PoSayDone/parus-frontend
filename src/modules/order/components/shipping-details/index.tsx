import { Separator } from "@/components/ui/separator";
import { convertToLocale } from "@lib/util/money";
import { HttpTypes } from "@medusajs/types";
import { Heading, p } from "@medusajs/ui";

type ShippingDetailsProps = {
	order: HttpTypes.StoreOrder;
};

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
	return (
		<div>
			<h2 className="flex flex-row p-3xl-regular my-6 text-xl font-medium">
				Данные
			</h2>
			<div className="flex items-start gap-x-8">
				{/* <div
					className="flex flex-col w-1/3"
					data-testid="shipping-address-summary"
				>
					<p className="text-xl font-medium p-ui-fg-base mb-1">
						Адрес доставки
					</p>
					<p className="text-lg p-ui-fg-subtle">
						{order.shipping_address?.first_name}{" "}
						{order.shipping_address?.last_name}
					</p>
					<p className="text-lg p-ui-fg-subtle">
						{order.shipping_address?.address_1}{" "}
						{order.shipping_address?.address_2}
					</p>
					<p className="text-lg p-ui-fg-subtle">
						{order.shipping_address?.postal_code},{" "}
						{order.shipping_address?.city}
					</p>
					<p className="text-lg p-ui-fg-subtle">
						{order.shipping_address?.country_code?.toUpperCase()}
					</p>
				</div> */}
				<div
					className="flex flex-col w-1/3 "
					data-testid="shipping-contact-summary"
				>
					<p className="text-lg font-medium mb-1">Контакт</p>
					<p className="text-lg p-ui-fg-subtle">
						{order.shipping_address?.phone}
					</p>
					<p className="text-lg p-ui-fg-subtle">{order.email}</p>
				</div>

				<div
					className="flex flex-col w-1/3"
					data-testid="shipping-method-summary"
				>
					<p className="text-lg font-medium mb-1">Способ доставки</p>
					<p className="text-lg">
						{(order as any).shipping_methods[0]?.name} (
						{convertToLocale({
							amount: order.shipping_methods?.[0].total ?? 0,
							currency_code: order.currency_code,
						})
							.replace(/,/g, "")
							.replace(/\./g, ",")}
						)
					</p>
				</div>
			</div>
			<Separator className="mt-8" />
		</div>
	);
};

export default ShippingDetails;
