"use client";

import { convertToLocale } from "@lib/util/money";
import React from "react";

type CartTotalsProps = {
	totals: {
		total?: number | null;
		subtotal?: number | null;
		tax_total?: number | null;
		shipping_total?: number | null;
		discount_total?: number | null;
		gift_card_total?: number | null;
		currency_code: string;
		shipping_subtotal?: number | null;
	};
};

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
	const {
		currency_code,
		total,
		subtotal,
		tax_total,
		discount_total,
		gift_card_total,
		shipping_subtotal,
	} = totals;

	return (
		<div className="w-full">
			<div className="flex flex-col gap-y-2 text-sm text-muted-foreground ">
				<div className="flex items-center justify-between gap-2">
					<span className="flex gap-x-2 items-center">
						Промежуточный итог
					</span>
					<span
						data-testid="cart-subtotal"
						data-value={subtotal || 0}
					>
						{convertToLocale({
							amount: subtotal ?? 0,
							currency_code,
						})}
					</span>
				</div>
				{!!discount_total && (
					<div className="flex items-center justify-between">
						<span>Скидка</span>
						<span
							className="text-ui-fg-interactive"
							data-testid="cart-discount"
							data-value={discount_total || 0}
						>
							-{" "}
							{convertToLocale({
								amount: discount_total ?? 0,
								currency_code,
							})}
						</span>
					</div>
				)}
				<div className="flex items-center justify-between">
					<span>Доставка</span>
					<span
						data-testid="cart-shipping"
						data-value={shipping_subtotal || 0}
					>
						{convertToLocale({
							amount: shipping_subtotal ?? 0,
							currency_code,
						})}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="flex gap-x-1 items-center ">Налоги</span>
					<span data-testid="cart-taxes" data-value={tax_total || 0}>
						{convertToLocale({
							amount: tax_total ?? 0,
							currency_code,
						})}
					</span>
				</div>
				{!!gift_card_total && (
					<div className="flex items-center justify-between">
						<span>Подарочная карта</span>
						<span
							className="text-ui-fg-interactive"
							data-testid="cart-gift-card-amount"
							data-value={gift_card_total || 0}
						>
							-{" "}
							{convertToLocale({
								amount: gift_card_total ?? 0,
								currency_code,
							})}
						</span>
					</div>
				)}
			</div>
			<div className="h-px w-full my-4" />
			<div className="flex items-center justify-between text-foreground mb-2 text-xl">
				<span className="font-medium">Итого</span>
				<span data-testid="cart-total" data-value={total || 0}>
					{convertToLocale({ amount: total ?? 0, currency_code })}
				</span>
			</div>
			<div className="h-px w-full mt-4" />
		</div>
	);
};

export default CartTotals;
