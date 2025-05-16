"use client";

import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupCard } from "@/components/ui/radio-group";
import { setShippingMethod } from "@lib/data/cart";
import { calculatePriceForShippingOption } from "@lib/data/fulfillment";
import { convertToLocale } from "@lib/util/money";
import { HttpTypes } from "@medusajs/types";
import ErrorMessage from "@modules/checkout/components/error-message";
import MedusaRadio from "@modules/common/components/radio";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const PICKUP_OPTION_ON = "__PICKUP_ON";
const PICKUP_OPTION_OFF = "__PICKUP_OFF";

type ShippingProps = {
	cart: HttpTypes.StoreCart;
	availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null;
};

function formatAddress(address: {
	address_1?: string;
	address_2?: string;
	postal_code?: string;
	country_code?: string;
	city?: string;
}) {
	if (!address) {
		return "";
	}

	let ret = "";

	if (address.address_1) {
		ret += ` ${address.address_1}`;
	}

	if (address.address_2) {
		ret += `, ${address.address_2}`;
	}

	if (address.postal_code) {
		ret += `, ${address.postal_code} ${address.city!}`;
	}

	if (address.country_code) {
		ret += `, ${address.country_code.toUpperCase()}`;
	}

	return ret;
}

const Shipping: React.FC<ShippingProps> = ({
	cart,
	availableShippingMethods,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingPrices, setIsLoadingPrices] = useState(true);

	const [showPickupOptions, setShowPickupOptions] =
		useState<string>(PICKUP_OPTION_OFF);
	const [calculatedPricesMap, setCalculatedPricesMap] = useState<
		Record<string, number>
	>({});
	const [error, setError] = useState<string | null>(null);
	const [shippingMethodId, setShippingMethodId] = useState<string | null>(
		cart.shipping_methods?.at(-1)?.shipping_option_id || null,
	);

	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const isOpen = searchParams.get("step") === "delivery";

	const _shippingMethods = availableShippingMethods?.filter(
		(sm) => sm.service_zone?.fulfillment_set?.type !== "pickup",
	);

	const _pickupMethods = availableShippingMethods?.filter(
		(sm) => sm.service_zone?.fulfillment_set?.type === "pickup",
	);

	const hasPickupOptions = !!_pickupMethods?.length;

	useEffect(() => {
		setIsLoadingPrices(true);

		if (_shippingMethods?.length) {
			const promises = _shippingMethods
				.filter((sm) => sm.price_type === "calculated")
				.map((sm) => calculatePriceForShippingOption(sm.id, cart.id));

			if (promises.length) {
				Promise.allSettled(promises).then((res) => {
					const pricesMap: Record<string, number> = {};
					res.filter((r) => r.status === "fulfilled").forEach(
						(p) =>
							(pricesMap[p.value?.id || ""] = p.value?.amount!),
					);

					setCalculatedPricesMap(pricesMap);
					setIsLoadingPrices(false);
				});
			}
		}

		if (_pickupMethods?.find((m) => m.id === shippingMethodId)) {
			setShowPickupOptions(PICKUP_OPTION_ON);
		}
	}, [availableShippingMethods]);

	const handleEdit = () => {
		router.push(pathname + "?step=delivery", { scroll: false });
	};

	const handleSubmit = () => {
		router.push(pathname + "?step=payment", { scroll: false });
	};

	const handleSetShippingMethod = async (
		id: string,
		variant: "shipping" | "pickup",
	) => {
		setError(null);

		if (variant === "pickup") {
			setShowPickupOptions(PICKUP_OPTION_ON);
		} else {
			setShowPickupOptions(PICKUP_OPTION_OFF);
		}

		let currentId: string | null = null;
		setIsLoading(true);
		setShippingMethodId((prev) => {
			currentId = prev;
			return id;
		});

		await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
			.catch((err) => {
				setShippingMethodId(currentId);

				setError(err.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		setError(null);
	}, [isOpen]);

	return (
		<div>
			<div className="flex flex-row items-center justify-between mb-6">
				<h2
					className={cn(
						"flex flex-row text-3xl gap-x-2 items-center",
						!isOpen &&
							cart.shipping_methods?.length === 0 &&
							"opacity-50 pointer-events-none select-none",
					)}
				>
					Доставка
					{!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
						<CheckCircle2 />
					)}
				</h2>
				{!isOpen &&
					cart?.shipping_address &&
					cart?.billing_address &&
					cart?.email && (
						<Button
							variant={"ghost"}
							size={"sm"}
							onClick={handleEdit}
							data-testid="edit-delivery-button"
						>
							Изменить
						</Button>
					)}
			</div>
			{isOpen ? (
				<>
					<div className="grid">
						<div className="flex flex-col">
							<span className="font-medium txt-medium text-ui-fg-base">
								Shipping method
							</span>
							<span className="mb-4 text-ui-fg-muted txt-medium">
								How would you like you order delivered
							</span>
						</div>
						<div data-testid="delivery-options-container">
							<div className="pb-8 md:pt-0 pt-2">
								{hasPickupOptions && (
									<RadioGroup
										value={showPickupOptions}
										onValueChange={(value) => {
											const id = _pickupMethods.find(
												(option) =>
													!option.insufficient_inventory,
											)?.id;

											if (id) {
												handleSetShippingMethod(
													id,
													"pickup",
												);
											}
										}}
									>
										<RadioGroupCard
											value={PICKUP_OPTION_ON}
											data-testid="delivery-option-radio"
											className={cn(
												"flex items-center justify-between text-small-regular cursor-pointer py-4 border rounded-rounded px-8 mb-2 hover:shadow-borders-interactive-with-active",
												showPickupOptions ===
													PICKUP_OPTION_ON &&
													"border-ui-border-interactive",
											)}
										>
											<div className="flex items-center gap-x-4">
												<MedusaRadio
													checked={
														showPickupOptions ===
														PICKUP_OPTION_ON
													}
												/>
												<span className="text-base-regular">
													Pick up your order
												</span>
											</div>
											<span className="justify-self-end text-ui-fg-base">
												-
											</span>
										</RadioGroupCard>
									</RadioGroup>
								)}
								<RadioGroup
									value={shippingMethodId}
									onValueChange={(v) =>
										handleSetShippingMethod(v, "shipping")
									}
								>
									{_shippingMethods?.map((option) => {
										const isDisabled =
											option.price_type ===
												"calculated" &&
											!isLoadingPrices &&
											typeof calculatedPricesMap[
												option.id
											] !== "number";

										return (
											<RadioGroupCard
												key={option.id}
												value={option.id}
												data-testid="delivery-option-radio"
												disabled={isDisabled}
												className={cn(
													"flex items-center justify-between text-small-regular cursor-pointer py-4 border rounded-rounded px-8 mb-2 hover:shadow-borders-interactive-with-active",
													option.id ===
														shippingMethodId &&
														"border-ui-border-interactive",
													isDisabled &&
														"hover:shadow-brders-none cursor-not-allowed",
												)}
											>
												<div className="flex items-center gap-x-4">
													<MedusaRadio
														checked={
															option.id ===
															shippingMethodId
														}
													/>
													<span className="text-base-regular">
														{option.name}
													</span>
												</div>
												<span className="justify-self-end text-ui-fg-base">
													{option.price_type ===
													"flat" ? (
														convertToLocale({
															amount: option.amount!,
															currency_code:
																cart?.currency_code,
														})
													) : calculatedPricesMap[
															option.id
													  ] ? (
														convertToLocale({
															amount: calculatedPricesMap[
																option.id
															],
															currency_code:
																cart?.currency_code,
														})
													) : isLoadingPrices ? (
														<Loader className="animate-spin" />
													) : (
														"-"
													)}
												</span>
											</RadioGroupCard>
										);
									})}
								</RadioGroup>
							</div>
						</div>
					</div>

					{showPickupOptions === PICKUP_OPTION_ON && (
						<div className="grid">
							<div className="flex flex-col">
								<span className="font-medium txt-medium text-ui-fg-base">
									Store
								</span>
								<span className="mb-4 text-ui-fg-muted txt-medium">
									Choose a store near you
								</span>
							</div>
							<div data-testid="delivery-options-container">
								<div className="pb-8 md:pt-0 pt-2">
									<RadioGroup
										value={shippingMethodId}
										onChange={(v) =>
											handleSetShippingMethod(v, "pickup")
										}
									>
										{_pickupMethods?.map((option) => {
											return (
												<RadioGroupCard
													key={option.id}
													value={option.id}
													disabled={
														option.insufficient_inventory
													}
													data-testid="delivery-option-radio"
													className={cn(
														"flex items-center justify-between text-small-regular cursor-pointer py-4 border rounded-rounded px-8 mb-2 hover:shadow-borders-interactive-with-active",
														option.id ===
															shippingMethodId &&
															"border-ui-border-interactive",
														option.insufficient_inventory &&
															"hover:shadow-brders-none cursor-not-allowed",
													)}
												>
													<div className="flex items-center gap-x-4">
														<MedusaRadio
															checked={
																option.id ===
																shippingMethodId
															}
														/>
														<div className="flex flex-col items-start">
															<span className="text-base-regular">
																{option.name}
															</span>
															<span className="text-base-regular text-ui-fg-muted">
																{formatAddress(
																	option
																		.service_zone
																		?.fulfillment_set
																		?.location
																		?.address,
																)}
															</span>
														</div>
													</div>
													<span className="justify-self-end text-ui-fg-base">
														{convertToLocale({
															amount: option.amount!,
															currency_code:
																cart?.currency_code,
														})}
													</span>
												</RadioGroupCard>
											);
										})}
									</RadioGroup>
								</div>
							</div>
						</div>
					)}

					<div>
						<ErrorMessage
							error={error}
							data-testid="delivery-option-error-message"
						/>
						<Button
							onClick={handleSubmit}
							isLoading={isLoading}
							disabled={!cart.shipping_methods?.[0]}
							data-testid="submit-delivery-option-button"
						>
							Continue to payment
						</Button>
					</div>
				</>
			) : (
				<div>
					<div className="text-small-regular">
						{cart && (cart.shipping_methods?.length ?? 0) > 0 && (
							<div className="flex flex-col w-1/3">
								<p className="txt-medium-plus text-ui-fg-base mb-1">
									Method
								</p>
								<p className="txt-medium text-ui-fg-subtle">
									{cart.shipping_methods?.at(-1)?.name}{" "}
									{convertToLocale({
										amount: cart.shipping_methods.at(-1)
											?.amount!,
										currency_code: cart?.currency_code,
									})}
								</p>
							</div>
						)}
					</div>
				</div>
			)}
			<Separator className="mt-8" />
		</div>
	);
};

export default Shipping;
