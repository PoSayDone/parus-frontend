"use client";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { convertToLocale } from "@lib/util/money";
import { HttpTypes } from "@medusajs/types";
import { Button, buttonVariants } from "@/components/ui/button";
import DeleteButton from "@modules/common/components/delete-button";
import LineItemOptions from "@modules/common/components/line-item-options";
import LineItemPrice from "@modules/common/components/line-item-price";
import Thumbnail from "@modules/products/components/thumbnail";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CartDropdown = ({
	cart: cartState,
}: {
	cart?: HttpTypes.StoreCart | null;
}) => {
	const [activeTimer, setActiveTimer] = useState<NodeJS.Timeout | undefined>(
		undefined,
	);
	const [cartDropdownOpen, setCartDropdownOpen] = useState(false);

	const open = () => setCartDropdownOpen(true);
	const close = () => setCartDropdownOpen(false);

	const totalItems =
		cartState?.items?.reduce((acc, item) => {
			return acc + item.quantity;
		}, 0) || 0;

	const subtotal = cartState?.subtotal ?? 0;
	const itemRef = useRef<number>(totalItems || 0);

	const timedOpen = () => {
		open();

		const timer = setTimeout(close, 5000);

		setActiveTimer(timer);
	};

	const openAndCancel = () => {
		if (activeTimer) {
			clearTimeout(activeTimer);
		}

		open();
	};

	// Clean up the timer when the component unmounts
	useEffect(() => {
		return () => {
			if (activeTimer) {
				clearTimeout(activeTimer);
			}
		};
	}, [activeTimer]);

	const pathname = usePathname();

	// open cart dropdown when modifying the cart items, but only if we're not on the cart page
	useEffect(() => {
		if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
			timedOpen();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [totalItems, itemRef.current]);

	return (
		<div className="h-full z-50">
			<Popover open={cartDropdownOpen}>
				<PopoverTrigger asChild>
					<Link
						onMouseEnter={openAndCancel}
						onMouseLeave={close}
						className={cn(
							buttonVariants({ variant: "secondary" }),
							"outline",
						)}
						href="/cart"
						data-testid="nav-cart-link"
					>{`Корзина (${totalItems})`}</Link>
				</PopoverTrigger>
				<PopoverContent
					align="end"
					className="w-full"
					data-testid="nav-cart-dropdown"
					onMouseEnter={openAndCancel}
					onMouseLeave={close}
				>
					<div className="p-4 flex items-center justify-start">
						<h3 className="text-xl font-medium">Корзина</h3>
					</div>
					{cartState && cartState.items?.length ? (
						<>
							<div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px">
								{cartState.items
									.sort((a, b) => {
										return (a.created_at ?? "") >
											(b.created_at ?? "")
											? -1
											: 1;
									})
									.map((item) => (
										<div
											className="grid grid-cols-[96px_1fr] gap-x-4"
											key={item.id}
											data-testid="cart-item"
										>
											<Link
												href={`/products/${item.product_handle}`}
											>
												<Thumbnail
													className="rounded-xl"
													thumbnail={item.thumbnail}
													images={
														item.variant?.product
															?.images
													}
													size="square"
												/>
											</Link>
											<div className="flex flex-col justify-between flex-1 items-start">
												<div className="flex flex-col flex-1">
													<div className="flex items-start justify-between">
														<div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-4 w-[180px]">
															<h3 className="text-base-regular overflow-hidden text-ellipsis">
																<Link
																	href={`/products/${item.product_handle}`}
																	data-testid="product-link"
																>
																	{item.title}
																</Link>
															</h3>
															<LineItemOptions
																variant={
																	item.variant
																}
																data-testid="cart-item-variant"
																data-value={
																	item.variant
																}
															/>
															<span
																data-testid="cart-item-quantity"
																data-value={
																	item.quantity
																}
															>
																Quantity:{" "}
																{item.quantity}
															</span>
														</div>
														<div className="flex justify-end">
															<LineItemPrice
																item={item}
																style="tight"
																currencyCode={
																	cartState.currency_code
																}
															/>
														</div>
													</div>
												</div>
												<DeleteButton
													id={item.id}
													size={"sm"}
													className="mt-2"
													data-testid="cart-item-remove-button"
												>
													Удалить
												</DeleteButton>
											</div>
										</div>
									))}
							</div>
							<div className="p-4 flex flex-col gap-y-4 text-small-regular">
								<div className="flex items-center justify-between">
									<span className="text-ui-fg-base font-semibold">
										Всего
									</span>
									<span
										className="text-large-semi"
										data-testid="cart-subtotal"
										data-value={subtotal}
									>
										{convertToLocale({
											amount: subtotal,
											currency_code:
												cartState.currency_code,
										})}
									</span>
								</div>
								<Link
									href="/cart"
									className={cn(buttonVariants(), "w-full")}
									data-testid="go-to-cart-button"
								>
									Перейти в корзину
								</Link>
							</div>
						</>
					) : (
						<div>
							<div className="flex py-16 flex-col gap-y-4 items-center justify-center">
								<div className="bg-secondary-container flex items-center justify-center size-12 rounded-full text-on-secondary-container">
									<span>0</span>
								</div>
								<span>Ваша корзина пуста.</span>
								<div>
									<Link href="/store">
										<>
											<span className="sr-only">
												Перейти на страницу всех
												продкутов
											</span>
											<Button onClick={close}>
												Посмотреть товары
											</Button>
										</>
									</Link>
								</div>
							</div>
						</div>
					)}
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default CartDropdown;
